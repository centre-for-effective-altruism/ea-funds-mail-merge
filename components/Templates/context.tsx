import { createContext, useContext, useEffect } from 'react'
import { merge } from 'lodash'
import { useLocalStorage, getLocalStorageKeyFactory } from 'utils/hooks'
import {
  Templates,
  Template,
  TemplateInList,
  TemplateValidationOptions,
  TemplateValidation,
} from 'postmark/dist/client/models'
import { TSenderDetails } from 'utils/emails'

export type TTemplateDataModelRowBase = string | number | boolean | null
export type TTemplateDataModelRowDatum =
  | TTemplateDataModelRowBase
  | Record<string, TTemplateDataModelRowBase>
export type TTemplateDataModelRow = {
  recipient: TSenderDetails
  [key: string]: TTemplateDataModelRowDatum
}
export type TTemplateDataModel = TTemplateDataModelRow[]

type TemplatesContextProps = {
  templates: TemplateInList[]
  selectedTemplateAlias: string | null
  selectedTemplate: Template | null
  setTemplate: (templateAlias: string | null) => void
  // eslint-disable-next-line @typescript-eslint/ban-types
  selectedTemplateModel: Record<string, unknown> | null
  resetTemplates: () => void
}

const initialContext: Readonly<Omit<
  TemplatesContextProps,
  'setTemplate' | 'resetTemplates'
>> = {
  templates: [],
  selectedTemplateAlias: null,
  selectedTemplate: null,
  selectedTemplateModel: null,
}

export const TemplatesContext = createContext(
  initialContext as TemplatesContextProps,
)

const { Provider } = TemplatesContext

const LOCALSTORAGE_NAMESPACE = 'Templates'
const getLSKey = getLocalStorageKeyFactory(LOCALSTORAGE_NAMESPACE)

const templateDataModelDefaults = {
  recipient: {
    email: null,
    first_name: null,
    last_name: null,
    cc: null,
    bcc: null,
  },
}

export const TemplatesProvider: React.FC = ({ children }) => {
  const [selectedTemplateAlias, setSelectedTemplateAlias] = useLocalStorage(
    getLSKey('selectedTemplateAlias'),
    null as string | null,
  )
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage(
    getLSKey('selectedTemplate'),
    null as Template | null,
  )
  const [templates, setTemplates] = useLocalStorage(
    getLSKey('templates'),
    [] as TemplateInList[],
  )
  const [selectedTemplateModel, setSelectedTemplateModel] = useLocalStorage(
    getLSKey('selectedTemplateModel'),
    null as Record<string, unknown> | null,
  )

  const getTemplates = async () => {
    const res = await fetch('/api/postmark/getTemplates')
    if (res.ok) {
      const body: Templates = await res.json()
      return body.Templates.filter((T) => T.TemplateType === 'Standard')
    }
    return []
  }

  const getTemplate = async (templateAlias: string) => {
    const res = await fetch(`/api/postmark/getTemplate/${templateAlias}`)
    if (!res.ok) throw new Error(`Could not get template ${templateAlias}`)
    const body: Template = await res.json()
    return body
  }

  const getSelectedTemplateModel = async (Template: Template) => {
    const { Subject, HtmlBody, TextBody } = Template
    const validationOptions: TemplateValidationOptions = {
      Subject,
      HtmlBody: HtmlBody || undefined,
      TextBody: TextBody || undefined,
    }
    const res = await fetch('/api/postmark/validateTemplate', {
      method: 'POST',
      body: JSON.stringify(validationOptions),
    })
    const body: TemplateValidation = await res.json()
    return body.SuggestedTemplateModel
  }

  const resetTemplates = () => {
    setSelectedTemplateAlias(initialContext.selectedTemplateAlias)
    setSelectedTemplate(initialContext.selectedTemplate)
    setSelectedTemplateModel(initialContext.selectedTemplateModel)
  }

  useEffect(() => {
    getTemplates().then((Templates) => setTemplates(Templates))
  }, [])

  useEffect(() => {
    if (selectedTemplateAlias) {
      getTemplate(selectedTemplateAlias).then((template) =>
        setSelectedTemplate(template),
      )
    } else {
      setSelectedTemplate(null)
    }
  }, [selectedTemplateAlias])

  useEffect(() => {
    if (selectedTemplate) {
      getSelectedTemplateModel(selectedTemplate).then((model) =>
        setSelectedTemplateModel(merge(templateDataModelDefaults, model)),
      )
    } else {
      setSelectedTemplateModel(null)
    }
  }, [selectedTemplate])

  const value = {
    selectedTemplateAlias,
    selectedTemplate,
    templates,
    setTemplate: (templateAlias: string | null) => {
      setSelectedTemplateAlias(templateAlias)
    },
    selectedTemplateModel,
    resetTemplates,
  }
  return <Provider value={value}>{children}</Provider>
}

export const useTemplates = (): TemplatesContextProps =>
  useContext(TemplatesContext)
