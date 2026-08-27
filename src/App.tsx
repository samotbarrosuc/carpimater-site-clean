import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SeoManager from "@/components/SeoManager";
import { CartProvider } from "@/context/CartContext";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const VinilicoPage = lazy(() => import("@/pages/VinilicoPage"));
const FlutuantePage = lazy(() => import("@/pages/FlutuantePage"));
const CozinhaPage = lazy(() => import("@/pages/CozinhaPage"));
const EmpreiteirosPage = lazy(() => import("@/pages/EmpreiteirosPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const LojaPage = lazy(() => import("@/pages/LojaPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const ContactosPage = lazy(() => import("@/pages/ContactosPage"));
const RodapesPage = lazy(() => import("@/pages/RodapesPage"));
const MontagemCozinhasPage = lazy(() => import("@/pages/LocalServicePages").then((module) => ({ default: module.MontagemCozinhasPage })));
const RoupeirosPage = lazy(() => import("@/pages/LocalServicePages").then((module) => ({ default: module.RoupeirosPage })));
const InstalacaoRodapesPage = lazy(() => import("@/pages/LocalServicePages").then((module) => ({ default: module.InstalacaoRodapesPage })));
const LocalPavimentosPage = lazy(() => import("@/pages/LocalPavimentosPage").then((module) => ({ default: module.LocalPavimentosPage })));
const ZonasPavimentosPage = lazy(() => import("@/pages/LocalPavimentosPage").then((module) => ({ default: module.ZonasPavimentosPage })));

const queryClient = new QueryClient();

function FallbackRoute() {
  const [location] = useLocation();
  const pathname = location.split("?")[0].replace(/\/$/, "") || "/";

  if (pathname === "/zonas-pavimentos-regiao-centro") {
    return <ZonasPavimentosPage />;
  }

  if (/^\/pavimentos-[a-z0-9-]+$/i.test(pathname)) {
    return <LocalPavimentosPage />;
  }

  return <NotFound />;
}

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/vinilico" component={VinilicoPage} />
        <Route path="/flutuante" component={FlutuantePage} />
        <Route path="/pavimentos" component={() => <Redirect to="/loja" />} />
        <Route path="/loja" component={LojaPage} />
        <Route path="/rodapes" component={RodapesPage} />
        <Route path="/encomenda" component={CheckoutPage} />
        <Route path="/contactos" component={ContactosPage} />
        <Route path="/cozinha" component={CozinhaPage} />
        <Route path="/construcao" component={EmpreiteirosPage} />
        <Route path="/montagem-cozinhas-coimbra" component={MontagemCozinhasPage} />
        <Route path="/roupeiros-por-medida-coimbra" component={RoupeirosPage} />
        <Route path="/instalacao-rodapes-coimbra" component={InstalacaoRodapesPage} />
        <Route path="/zonas-pavimentos-regiao-centro" component={ZonasPavimentosPage} />
        <Route path="/construção" component={() => <Redirect to="/construcao" />} />
        <Route path="/empreiteiros" component={() => <Redirect to="/construcao" />} />
        <Route path="/politica-de-privacidade" component={PrivacyPolicyPage} />
        <Route path="/termos-e-condicoes" component={TermsPage} />
        <Route component={FallbackRoute} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter>
            <Router />
            <SeoManager />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
