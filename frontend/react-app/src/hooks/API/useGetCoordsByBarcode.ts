import { useState, useCallback } from "react";
import { ScanAvfallResponse } from "../../types";
import { useAppContext } from "../../context/ContextProvider";

export const useGetCoordsByBarcode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { setScannedAvfallResult } = useAppContext();

  const getCoordsByBarcode = useCallback(async (barcode: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/scanAvfall?strekkode=${barcode}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        setError(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data: ScanAvfallResponse = await response.json();
      setScannedAvfallResult(data);
      setIsSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, error, isSuccess, getCoordsByBarcode };
};
