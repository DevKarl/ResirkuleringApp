import { useState } from "react";
import { RegisterRequest, RegisterResponse } from "../../types/userTypes";
import { toast } from "sonner";

export const usePostRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postRegister = async (formData: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Bruker registrert!");
    } catch (error) {
      toast.error("Kan ikke registrere bruker akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postRegister };
};
