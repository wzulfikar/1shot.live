import { createError } from '../utils/createError.ts'
import { supabaseAdmin } from './supabaseAdmin.ts'

const BUCKET_NAME = 'screenshots'

export async function storeScreenshot(params: {
  imageBlob: Blob
  filepath: string
  maxSize?: number
}) {
  const { imageBlob, filepath } = params

  if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(imageBlob.type)) {
    const error = `Error processing screenshot. File type is not supported: ${imageBlob.type}`
    throw createError('storeScreenshot', {
      error,
      kind: 'VALIDATION_ERROR',
      where: 'lib',
      userMessage: {
        code: 'INVALID_FILE_TYPE',
        message: error,
      },
    })
  }

  const maxSize = params.maxSize ?? 10 * 1024 * 1024 // 10MB
  if (imageBlob.size > maxSize) {
    const error = `File size exceeds ${maxSize} bytes limit`
    throw createError('storeScreenshot', {
      error,
      kind: 'VALIDATION_ERROR',
      where: 'lib',
      userMessage: {
        code: 'SIZE_LIMIT_EXCEEDED',
        message: error,
      },
    })
  }

  const { data, error } = await supabaseAdmin
    .storage
    .from(BUCKET_NAME)
    .upload(filepath, imageBlob, {
      contentType: imageBlob.type,
      upsert: true,
    })

  if (error) {
    throw createError('storeScreenshot', {
      error: error.message,
      kind: 'STORAGE_ERROR',
      where: 'lib',
      userMessage: {
        code: 'ERROR_STORING_SCREENSHOT',
        message: 'Error storing screenshot',
      },
    })
  }

  const publicUrl = supabaseAdmin
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path).data
    .publicUrl

  return { path: data.path, publicUrl }
}
