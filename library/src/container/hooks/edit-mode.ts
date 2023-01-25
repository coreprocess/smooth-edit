import { useCallback, useState } from "react";

export function useEditMode(fixateInputContent: (id: string) => void) {
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = useCallback(
        (id?: string) => {
            if (!editMode) {
                if (id) {
                    fixateInputContent(id);
                }
                setEditMode(true);
            }
        },
        [editMode, fixateInputContent]
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
