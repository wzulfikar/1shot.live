import { createError } from '../utils/createError'
import { supabaseAdmin } from './supabaseAdmin'

export async function storeScreenshot(params: {
  imageBlob: Blob
  filename: string
  maxSize?: number
}) {
  const { imageBlob, filename } = params

  if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(imageBlob.type)) {
    const error = `File type is not supported: ${imageBlob.type}`
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

  const filepath = `screenshots/${filename}`
  const { data, error } = await supabaseAdmin.storage
    .from('screenshots')
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
    .from('public_bucket')
    .getPublicUrl(data.path).data
    .publicUrl

  return { path: data.path, publicUrl }
}
