import { useState } from "react";
import { toast } from "sonner";

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteUser = async (brukerId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/deleteUser?brukerId=${brukerId}`, {
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
      toast.success(data.message);
    } catch (error) {
      toast.error("Kan ikke ikke slette bruker akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, deleteUser };
};
