import { useCallback, useState } from "react";

export function useEditMode(monitorTransition: (id: string) => void) {
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = useCallback(
        (id?: string) => {
            if (!editMode) {
                if (id) {
                    monitorTransition(id);
                }
                setEditMode(true);
            }
        },
        [editMode, monitorTransition]
    );

    const deactivateEditMode = useCallback(() => {
        setEditMode(false);
    }, []);

    return {
        editMode,
        activateEditMode,
        deactivateEditMode,
    };
}
