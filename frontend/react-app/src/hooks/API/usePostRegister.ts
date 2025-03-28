import { useState } from "react";
import { RegisterRequest, RegisterResponse } from "../../types/userTypes";

export const usePostRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successResponse, setSuccessResponse] =
    useState<RegisterResponse>(null);
  const [error, setError] = useState<string | null>(null);

  const postRegister = async (formData: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // @ts-ignore
        setError(response.message);
        return;
      }
      setSuccessResponse("Bruker registrert! ✅");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, successResponse, postRegister };
};
