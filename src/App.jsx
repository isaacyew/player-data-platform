import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext';
import { PlayerProvider } from './context/PlayerContext';
import Layout from './components/Layout/Layout';
import AccountPage from './pages/AccountPage';
import ProgressPage from './pages/ProgressPage';
import CurrencyPage from './pages/CurrencyPage';
import HistoryPage from './pages/HistoryPage';
import AdsPage from './pages/AdsPage';
import LogsPage from './pages/LogsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PlayerProvider>
          <GameProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/account" replace />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/currency" element={<CurrencyPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                  <Route path="/ads" element={<AdsPage />} />
                  <Route path="/logs" element={<LogsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </Layout>
            </Router>
          </GameProvider>
        </PlayerProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
