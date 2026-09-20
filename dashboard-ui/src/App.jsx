import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SchemeProvider } from './context/SchemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLandingPage from './pages/PublicLandingPage';
import PublicSchemesPage from './pages/PublicSchemesPage';
import CitizenKioskPage from './pages/CitizenKioskPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminSchemesPage from './pages/AdminSchemesPage';
import AdminContactPage from './pages/AdminContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <SchemeProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Landing Page */}
            <Route path="/" element={<PublicLandingPage />} />

            {/* 2. Public Welfare Schemes Directory */}
            <Route path="/schemes" element={<PublicSchemesPage />} />

            {/* 2. Common Aliases (Safe Public Redirects - Never Bypasses Admin) */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/landing" element={<Navigate to="/" replace />} />

            {/* 3. Dedicated Editorial About Page */}
            <Route path="/about" element={<AboutPage />} />

            {/* 4. Full-Screen Citizen e-Sevai Kiosk Terminal */}
            <Route path="/citizen-kiosk-portal" element={<CitizenKioskPage />} />

            {/* 5. Dedicated Administrative Login Portal */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* 6. Admin IoT Console & Hardware Telemetry Terminal (STRICTLY PROTECTED) */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-iot-console"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/schemes"
              element={
                <ProtectedRoute>
                  <AdminSchemesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact"
              element={
                <ProtectedRoute>
                  <AdminContactPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={<Navigate to="/admin/schemes" replace />}
            />

            {/* 7. Fallback: Safe Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SchemeProvider>
    </AuthProvider>
  );
}

export default App;
