import { useRef, useState } from "react";
import { toast } from "sonner";
import { Stat } from "../../types/statTypes";

export const useGetMainUserStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainUserStats, setMainUserStats] = useState<Stat[]>([]);
  const hasFetched = useRef(false);

  const getMainUserStats = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
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
      setMainUserStats(data);
    } catch (error) {
      toast.error("Kan ikke hente statistikk over avfall akkurat nå");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, mainUserStats, getMainUserStats };
};
