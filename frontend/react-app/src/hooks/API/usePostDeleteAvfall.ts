import { useState } from "react";
import { toast } from "sonner";
import { DeleteAvfallPost } from "../../types";

export const usePostDeleteAvfall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postDeleteAvfall = async (formData: DeleteAvfallPost) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/postDeleteAvfall", {
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
      toast.success("Avfall ble slettet!");
    } catch (error) {
      toast.error("Kan ikke ikke slette avfall akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postDeleteAvfall };
};
