import { useEffect, useState } from 'react';
import { createClient } from 'utils/axios';

export function useDataApi<T>(
  initialUrl: string,
  initialData: T,
): [
  { data: T; isLoading: boolean; isError: boolean },
  React.Dispatch<React.SetStateAction<string>>,
] {
  const [data, setData] = useState<T>(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await createClient()(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}
