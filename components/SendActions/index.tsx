import { Button, Grid, FormHelperText, Box } from '@material-ui/core'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useMergeData } from 'components/MergeData'
import { useTemplates } from 'components/Templates'
import Link from 'components/Link'
import { formatSender } from 'utils/emails'
import { useState } from 'react'
import { Alert } from '@material-ui/lab'
import { chunk } from 'lodash'
import { TemplatedMessage } from 'postmark'

type LiveSendConfirmationProps = {
  open: boolean
  onClose: () => void
}

enum LiveSendConfirmationStatus {
  Confirming = 'CONFIRMING',
  Sending = 'SENDING',
  Sent = 'SENT',
}

const LiveSendConfirmation: React.FC<LiveSendConfirmationProps> = ({
  open,
  onClose,
}) => {
  const { finalMergeData } = useMergeData()
  const { selectedTemplateAlias } = useTemplates()
  const [status, setStatus] = useState(LiveSendConfirmationStatus.Confirming)
  const [sendingLog, setSendingLog] = useState([] as string[])
  if (!finalMergeData || !selectedTemplateAlias) return null
  const { globals, model } = finalMergeData

  const handleClose = () => {
    onClose()
    setSendingLog([])
    setTimeout(() => setStatus(LiveSendConfirmationStatus.Confirming), 100)
  }

  const log = async (logMessage: string) => {
    const newSendingLog = [...sendingLog]
    newSendingLog.push(logMessage)
    await setSendingLog(newSendingLog)
  }

  const doSend = async (Messages: TemplatedMessage[]) => {
    await log(`Sending ${Messages.length} messages...`)
    const res = await fetch('/api/postmark/sendEmailBatchWithTemplates', {
      method: 'POST',
      body: JSON.stringify(Messages),
    })
    if (res.ok) {
      const resData = await res.json()
      console.log(resData)
      await log(resData.Message)
    }
  }

  const handleConfirm = async () => {
    await setStatus(LiveSendConfirmationStatus.Sending)
    await setSendingLog([])
    // Postmark only allows 500 emails per batch
    const chunks = chunk(model, 500)
    for (const chunk of chunks) {
      const Messages: TemplatedMessage[] = chunk.map((row) => {
        const message: TemplatedMessage = {
          TemplateAlias: selectedTemplateAlias,
          MessageStream: process.env.NEXT_PUBLIC_MESSAGE_STREAM,
          From: formatSender(globals.sender),
          To: formatSender(row.recipient),
          TemplateModel: row,
        }
        if (row.recipient.cc) message.Cc = row.recipient.cc
        if (row.recipient.bcc) message.Bcc = row.recipient.bcc

        return message
      })
      await doSend(Messages)
    }

    // setStatus(LiveSendConfirmationStatus.Sent)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick={
        status === LiveSendConfirmationStatus.Sending && false
      }
      disableEscapeKeyDown={
        status === LiveSendConfirmationStatus.Sending && false
      }
    >
      <DialogTitle>Send Live Emails</DialogTitle>
      {status === LiveSendConfirmationStatus.Confirming && (
        <>
          <DialogContent>
            <Box marginBottom={2}>
              <Alert severity="warning">
                Are you sure you want to send live emails?
              </Alert>
            </Box>
            <DialogContentText gutterBottom>
              Emails will be sent to {finalMergeData.model.length} recipients
              using the <code>{selectedTemplateAlias}</code> template.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="secondary">
              Send Emails
            </Button>
          </DialogActions>
        </>
      )}
      {status === LiveSendConfirmationStatus.Sending && (
        <>
          <DialogContent>
            <DialogContentText gutterBottom>
              Sending {finalMergeData.model.length} emails...
            </DialogContentText>
            {sendingLog.map((logMessage, i) => (
              <Alert key={i} severity="info">
                {logMessage}
              </Alert>
            ))}
          </DialogContent>
        </>
      )}
      {status === LiveSendConfirmationStatus.Sent && (
        <>
          <DialogContent>
            <DialogContentText gutterBottom>Sent emails</DialogContentText>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

const SendActions: React.FC = () => {
  const { finalMergeData, visibleRowId } = useMergeData()
  const { selectedTemplateAlias } = useTemplates()
  const [showLiveSendConfirmation, setShowLiveSendConfirmation] = useState(
    false,
  )
  const [error, setError] = useState(null as null | string)
  const [result, setResult] = useState(null as null | string)

  if (!finalMergeData || !selectedTemplateAlias) return null

  const { model, globals } = finalMergeData
  const testEmailAddress = globals.testing.email

  const handleSendTest = async () => {
    try {
      if (!globals.testing.email)
        throw new Error('Test email address is not set')
      const TemplateModel = model[visibleRowId]
      const res = await fetch('/api/postmark/sendEmailWithTemplate', {
        method: 'POST',
        body: JSON.stringify({
          TemplateAlias: selectedTemplateAlias,
          TemplateModel,
          MessageStream: process.env.NEXT_PUBLIC_MESSAGE_STREAM,
          From: formatSender(globals.sender),
          To: globals.testing.email,
        }),
      })
      if (res.ok) {
        const resData = await res.json()
        const { Message } = resData
        console.log(resData)
        if (Message === 'OK')
          setResult(`Test email set to ${globals.testing.email}`)
        else setError(Message)
      }
    } catch (err) {
      console.error(err)
      setError(err.message)
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!testEmailAddress}
            onClick={handleSendTest}
          >
            Send Test Email
          </Button>
          <FormHelperText>
            {testEmailAddress ? (
              <>Send a test email to {testEmailAddress}</>
            ) : (
              <>
                You haven{`'`}t set a test email. Set a value for the{' '}
                <em>testing.email</em> field on the{' '}
                <Link href="/data-import">data page</Link>.
              </>
            )}
          </FormHelperText>
        </Grid>
        {(error || result) && (
          <Grid item xs={12}>
            {error && <Alert severity="error">{error}</Alert>}
            {result && <Alert severity="success">{result}</Alert>}
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={() => setShowLiveSendConfirmation(true)}
          >
            Send Live Emails
          </Button>
        </Grid>
      </Grid>
      <LiveSendConfirmation
        open={showLiveSendConfirmation}
        onClose={() => {
          setShowLiveSendConfirmation(false)
        }}
      />
    </>
  )
}

export default SendActions
