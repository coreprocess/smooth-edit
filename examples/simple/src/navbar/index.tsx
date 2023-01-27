import React from "react";
import { wrapSmoothEditNavBar } from "smooth-edit";
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
            {!editMode ? <MainBar /> : <ModalBar />}
        </div>
    );
},
{});
