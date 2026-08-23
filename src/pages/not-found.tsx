import { Home, ShoppingBag } from 'lucide-react'
import { BUSINESS_NAME } from '@/content/site'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        <a
          href="/"
          className="inline-flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5 transition-colors hover:bg-primary/20"
        >
          <img
            src="/images/logo-carpimater.png"
            alt="Logotipo CarpiMater"
            className="h-10 w-10 rounded-lg bg-white object-cover"
          />
          <span className="font-display text-lg font-bold text-foreground">{BUSINESS_NAME}</span>
        </a>

        <p className="mt-10 font-display text-7xl font-bold text-primary sm:text-8xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          A página que procura não existe ou foi movida. Volte ao início ou visite a nossa loja
          para conhecer pavimentos, cozinhas e carpintaria por medida.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-muted px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/80 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Voltar ao início
          </a>
          <a
            href="/loja"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <ShoppingBag className="h-4 w-4" />
            Ver loja
          </a>
        </div>
      </div>
    </div>
  )
}
