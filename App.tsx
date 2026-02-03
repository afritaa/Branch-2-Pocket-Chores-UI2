import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountPage } from './pages/AccountPage';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { SoundProvider } from './hooks/useSound';
import { isAuthConfigured } from './lib/auth';

const App: React.FC = () => {
  if (!isAuthConfigured) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-800">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Configuration Missing</h1>
          <p className="text-slate-600 mb-6">
            The Neon Auth URL is not configured.
          </p>
          <div className="bg-slate-100 p-4 rounded-lg text-left overflow-x-auto">
            <p className="text-xs font-mono text-slate-500 mb-2">Please create a <span className="font-bold text-slate-700">.env</span> file in the root directory with the following variable:</p>
            <code className="block text-sm font-mono text-blue-600 whitespace-nowrap">
              VITE_NEON_AUTH_URL=...
            </code>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            You can find this URL in your Neon project dashboard under <strong>Authentication</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <SoundProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/:pathname?" element={<AuthPage />} />
          <Route path="/account/:pathname?" element={<AccountPage />} />
        </Routes>
    </SoundProvider>
  );
};

export default App;
