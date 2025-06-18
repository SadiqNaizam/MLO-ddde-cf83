import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AtelierPage from "./pages/AtelierPage";
import CollectionsPage from "./pages/CollectionsPage";
import HomepageLookbook from "./pages/HomepageLookbook";
import OrderSummaryCheckoutPage from "./pages/OrderSummaryCheckoutPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<HomepageLookbook />} />
          <Route path="/atelier" element={<AtelierPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/order-summary-checkout" element={<OrderSummaryCheckoutPage />} />
          <Route path="/user-dashboard" element={<UserDashboardPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
