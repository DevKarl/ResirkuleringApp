import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "../../context/ContextProvider";
import { User } from "../../types";

export const usePostDeactivateStatShare = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAppContext();

  const postDeactivateStatShare = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/postDeactivateStatShare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setUser((prev: User) => ({ ...prev, delerStat: false }));
    } catch (error) {
      toast.error("Kan ikke skjule statistikk akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postDeactivateStatShare };
};
