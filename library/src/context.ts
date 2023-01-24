import { createContext } from "react";

type SmoothEditContext = {
  editMode: boolean;
  activateEditMode: (id?: string) => void;
  deactivateEditMode: () => void;
  setNavBarRef: (node: HTMLElement | null) => void;
  setScrollAreaRef: (node: HTMLElement | null) => void;
  setTopBufferRef: (node: HTMLElement | null) => void;
  setBottomBufferRef: (node: HTMLElement | null) => void;
  setInputRef: (id: string, node: HTMLElement | null) => void;
};

export const SmoothEditContext = createContext<SmoothEditContext>({
  editMode: false,
  activateEditMode: (id?: string) => {},
  deactivateEditMode: () => {},
  setNavBarRef: (node: HTMLElement | null) => {},
  setScrollAreaRef: (node: HTMLElement | null) => {},
  setTopBufferRef: (node: HTMLElement | null) => {},
  setBottomBufferRef: (node: HTMLElement | null) => {},
  setInputRef: (id: string, node: HTMLElement | null) => {},
});
