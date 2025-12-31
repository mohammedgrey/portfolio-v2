import { useEffect, useRef } from "react";

const useUpdateEffect = (effect: () => void, deps: React.DependencyList) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, deps);
};

export default useUpdateEffect;
