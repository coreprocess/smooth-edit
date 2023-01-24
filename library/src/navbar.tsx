import React, { ComponentType, useContext } from "react";
import { SmoothEditContext } from "./context";

export function makeSmoothEditNavBar<Props>(Component: ComponentType<Props>) {
  // higher order component that wraps the inner component
  return function SmoothEditNavBar(props: Props) {
    // get the context
    const { editMode, activateEditMode, deactivateEditMode, setNavBarRef } =
      useContext(SmoothEditContext);

    // render the navbar
    return (
      <Component
        ref={setNavBarRef}
        editMode={editMode}
        activateEditMode={activateEditMode}
        deactivateEditMode={deactivateEditMode}
        {...props}
      />
    );
  };
}
