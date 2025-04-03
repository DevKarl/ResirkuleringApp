import { useState } from "react";
import { useAppContext } from "../../context/ContextProvider";
import { toast } from "sonner";

export const usePostLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppContext();

  const postLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      setUser(null);
      toast.info(data.message);
      // document.cookie =
      //   "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      toast.error("Noe gikk galt. Kan ikke logge ut.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postLogout };
};
