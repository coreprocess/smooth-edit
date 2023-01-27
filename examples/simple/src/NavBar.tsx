import React, { useCallback } from "react";
import { wrapSmoothEditNavBar } from "smooth-edit";

export const NavBar = wrapSmoothEditNavBar(function NavBar({
    editMode,
    deactivateEditMode,
    rootRef,
}) {
    const onClick = useCallback(() => {
        deactivateEditMode();
    }, [deactivateEditMode]);

    return (
        <div
            ref={rootRef}
            style={{
                backgroundColor: !editMode ? "green" : "red",
                height: !editMode ? "80px" : "60px",
                transition: "height 1s",
                flexGrow: 0,
                flexShrink: 0,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
            }}
            onClick={onClick}
        >
            {!editMode ? "View Mode" : "Edit Mode"}
        </div>
    );
},
{});
