// Specific to our codebase
type ErrorKind = 'UPSTREAM_API_ERROR' | 'DB_ERROR' | 'STORAGE_ERROR' | 'VALIDATION_ERROR'
type ErrorWhere = 'lib' | 'services'

interface WrapError extends Error {
  kind?: ErrorKind
  where?: ErrorWhere
  userMessage?: {
    code: string
    message: string
  }
}

export const createError = (
  scope: string,
  params: {
    error: unknown
    report?: boolean
    kind?: ErrorKind
    where?: ErrorWhere
    /**
     * User-friendly error message
     */
    userMessage?: {
      code: string
      message: string
    }
  },
): Error => {
  const { error, report, userMessage } = params
  let errorMsg = params.userMessage?.message

  if (!errorMsg) {
    if (error instanceof Error && 'response' in error) {
      const response = (error as any).response as Response
      errorMsg = `HTTP status ${response.status}: ${response.statusText}`
    } else if ((error as any).toString().startsWith('TimeoutError')) {
      errorMsg = 'TimeoutError'
    } else {
      errorMsg = 'unknown error'
    }
  }

  let errorLog = `[error] [${scope}] ${errorMsg}`
  if (params.kind) errorLog += ` | kind: ${params.kind}`
  if (params.where) errorLog += ` | where: ${params.where}`

  const causeStr = typeof error === 'object' ? JSON.stringify(error) : error
  console.error(`${errorLog} | cause: ${causeStr}`)

  if (report) {
    // TODO: report error to Sentry
    console.error('TODO: report to sentry', { scope, errorMsg, error })
  }

  const wrapError: WrapError = new Error(errorMsg)
  wrapError.kind = params.kind
  wrapError.where = params.where
  if (userMessage) wrapError.userMessage = userMessage

  return wrapError
}

export const getErrorMessageForUser = (error: unknown) => {
  if (error instanceof Error && 'userMessage' in error) {
    return (error as WrapError).userMessage
  }
  return null
}
