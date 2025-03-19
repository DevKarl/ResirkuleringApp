import { useState, useCallback } from "react";

export type Avfall = {
  id: number;
  type: string;
};

export type Avfallspunkt = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type ScanAvfallResponse = {
  avfall: Avfall;
  avfallspunkter: Avfallspunkt[];
};

export const useFetchCoordsByBarcode = () => {
  const [data, setData] = useState<ScanAvfallResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordsByBarcode = useCallback(async (barcode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/scanAvfall?strekkode=${barcode}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ScanAvfallResponse = await response.json();
      setData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchCoordsByBarcode };
};
