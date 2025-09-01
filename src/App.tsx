import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={
                  <PublicRoute>
                    <LandingPage />
                  </PublicRoute>
                } />
                <Route path="/signin" element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                } />
                <Route path="/signup" element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                } />
                <Route path="/forgotpassword" element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* Redirect to dashboard for authenticated users */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              className="!top-4 !right-4"
              toastClassName="!rounded-lg !shadow-lg"
              bodyClassName="!p-4"
            />
          </Suspense>
        </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;