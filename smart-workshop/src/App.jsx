import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';
import SplashScreen from './components/ui/SplashScreen';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app boot sequence for the Splash Screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <AuthProvider>
          <div className="animate-in fade-in duration-500">
            <AppRoutes />
          </div>
        </AuthProvider>
      )}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'text-sm font-sans',
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#4CAF50',
            },
          },
          error: {
            style: {
              background: '#F44336',
            },
          },
        }}
      />
    </>
  );
}

export default App;
