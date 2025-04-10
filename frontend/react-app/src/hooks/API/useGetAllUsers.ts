import { useRef, useState } from "react";
import { toast } from "sonner";
import { User } from "../../types";

export const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/getAllUsers", {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      const data = await response?.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      setUsers(data);
    } catch (error) {
      toast.error("Kan ikke hente brukerdata akkurat nå. Prøv igjen senere.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, users, getAllUsers };
};
