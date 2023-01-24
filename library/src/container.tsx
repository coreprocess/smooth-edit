import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  ReactNode,
} from "react";
import { SmoothEditContext } from "./context";
import { detectCssTransitionEnd } from "./utils/css-transition";
import { fixElementContentPosition } from "./utils/fix-element";

export function SmoothEditContainer({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  // edit mode transition management
  const transition = useRef(false);

  const handleTransition = useCallback((id: string) => {
    // skip if already in transition
    if (transition.current) {
      return;
    }

    // get refs to elements
    const input = refs.current.input.get(id);
    const { scrollArea, topBuffer, bottomBuffer } = refs.current;
    if (!input || !scrollArea || !topBuffer || !bottomBuffer) {
      console.error("edit mode transition: could not find element refs");
      return;
    }

    // mark transition as active
    transition.current = true;

    // fix element content position
    const stopFixation = fixElementContentPosition(
      input,
      scrollArea,
      topBuffer,
      bottomBuffer
    );

    // detect end of transition
    detectCssTransitionEnd(scrollArea, 250, () => {
      // stop fixation
      stopFixation();

      // mark transition as inactive
      transition.current = false;

      // print debug info
      console.log("edit mode transition: finished");
    });
  }, []);

  // edit mode management
  const [editMode, setEditMode] = useState(false);

  const activateEditMode = useCallback(
    (id?: string) => {
      if (!editMode) {
        if (id) {
          handleTransition(id);
        }
        setEditMode(true);
      }
    },
    [editMode, handleTransition]
  );

  const deactivateEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  // reference handling
  const refs = useRef<{
    navBar: HTMLElement | null;
    scrollArea: HTMLElement | null;
    topBuffer: HTMLElement | null;
    bottomBuffer: HTMLElement | null;
    input: Map<string, HTMLElement>;
  }>({
    navBar: null,
    scrollArea: null,
    topBuffer: null,
    bottomBuffer: null,
    input: new Map(),
  });

  const setNavBarRef = useCallback((node: HTMLElement | null) => {
    refs.current.navBar = node;
  }, []);

  const setScrollAreaRef = useCallback((node: HTMLElement | null) => {
    refs.current.scrollArea = node;
  }, []);

  const setTopBufferRef = useCallback((node: HTMLElement | null) => {
    refs.current.topBuffer = node;
  }, []);

  const setBottomBufferRef = useCallback((node: HTMLElement | null) => {
    refs.current.bottomBuffer = node;
  }, []);

  const setInputRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) {
      refs.current.input.set(id, node);
    } else {
      refs.current.input.delete(id);
    }
  }, []);

  // create context value
  const context = useMemo(
    () => ({
      editMode,
      activateEditMode,
      deactivateEditMode,
      setNavBarRef,
      setScrollAreaRef,
      setTopBufferRef,
      setBottomBufferRef,
      setInputRef,
    }),
    [
      editMode,
      activateEditMode,
      deactivateEditMode,
      setNavBarRef,
      setScrollAreaRef,
      setTopBufferRef,
      setBottomBufferRef,
      setInputRef,
    ]
  );

  // render context
  return (
    <SmoothEditContext.Provider value={context}>
      {children}
    </SmoothEditContext.Provider>
  );
}
