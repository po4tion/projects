import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useUser(id: string, shouldFetch: boolean) {
  const { data, error } = useSWR(
    shouldFetch ? `/api/apexlegends?uid=${id}` : null,
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useProfileImg(id: string, shouldFetch: boolean) {
  const { data, error } = useSWR(
    shouldFetch ? `/api/tracker?uid=${id}` : null,
    fetcher
  );

  return {
    url: data,
    isError: error,
  };
}

export function usePredatorLimit(shouldFetch: boolean) {
  const { data, error } = useSWR(
    shouldFetch ? `/api/predators` : null,
    fetcher
  );

  return {
    predator: data,
    isError: error,
  };
}
