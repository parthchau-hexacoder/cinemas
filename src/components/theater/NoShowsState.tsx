import { Film } from "lucide-react";

interface NoShowsStateProps {
    date: string | null;
}

export default function NoShowsState({ date }: NoShowsStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-20 text-center shadow-sm">
            <div className="rounded-full bg-gray-50 p-6">
                <Film className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No shows available</h3>
            <p className="mt-1 text-gray-500">There are no movie screenings scheduled for {date}.</p>
        </div>
    );
}
