import { useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export default function useDimensions(ref: React.RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function updateDimensions() {
      if (!ref.current) return;

      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    if (ref.current) observer.observe(ref.current);

    window.addEventListener("resize", updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [ref]);

  return dimensions;
}
