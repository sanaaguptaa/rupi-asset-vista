
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { ThemeSwitcher } from "./ThemeSwitcher";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800">
      <div className="absolute top-4 right-4">
        <ThemeSwitcher />
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">AssetVista</h1>
          <p className="text-muted-foreground text-center">Comprehensive Fixed Asset Management Solution</p>
        </div>

        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}
