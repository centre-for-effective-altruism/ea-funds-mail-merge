import { ServerClient } from 'postmark'

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN)

export default client

export type EndpointIdentifier =
  // | 'sendEmail'
  // | 'sendEmailBatch'
  | 'sendEmailWithTemplate'
  | 'sendEmailBatchWithTemplates'
  // | 'getDeliveryStatistics'
  // | 'getBounces'
  // | 'getBounce'
  // | 'getBounceDump'
  // | 'activateBounce'
  | 'getTemplates'
  | 'getTemplate'
  // | 'deleteTemplate'
  // | 'createTemplate'
  // | 'editTemplate'
  | 'validateTemplate'
// | 'getServer'
// | 'editServer'
// | 'getOutboundMessages'
// | 'getOutboundMessageDetails'
// | 'getOutboundMessageDump'
// | 'getInboundMessages'
// | 'getInboundMessageDetails'
// | 'bypassBlockedInboundMessage'
// | 'retryInboundHookForMessage'
// | 'getMessageOpens'
// | 'getMessageOpensForSingleMessage'
// | 'getMessageClicks'
// | 'getMessageClicksForSingleMessage'
// | 'getOutboundOverview'
// | 'getSentCounts'
// | 'getBounceCounts'
// | 'getSpamComplaintsCounts'
// | 'getTrackedEmailCounts'
// | 'getEmailOpenCounts'
// | 'getEmailOpenPlatformUsage'
// | 'getEmailOpenClientUsage'
// | 'getEmailOpenReadTimes'
// | 'getClickCounts'
// | 'getClickBrowserUsage'
// | 'getClickPlatformUsage'
// | 'getClickLocation'
// | 'createInboundRuleTrigger'
// | 'deleteInboundRuleTrigger'
// | 'getInboundRuleTriggers'
// | 'getWebhooks'
// | 'getWebhook'
// | 'createWebhook'
// | 'editWebhook'
// | 'deleteWebhook'
// | 'getMessageStreams'
// | 'getMessageStream'
// | 'editMessageStream'
// | 'createMessageStream'
// | 'archiveMessageStream'
// | 'unarchiveMessageStream'
// | 'getSuppressions'
// | 'createSuppressions'
// | 'deleteSuppressions'

const validEndpoints = [
  // 'sendEmail',
  // 'sendEmailBatch',
  'sendEmailWithTemplate',
  'sendEmailBatchWithTemplates',
  // 'getDeliveryStatistics',
  // 'getBounces',
  // 'getBounce',
  // 'getBounceDump',
  // 'activateBounce',
  'getTemplates',
  'getTemplate',
  // 'deleteTemplate',
  // 'createTemplate',
  // 'editTemplate',
  'validateTemplate',
  // 'getServer',
  // 'editServer',
  // 'getOutboundMessages',
  // 'getOutboundMessageDetails',
  // 'getOutboundMessageDump',
  // 'getInboundMessages',
  // 'getInboundMessageDetails',
  // 'bypassBlockedInboundMessage',
  // 'retryInboundHookForMessage',
  // 'getMessageOpens',
  // 'getMessageOpensForSingleMessage',
  // 'getMessageClicks',
  // 'getMessageClicksForSingleMessage',
  // 'getOutboundOverview',
  // 'getSentCounts',
  // 'getBounceCounts',
  // 'getSpamComplaintsCounts',
  // 'getTrackedEmailCounts',
  // 'getEmailOpenCounts',
  // 'getEmailOpenPlatformUsage',
  // 'getEmailOpenClientUsage',
  // 'getEmailOpenReadTimes',
  // 'getClickCounts',
  // 'getClickBrowserUsage',
  // 'getClickPlatformUsage',
  // 'getClickLocation',
  // 'createInboundRuleTrigger',
  // 'deleteInboundRuleTrigger',
  // 'getInboundRuleTriggers',
  // 'getWebhooks',
  // 'getWebhook',
  // 'createWebhook',
  // 'editWebhook',
  // 'deleteWebhook',
  // 'getMessageStreams',
  // 'getMessageStream',
  // 'editMessageStream',
  // 'createMessageStream',
  // 'archiveMessageStream',
  // 'unarchiveMessageStream',
  // 'getSuppressions',
  // 'createSuppressions',
  // 'deleteSuppressions',
]

export function isValidEndpoint(arg: unknown): arg is EndpointIdentifier {
  if (typeof arg !== 'string') return false
  return validEndpoints.includes(arg)
}
