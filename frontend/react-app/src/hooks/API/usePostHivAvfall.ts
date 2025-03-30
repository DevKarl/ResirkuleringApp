import { useState } from "react";
import { useAppContext } from "../../context/ContextProvider";
import { Avfallspunkt } from "../../types";
import { toast } from "sonner";

interface HivAvfallData {
  avfallsId: number;
  avfallsPunktId: number;
}

export const usePostHivAvfall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setScannedAvfallResult } = useAppContext();

  const postHivAvfall = async (avfallsId: number, avfallsPunktId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/postHivAvfall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avfallsId, avfallsPunktId }),
      });

      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      setScannedAvfallResult(null);
    } catch (error) {
      toast.error(
        "Kan ikke registrere hivd avfall akkurat nå. Vennligst prøv igjen senere."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postHivAvfall };
};
