import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/data/error';
import { Client, ClientAddress } from '@/data/clients';

const ConxContext = createContext<ConxContextType | undefined>(undefined);

// Add api functions' interfaces here
interface ConxContextType {
  token: string | null;
  login: (formData: FormData) => Promise<boolean>;
  logout: () => void;

  // Clients
  getAllClients: () => Promise<Client[]>;
  getClient: (clientId: number) => Promise<Client>;
  addClient: (formData: FormData) => Promise<Client>;
  updateClient: (clientId: number, formData: FormData) => Promise<Client>;
  deleteClient: (clientId: number) => Promise<boolean>;
  addClientAddress: (formData: FormData) => Promise<ClientAddress>;
  updateClientAddress: (clientAddressId: number, formData: FormData) => Promise<ClientAddress>;
  deleteClientAddress: (clientAddressId: number) => Promise<boolean>;

  // Influencers
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
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
    setToken(null);
    router.push('/auth/login');
  };

  // Client API functions
  const getAllClients = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const getClient = async (clientId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/${clientId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

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
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const updateClient = async (clientId: number, formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/${clientId}`,
      {
        method: 'PATCH',
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
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const deleteClient = async (clientId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/${clientId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const addClientAddress = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/location`,
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
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const updateClientAddress = async (clientAddressId: number, formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/location/${clientAddressId}`,
      {
        method: 'PATCH',
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
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  const deleteClientAddress = async (clientAddressId: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/clients/location/${clientAddressId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  // Influencer API functions
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
      const error = await response.json();
      throw new ApiError(response.status, error.message);
    }
  }

  // Add create api functions here
  return <ConxContext.Provider value={{
    token,
    login,
    logout,

    // Clients
    getAllClients,
    getClient,
    addClient,
    updateClient,
    deleteClient,
    addClientAddress,
    updateClientAddress,
    deleteClientAddress,

    // Influencers
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
