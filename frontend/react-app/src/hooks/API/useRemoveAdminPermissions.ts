import { useState } from "react";
import { toast } from "sonner";

export const useRemoveAdminPermissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const removeAdminPermissions = async (brukerId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/removeAdminPermissions?brukerId=${brukerId}`,
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
      toast.success(data.message);
    } catch (error) {
      toast.error(
        "Kan ikke fjerne admintillatelse akkurat nå. Prøv igjen senere."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, removeAdminPermissions };
};
