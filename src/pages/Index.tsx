
import { useAuth } from "@/context/AuthContext";
import { Dashboard } from "@/components/Dashboard";
import { AuthPage } from "@/components/AuthPage";

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
};

export default Index;
