import { useState } from "react";
import { toast } from "sonner";

export const useDeleteAvfall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteAvfall = async (avfallId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deleteAvfall?avfallId=${avfallId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Avfall ble slettet!");
    } catch (error) {
      toast.error("Kan ikke ikke slette avfall akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deleteAvfall };
};
