import type { Show } from '../types';

export const getAvailableDates = (shows: Show[]): Date[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const map = new Map<string, Date>();
    shows.forEach((show) => {
        const d = new Date(show.startTime);
        const dateToCheck = new Date(d);
        dateToCheck.setHours(0, 0, 0, 0);

        if (d.getTime() >= new Date().getTime()) {
            const key = d.toDateString();
            if (!map.has(key)) map.set(key, d);
        }
    });

    return Array.from(map.values()).sort((a, b) => a.getTime() - b.getTime());
};

export const formatDateBox = (date: Date) => ({
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    key: date.toDateString(),
});

export const isSameDay = (iso: string, dateKey: string) =>
    new Date(iso).toDateString() === dateKey;

export const formatTime = (time: string) =>
    new Date(time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
