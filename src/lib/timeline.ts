export type InteractionType = "Call" | "Text" | "Video";

export interface TimelineEntry {
    id: string;
    type: InteractionType;
    title: string;
    contact: string;
    date: string;
}

const storageKey = "keenkeeper-timeline";

function safeParse(value: string | null) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function getTimelineEntries(): TimelineEntry[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(storageKey);
    return safeParse(raw);
}

export function addTimelineEntry(entry: Omit<TimelineEntry, "id">): TimelineEntry {
    const previous = getTimelineEntries();
    const newEntry: TimelineEntry = {
        id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${entry.type}`,
        ...entry,
    };
    const nextEntries = [newEntry, ...previous];
    window.localStorage.setItem(storageKey, JSON.stringify(nextEntries));
    return newEntry;
}
