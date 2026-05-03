// client component

import { useEffect, useRef } from 'react'
import { reportWebsiteError } from '@/lib/error-report'

export default function ErrorReporter() {
  const dedupeRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Do not fire reports in development — errors from localhost are dev-mode noise
    // (e.g. Next.js devtools overlay, webpack-internal modules).
    if (process.env.NODE_ENV !== 'production') return

    const reportOnce = (key: string, payload: Parameters<typeof reportWebsiteError>[0]) => {
      if (dedupeRef.current.has(key)) return
      dedupeRef.current.add(key)
      setTimeout(() => dedupeRef.current.delete(key), 60_000)
      reportWebsiteError(payload)
    }

    const onError = (event: ErrorEvent) => {
      const filename = event.filename || ''
      // Skip errors originating from Next.js/webpack internals — they are framework noise.
      if (
        filename.includes('webpack-internal://') ||
        filename.includes('next-devtools') ||
        filename.includes('/_next/static/chunks/')
      ) return

      const message = event.message || 'Erro desconhecido'
      const key = `err:${message}:${filename}:${event.lineno || 0}`
      reportOnce(key, {
        source: 'window.error',
        message,
        stack: event.error?.stack,
        context: {
          filename,
          line: event.lineno,
          column: event.colno,
        },
      })
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message =
        typeof reason === 'string'
          ? reason
          : reason?.message || 'Promise rejeitada sem mensagem'
      const key = `rej:${message}`
      reportOnce(key, {
        source: 'window.unhandledrejection',
        message,
        stack: reason?.stack,
      })
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  return null
}