import { useState } from "react";
import { useAppContext } from "../../context/ContextProvider";
import { Avfallspunkt } from "../../types";

interface HivAvfallData {
  avfallsId: number;
  avfallsPunktId: number;
}

export const usePostHivAvfall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {setScannedAvfallResult} = useAppContext();

  const postHivAvfall = async (avfallsId: number, avfallsPunktId: number) => {
    setIsLoading(true);
    setError(null);
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
        setError(data);
        return;
      }
      setScannedAvfallResult(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postHivAvfall };
};
