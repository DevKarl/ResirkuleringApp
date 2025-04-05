import { useRef, useState } from "react";
import { useAppContext } from "../../context/ContextProvider";
import { toast } from "sonner";

export const useGetUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAppContext();
  const hasFetched = useRef(false);

  const getUser = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/getUser", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = await response?.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setUser(data);
      toast.info("Bruker: " + data.fornavn + " er logget inn");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, getUser };
};
