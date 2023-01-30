import React from "react";
import { wrapSmoothEditNavBar } from "smooth-edit";
import { SmoothTransition } from "smooth-transition";
import { MainBar } from "./MainBar";
import { ModalBar } from "./ModalBar";

export const NavBar = wrapSmoothEditNavBar(function NavBar({
    editMode,
    rootRef,
}) {
    return (
        <div
            ref={rootRef}
            style={{
                flexGrow: 0,
                flexShrink: 0,
            }}
        >
            <SmoothTransition
                render={[() => <MainBar />, () => <ModalBar />]}
                active={!editMode ? 0 : 1}
                duration={1000}
            />
        </div>
    );
},
{});
