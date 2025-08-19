import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <>
      {user ? <HomePage /> : <LoginPage />}
    </>
  )
}

export default App
