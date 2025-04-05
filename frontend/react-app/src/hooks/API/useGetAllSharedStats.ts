import { useState } from "react";
import { toast } from "sonner";

export const useGetAllSharedStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const getPublicStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getAllSharedStats", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = await response?.json();
      if (!response.ok) {
        return;
      }
      setData(data);
    } catch (error) {
      toast.error(
        "Kan ikke hente statistikk over offentlig avfallsdata akkurat nå"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, getPublicStats };
};
