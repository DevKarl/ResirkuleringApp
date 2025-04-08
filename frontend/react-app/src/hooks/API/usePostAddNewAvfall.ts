import { useState } from "react";
import { toast } from "sonner";
import { NewAvfallPost } from "../../types";

export const usePostAddNewAvfall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const postAddNewAvfall = async (formData: NewAvfallPost) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/createNewAvfall", {
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
      toast.success("Avfall ble lagt til!");
    } catch (error) {
      toast.error("Kan ikke legge til avfall akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, postAddNewAvfall };
};
