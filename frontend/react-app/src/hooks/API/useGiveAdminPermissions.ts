import { useState } from "react";
import { toast } from "sonner";

export const useGiveAdminPermissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const giveAdminPermissions = async (brukerId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/giveAdminPermissions?brukerId=${brukerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Avfall ble slettet!");
    } catch (error) {
      toast.error("Kan ikke gi admintillatelse akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, giveAdminPermissions };
};
