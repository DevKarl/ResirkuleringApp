import { useState } from "react";
import { toast } from "sonner";

export const useGetStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const getStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getAvfallsLogg", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = await response?.json();
      if (!response.ok) {
        return;
      }
      setData(data);
    } catch (error) {
      toast.error("Kan ikke hente statistikk over avfall akkurat nå");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, getStats };
};
