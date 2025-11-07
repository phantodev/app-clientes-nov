import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface UseHandleErrorsProps {
  errorQuery: Error | AxiosError | unknown | null | undefined;
}

interface AxiosErrorData {
  message: string;
  error: string;
}

export function useHandleErrors({ errorQuery }: UseHandleErrorsProps) {
 
  const navigate = useNavigate();

  useEffect(() => {
    if (errorQuery) {
      const axiosError = errorQuery as AxiosError;
      
      if (axiosError.response?.status === 401) {
        toast.error('Sessão expirada. Por favor, faça login novamente.');
        
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      }
      if (axiosError.response?.status === 400) {
        const axiosErrorData = axiosError.response?.data as AxiosErrorData;
        toast.error(axiosErrorData.message);
      }
    }
  }, [errorQuery]);
}

