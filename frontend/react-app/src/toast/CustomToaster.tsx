import { Toaster } from "sonner";
import useBreakpoints from "../hooks/useBreakpoints";

export const CustomToaster = () => {
  const screenSize = useBreakpoints();
  console.log({ screenSize });
  const isMediumOrSmaller = screenSize === "small" || screenSize === "medium";

  return (
    <Toaster
      position={isMediumOrSmaller ? "top-center" : "bottom-right"}
      richColors
      expand
    />
  );
};
