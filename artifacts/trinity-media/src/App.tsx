import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/components/ThemeProvider';
import NotFound from '@/pages/not-found';
import ServiceDetail from '@/pages/ServiceDetail';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import JourneyPage from './pages/JourneyPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import OurWorksPage from './pages/OurWorksPage';
import AwardsPage from './pages/AwardsPage';
import ContactPage from './pages/ContactPage';
import FacilitiesPage from './pages/FacilitiesPage';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/our-journey" component={JourneyPage} />
      <Route path="/our-works" component={OurWorksPage} />
      <Route path="/why-choose-us" component={OurWorksPage} />
      <Route path="/awards" component={AwardsPage} />
      <Route path="/our-facilities" component={FacilitiesPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
