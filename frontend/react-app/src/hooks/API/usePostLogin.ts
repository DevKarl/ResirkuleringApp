import { useState } from "react";
import { LoginRequest } from "../../types/userTypes";
import { useAppContext } from "../../context/ContextProvider";

export const usePostLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAppContext();

  const postLogin = async (formData: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      setUser(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postLogin };
};
