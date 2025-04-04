import { useState, useCallback } from "react";
import { ScanAvfallResponse } from "../../types";
import { useAppContext } from "../../context/ContextProvider";
import { toast } from "sonner";

export const useGetCoordsByBarcode = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { setScannedAvfallResult } = useAppContext();

  const getCoordsByBarcode = useCallback(async (barcode: string) => {
    setIsLoading(true);
    // setError(null);
    try {
      const response = await fetch(`/api/scanAvfall?strekkode=${barcode}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const data: ScanAvfallResponse = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      setScannedAvfallResult(data);
      setIsSuccess(true);
      toast.success("Fant avfall: " + data.avfall.navn);
    } catch (error) {
      toast.error("Noe gikk galt med scanning, prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, isSuccess, getCoordsByBarcode };
};
