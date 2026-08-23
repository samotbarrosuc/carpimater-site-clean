export const CONTACT_MOBILE_ERROR = 'Introduza um número de telemóvel com 9 algarismos, começado por 9.'

export function sanitizePortugueseMobile(value: string): string {
  return value.replace(/\D/g, '').slice(0, 9)
}

export function isValidPortugueseMobile(value: string): boolean {
  return /^9\d{8}$/.test(value)
}

export function validateContactDetails(name: string, mobile: string): string | null {
  if (name.trim().length < 2) return 'Introduza o seu nome.'
  if (!isValidPortugueseMobile(mobile)) return CONTACT_MOBILE_ERROR
  return null
}
