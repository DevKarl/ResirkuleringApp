import { useRef, useState } from "react";
import { toast } from "sonner";

export const useGetAllAvfallstyper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const hasFetched = useRef(false);

  const getAllAvfallstyper = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setIsLoading(true);
    try {
      const response = await fetch("/api/getAllAvfallstyper", {
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
        "Kan ikke hente data over avfallstyper akkurat nå. Prøv igjen senere."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, getAllAvfallstyper };
};
