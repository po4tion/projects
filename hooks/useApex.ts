import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useApex(id: string, shouldFetch: boolean) {
  const { data, error } = useSWR(
    shouldFetch
      ? `https://api.mozambiquehe.re/bridge?version=5&platform=PC&player=${id}&auth=Xw7aOON3VpfYq2pnpXpO`
      : null,
    fetcher
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}
