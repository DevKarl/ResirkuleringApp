import { Toaster } from "sonner";
import useBreakpoints from "../hooks/useBreakpoints";

export const CustomToaster = () => {
  const { isDesktop } = useBreakpoints();
  return (
    <Toaster
      position={isDesktop ? "bottom-center" : "top-center"}
      richColors
      expand
    />
  );
};
