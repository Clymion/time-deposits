import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AddGoalDialog } from '@/components/AddGoalDialog';

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Savings Goals</h1>
        <div className="flex items-center gap-4">
          <p>Welcome, {user?.displayName || 'User'}</p>
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        </div>
      </header>
      <main className="p-4">
        <div className="flex justify-end mb-4">
          <AddGoalDialog />
        </div>
        {/* Main application content will go here */}
        <p>Your savings goals will be displayed here.</p>
      </main>
    </div>
  );
};

export default HomePage;
