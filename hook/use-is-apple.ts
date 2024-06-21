import { useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

export function useIsApple() {
  const [isApple, setIsApple] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsApple(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
  }, []);

  return isApple;
}
