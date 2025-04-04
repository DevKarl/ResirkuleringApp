import { useState, useEffect } from "react";

const BREAKPOINTS = {
  small: 480, // mobile
  medium: 768, // tablet
  // large: 1024, // desktop
};

const useBreakpoints = (): string => {
  const [screenSize, setScreenSize] = useState<string>("large");

  const handleResize = () => {
    const width = window.innerWidth;

    if (width < BREAKPOINTS.small) {
      setScreenSize("small");
    } else if (width < BREAKPOINTS.medium) {
      setScreenSize("medium");
    } else {
      setScreenSize("large");
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useBreakpoints;
