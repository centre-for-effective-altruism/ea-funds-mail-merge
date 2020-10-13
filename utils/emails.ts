import {
  TTemplateDataModel,
  TTemplateDataModelRow,
} from 'components/Templates/context'
import { TMergeData, TGlobalDataModel } from 'components/MergeData/context'

export type TSenderDetails = {
  first_name: string | null
  last_name: string | null
  full_name: string | null
  email: string | null
  cc: string | null
  bcc: string | null
}
// From https://stackoverflow.com/a/46181/7114675
// eslint-disable-next-line no-useless-escape
export const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = (email: string): boolean =>
  emailRegExp.test(String(email).toLowerCase())

export const isSender = (val: unknown): val is TSenderDetails => {
  if (!val || typeof val !== 'object' || val === null) return false
  if (typeof (val as TSenderDetails).email === 'string') return true
  return false
}

export const formatSenderName = (sender?: string | TSenderDetails): string => {
  if (typeof sender === 'string') return sender
  if (isSender(sender)) {
    if (sender.full_name) return String(sender.full_name)
    if (sender.first_name || sender.last_name)
      return [sender.first_name, sender.last_name].join(' ')
  }
  return ''
}

export const formatSender = (sender: string | TSenderDetails): string => {
  if (typeof sender === 'string') return sender
  if (isSender(sender)) {
    if (!sender.email) return ''
    const senderName = formatSenderName(sender)
    if (!senderName) return sender.email
    return `${senderName} <${sender.email}>`
  }
  return ''
}

export type TFinalMergeData = {
  model: TTemplateDataModel
  globals: TGlobalDataModel
}

export const getFinalMergeData = (
  globalData: TGlobalDataModel,
  templateData: TTemplateDataModel,
): TFinalMergeData => {
  // merge global data with merge data by row
  const model: TTemplateDataModel = templateData.map((row) => ({
    ...row,
    ...globalData,
  }))
  return { model, globals: globalData }
}
