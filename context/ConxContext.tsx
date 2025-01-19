import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/data/error';

const ConxContext = createContext<ConxContextType | undefined>(undefined);

// Add api functions' interfaces here
interface ConxContextType {
  token: string | null;
  login: (formData: FormData) => Promise<boolean>;
  logout: () => void;
  addClient: (formData: FormData) => Promise<any>;
  addInfluencer: (formData: FormData) => Promise<any>;
}

export const ConxProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ls_token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (ls_token && isLoggedIn) {
      setToken(ls_token);
    }
  }, []);

  // Define api functions here
  const login = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/admin/login`,
      { method: 'POST', body: formData }
    );
    if (response.ok) {
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        setToken(data.token);
        return true;
      }
      return false;
    } else {
      throw new ApiError(response.status, response.statusText);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setToken(null);
    router.push('/auth/login');
  };

  const addClient = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new ApiError(response.status, response.statusText);
    }
  }

  const addInfluencer = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/influencers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new ApiError(response.status, response.statusText);
    }
  }

  // Add create api functions here
  return <ConxContext.Provider value={{
    token,
    login,
    logout,
    addClient,
    addInfluencer
  }}>{children}</ConxContext.Provider>
}

export const useConx = (): ConxContextType => {
  const context = useContext(ConxContext);
  if (context === undefined) {
    throw new Error('useConx must be used within an ConxProvider');
  }
  return context;
};
