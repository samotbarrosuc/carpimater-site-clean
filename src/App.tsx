import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
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

const queryClient = new QueryClient();

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
        <Route path="/construção" component={() => <Redirect to="/construcao" />} />
        <Route path="/empreiteiros" component={() => <Redirect to="/construcao" />} />
        <Route path="/politica-de-privacidade" component={PrivacyPolicyPage} />
        <Route path="/termos-e-condicoes" component={TermsPage} />
        <Route component={NotFound} />
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
