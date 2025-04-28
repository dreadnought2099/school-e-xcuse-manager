
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SubmitPage from "./pages/SubmitPage";
import StatusPage from "./pages/StatusPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import UserManagementPage from "./pages/UserManagementPage";

// Admin only route wrapper
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentReviewer, isAdmin } = useApp();
  
  if (!currentReviewer || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/submit" element={<SubmitPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route 
                  path="/user-management" 
                  element={
                    <AdminRoute>
                      <UserManagementPage />
                    </AdminRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

