import { useState } from "react";
import { toast } from "sonner";
import { Avfall } from "../../types";

export const usePostUpdateAvfall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postUpdateAvfall = async (formData: Avfall) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/postUpdateAvfall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Avfall ble oppdatert!");
    } catch (error) {
      toast.error("Kan ikke oppdatere avfall akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postUpdateAvfall };
};
