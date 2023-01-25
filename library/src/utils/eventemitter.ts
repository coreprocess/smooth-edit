/* eslint-disable @typescript-eslint/no-explicit-any */

export function createEventEmitter<EventType extends string>() {
    const events: Record<string, ((...args: any[]) => void)[]> = {};
    return {
        emit(event: EventType, ...args: any[]) {
            const callbacks = events[event] || [];
            for (let i = 0, length = callbacks.length; i < length; i++) {
                callbacks[i](...args);
            }
        },
        on(event: EventType, cb: (...args: any[]) => void) {
            events[event]?.push(cb) || (events[event] = [cb]);
        },
        off(event: EventType, cb: (...args: any[]) => void) {
            events[event] = events[event]?.filter((i) => cb !== i);
        },
    };
}
