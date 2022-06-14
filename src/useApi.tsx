import { useEffect, useState } from 'react';

interface ApiResponse {
  data: any;
  error: any;
  isLoading: boolean;
}

export const useApi = <DataType,>(url: string): ApiResponse => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>(null as unknown as DataType);
  const [error, setError] = useState<any>(null);

  const fetchApi = (url: string) => {
    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchApi(url);
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};
