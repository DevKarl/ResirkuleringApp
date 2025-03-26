import { useState } from "react";
import { useAppContext } from "../../context/ContextProvider";

export interface HivAvfallData {
  userId: number;
  avfallsId: string;
}

export const usePostHivAvfall = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<string | null>(null);
  
    const postHivAvfall = async (postData: HivAvfallData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/postHivAvfall", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
  
        if (!response.ok) {
          setError(`Error! Status: ${response.status}`);
          return;
        }
        const data = await response.json();
        setResponseData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, error, responseData, postHivAvfall };
};