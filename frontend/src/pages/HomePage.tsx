import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Savings Goals</h1>
        <div className="flex items-center">
          <p className="mr-4">Welcome, {user?.displayName || 'User'}</p>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>
      <main className="p-4">
        {/* Main application content will go here */}
        <p>Your savings goals will be displayed here.</p>
      </main>
    </div>
  );
};

export default HomePage;
