import { AuthContextProvider, AuthContext } from 'contexts/AuthContext'
import AppRouter from 'router/AppRouter'
import { useContext, useEffect } from 'react'
import { setOnSessionExpired } from 'config/Axios'
import SessionExpiredModal from './components/common/SessionExpiredModal';

function AppContent() {
  const { sessionExpired, setSessionExpired, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    setOnSessionExpired(() => setSessionExpired(true));
  }, [setSessionExpired]);

  return (
    <>
      <AppRouter />
      <SessionExpiredModal
        open={sessionExpired}
        onClose={() => setSessionExpired(false)}
        onConfirm={async () => {
          await logoutUser();
          setSessionExpired(false);
          window.location.href = "/login";
        }}
      />
    </>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <AppContent />
    </AuthContextProvider>
  )
}

export default App;
