import { useCallback, useState } from "react";

export function useEditMode(
    fixateInputContent: (id: string) => void,
    resetScrollAreaBuffers: () => void
) {
    const [editMode, setEditMode] = useState(false);
    const [editTrigger, setEditTrigger] = useState<string | null>(null);

    const activateEditMode = useCallback(
        (id?: string) => {
            if (!editMode) {
                if (id) {
                    fixateInputContent(id);
                }
                setEditMode(true);
                setEditTrigger(id || null);
            }
        },
        [editMode, fixateInputContent]
    );

    const deactivateEditMode = useCallback(() => {
        resetScrollAreaBuffers();
        setEditMode(false);
    }, [resetScrollAreaBuffers]);

    return {
        editMode,
        editTrigger,
        activateEditMode,
        deactivateEditMode,
    };
}
