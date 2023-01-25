const PREFIX = "smooth edit: ";

let debugMode = false;

export function setSmoothEditDebugMode(activated: boolean) {
    debugMode = activated;
}

export function logDebug(message: string) {
    if (debugMode) {
        console.log(PREFIX + message);
    }
}

export function logError(message: string) {
    console.error(PREFIX + message);
}

export function logWarn(message: string) {
    console.warn(PREFIX + message);
}
