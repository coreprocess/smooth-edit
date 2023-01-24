import { createContext } from "react";

type SmoothEditContext = {
    editMode: boolean;
    activateEditMode: (id?: string) => void;
    deactivateEditMode: () => void;
    setNavBarRootRef: (node: HTMLElement | null) => void;
    setScrollAreaRootRef: (node: HTMLElement | null) => void;
    setTopBufferRootRef: (node: HTMLElement | null) => void;
    setBottomBufferRootRef: (node: HTMLElement | null) => void;
    setInputContentRef: (id: string, node: HTMLElement | null) => void;
};

export const SmoothEditContext = createContext<SmoothEditContext>({
    editMode: false,
    activateEditMode: (id?: string) => {},
    deactivateEditMode: () => {},
    setNavBarRootRef: (node: HTMLElement | null) => {},
    setScrollAreaRootRef: (node: HTMLElement | null) => {},
    setTopBufferRootRef: (node: HTMLElement | null) => {},
    setBottomBufferRootRef: (node: HTMLElement | null) => {},
    setInputContentRef: (id: string, node: HTMLElement | null) => {},
});
