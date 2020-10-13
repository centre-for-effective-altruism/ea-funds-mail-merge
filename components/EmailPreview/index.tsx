import { useEffect, useState } from 'react'
import {
  Template,
  TemplateValidationOptions,
  TemplateValidation,
} from 'postmark/dist/client/models'
import { useMergeData } from 'components/MergeData'
import { useTemplates } from 'components/Templates'
import { TTemplateDataModelRow } from 'components/Templates/context'
import { Divider, makeStyles, Typography, Button } from '@material-ui/core'
import { formatSender, getFinalMergeData } from 'utils/emails'

const useStyles = makeStyles((theme) => ({
  root: {},
  emailPreview: {
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(4),
  },
  htmlPreview: {},
}))

const EmailPreview: React.FC = () => {
  const { selectedTemplate } = useTemplates()
  const { visibleRowId, finalMergeData } = useMergeData()
  const classes = useStyles()
  const [previewMode, setPreviewMode] = useState('html' as 'text' | 'html')
  const [templatePreviewSubject, setTemplatePreviewSubject] = useState(
    null as null | string,
  )
  const [templatePreviewHTML, setTemplatePreviewHTML] = useState(
    null as null | string,
  )
  const [templatePreviewText, setTemplatePreviewText] = useState(
    null as null | string,
  )

  const getTemplatePreview = async (
    Template: Template,
    // eslint-disable-next-line @typescript-eslint/ban-types
    TestRenderModel: object | undefined,
  ) => {
    const { Subject, HtmlBody, TextBody } = Template
    const validationOptions: TemplateValidationOptions = {
      Subject,
      HtmlBody: HtmlBody || undefined,
      TextBody: TextBody || undefined,
      TestRenderModel,
    }
    const res = await fetch('/api/postmark/validateTemplate', {
      method: 'POST',
      body: JSON.stringify(validationOptions),
    })
    const body: TemplateValidation = await res.json()
    return body
  }

  const doGetTemplatePreview = (rowId: number) => {
    if (!finalMergeData || !selectedTemplate) return
    getTemplatePreview(selectedTemplate, finalMergeData.model[rowId]).then(
      (res) => {
        setTemplatePreviewSubject(res.Subject?.RenderedContent)
        setTemplatePreviewHTML(res.HtmlBody?.RenderedContent)
        setTemplatePreviewText(res.TextBody?.RenderedContent)
      },
    )
  }

  useEffect(() => {
    doGetTemplatePreview(visibleRowId)
  }, [visibleRowId])

  if (!finalMergeData || !selectedTemplate) return null

  const { model, globals } = finalMergeData
  const selectedTemplateData = model[visibleRowId]

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Email Preview
      </Typography>
      {previewMode === 'html' && (
        <div className={classes.emailPreview}>
          <Typography gutterBottom>
            <strong>Subject:</strong> {templatePreviewSubject}
          </Typography>
          <Typography gutterBottom>
            <strong>From:</strong> {formatSender(globals.sender)}
          </Typography>
          <Typography gutterBottom>
            <strong>To:</strong> {formatSender(selectedTemplateData.recipient)}
          </Typography>
          {selectedTemplateData.recipient.cc && (
            <Typography gutterBottom>
              <strong>CC:</strong> {selectedTemplateData.recipient.cc}
            </Typography>
          )}
          {selectedTemplateData.recipient.bcc && (
            <Typography gutterBottom>
              <strong>BCC:</strong> {selectedTemplateData.recipient.bcc}
            </Typography>
          )}
          <Divider />
          {templatePreviewHTML ? (
            <div
              className={classes.htmlPreview}
              dangerouslySetInnerHTML={{ __html: templatePreviewHTML }}
            />
          ) : (
            <>
              <Typography gutterBottom>No HTML Template to preview.</Typography>
              <Button
                variant="outlined"
                onClick={() => doGetTemplatePreview(visibleRowId)}
              >
                Try again
              </Button>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default EmailPreview
