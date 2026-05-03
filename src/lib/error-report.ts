export type WebsiteErrorPayload = {
  source: 'window.error' | 'window.unhandledrejection' | 'simulator.submit'
  message: string
  stack?: string
  context?: Record<string, unknown>
  url?: string
  occurredAt?: string
}

export function reportWebsiteError(payload: WebsiteErrorPayload): void {
  if (typeof window === 'undefined') return

  const body = JSON.stringify({
    ...payload,
    url: payload.url || window.location.href,
    occurredAt: payload.occurredAt || new Date().toISOString(),
    userAgent: navigator.userAgent,
    language: navigator.language,
  })

  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/error-report', blob)
      return
    }
  } catch {
    // Fall back to fetch below when sendBeacon fails.
  }

  void fetch('/api/error-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Intentionally ignored to avoid disrupting user flow.
  })
}