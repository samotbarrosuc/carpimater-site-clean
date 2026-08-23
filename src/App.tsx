import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import VinilicoPage from "@/pages/VinilicoPage";
import FlutuantePage from "@/pages/FlutuantePage";
import CozinhaPage from "@/pages/CozinhaPage";
import EmpreiteirosPage from "@/pages/EmpreiteirosPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import LojaPage from "@/pages/LojaPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ContactosPage from "@/pages/ContactosPage";
import RodapesPage from "@/pages/RodapesPage";
import SeoManager from "@/components/SeoManager";
import { CartProvider } from "@/context/CartContext";

const queryClient = new QueryClient();

function Router() {
  return (
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
      <Route component={NotFound} />
    </Switch>
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
