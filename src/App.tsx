import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PavimentosPage from "@/pages/PavimentosPage";
import PavimentosLanding from "@/pages/PavimentosLanding";
import VinilicoPage from "@/pages/VinilicoPage";
import FlutuantePage from "@/pages/FlutuantePage";
import CozinhaPage from "@/pages/CozinhaPage";
import EmpreiteirosPage from "@/pages/EmpreiteirosPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/vinilico" component={VinilicoPage} />
      <Route path="/flutuante" component={FlutuantePage} />
      <Route path="/pavimentos" component={PavimentosLanding} />
      <Route path="/cozinha" component={CozinhaPage} />
      <Route path="/empreiteiros" component={EmpreiteirosPage} />
      <Route path="/politica-de-privacidade" component={PrivacyPolicyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
