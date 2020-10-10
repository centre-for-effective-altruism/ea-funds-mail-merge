import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EmailIcon from '@material-ui/icons/Email'
import CheckIcon from '@material-ui/icons/Check'
import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'
import { useTemplates } from './context'
import { TemplateInList } from 'postmark/dist/client/models'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRight: `1px solid ${theme.palette.grey[400]}`,
  },
  listItem: {
    '&.selected': {
      color: theme.palette.primary.main,
    },
  },
}))

const TemplateSelector: React.FC = () => {
  const { templates, setTemplate, selectedTemplateAlias } = useTemplates()
  const classes = useStyles()

  const isSelected = (Template: TemplateInList) =>
    selectedTemplateAlias && Template.Alias === selectedTemplateAlias

  return (
    <>
      <List className={classes.root}>
        {templates.map((Template) => (
          <ListItem
            button
            key={Template.TemplateId}
            onClick={() =>
              setTemplate(!isSelected(Template) ? Template.Alias : null)
            }
            className={classNames(classes.listItem, {
              selected: isSelected(Template),
            })}
          >
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{Template.Name}</ListItemText>
            {isSelected(Template) && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default TemplateSelector
