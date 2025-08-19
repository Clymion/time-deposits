import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome</h1>
        <p className="mb-6">Please log in to continue</p>
        <Button onClick={loginWithGoogle}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
