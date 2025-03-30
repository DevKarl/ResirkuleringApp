import { useState } from "react";
import { LoginRequest } from "../../types/userTypes";
import { useAppContext } from "../../context/ContextProvider";
import { toast } from "sonner";

export const usePostLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppContext();

  const postLogin = async (formData: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
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
      setUser(data);
      toast.success("Du har logget inn!");
    } catch (error) {
      toast.error("Kan ikke logge inn akkurat nå. Prøv igjen senere");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postLogin };
};
