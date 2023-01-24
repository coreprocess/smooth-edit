import { createContext } from "react";
import {
    SmoothEditInputConfig,
    SmoothEditNavBarConfig,
    SmoothEditScrollAreaConfig,
} from "./config";

type SmoothEditContext = {
    editMode: boolean;
    activateEditMode: (id?: string) => void;
    deactivateEditMode: () => void;
    setNavBarRootRef: (node: HTMLElement | null) => void;
    setScrollAreaRootRef: (node: HTMLElement | null) => void;
    setTopBufferRootRef: (node: HTMLElement | null) => void;
    setBottomBufferRootRef: (node: HTMLElement | null) => void;
    setInputRootRef: (id: string, node: HTMLElement | null) => void;
    setInputContentRef: (id: string, node: HTMLElement | null) => void;
    setNavBarConfig: (config: SmoothEditNavBarConfig) => void;
    setScrollAreaConfig: (config: SmoothEditScrollAreaConfig) => void;
    setInputConfig: (id: string, config: SmoothEditInputConfig) => void;
};

export const SmoothEditContext = createContext<SmoothEditContext>({
    editMode: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    activateEditMode: (id?: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    deactivateEditMode: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setNavBarRootRef: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setScrollAreaRootRef: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setTopBufferRootRef: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setBottomBufferRootRef: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setInputRootRef: (id: string, node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setInputContentRef: (id: string, node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setNavBarConfig: (config: SmoothEditNavBarConfig) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setScrollAreaConfig: (config: SmoothEditScrollAreaConfig) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setInputConfig: (id: string, config: SmoothEditInputConfig) => {},
});
