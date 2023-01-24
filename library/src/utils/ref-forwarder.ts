import { MutableRefObject, Ref, RefCallback, useCallback } from "react";

// hook to forward a ref to multiple refs
export function useRefForwarder(
  ...refs: (
    | RefCallback<HTMLElement | null>
    | MutableRefObject<HTMLElement | null>
  )[]
) {
  return useCallback(
    (node: HTMLElement | null) => {
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs]
  );
}
