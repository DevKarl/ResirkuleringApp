import { useState } from "react";
import { useAppContext } from "../../context/ContextProvider";

export const usePostLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAppContext();

  const postLogout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setUser(null);
      setResponse(data.message);
      document.cookie =
        "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, error, postLogout };
};
