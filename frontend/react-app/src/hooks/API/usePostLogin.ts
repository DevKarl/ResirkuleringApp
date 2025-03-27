import { useState } from "react";
import { LoginRequest, User } from "../../types/userTypes";
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

      if (!response.ok) {
        setError(`Error! Status: ${response.status}`);
        return;
      }
      console.log(response);
      const data = await response.json();
      console.log({ data });
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
