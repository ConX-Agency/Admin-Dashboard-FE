import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define api functions' interfaces here
interface ConxContextType {
  token: string | null;
  login: (formData: FormData) => Promise<boolean>;
  logout: () => void;
}

// Create the ConxContext with a default value
const ConxContext = createContext<ConxContextType | undefined>(undefined);

// ConxContext component
export const ConxProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ls_token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (ls_token && isLoggedIn) {
      setToken(ls_token); // Set user details
    }
  }, []);

  // Define api functions here
  const login = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/admin/login`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      setToken(data.token); // Set user details
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setToken(null);
    router.push('/auth/login');
  };

  return <ConxContext.Provider value={{
    token,
    login,
    logout
  }}>{children}</ConxContext.Provider>;
};

// Custom hook to use the AuthContext
export const useConx = (): ConxContextType => {
  const context = useContext(ConxContext);
  if (context === undefined) {
    throw new Error('useConx must be used within an ConxProvider');
  }
  return context;
};
