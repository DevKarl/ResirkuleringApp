import { useRef, useState } from "react";
import { toast } from "sonner";
import { Stat } from "../../types/statTypes";
import { User } from "../../types";

export const useGetSharedUsersStats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const hasFetched = useRef(false);

  const getSharedUsersStats = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setIsLoading(true);
    try {
      const response = await fetch("/api/getSharedUsersStats", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
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

  return { isLoading, data, getSharedUsersStats };
};
