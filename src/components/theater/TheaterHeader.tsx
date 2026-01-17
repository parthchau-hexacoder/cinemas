import { ArrowLeft, MapPin } from 'lucide-react';
import type { Theater } from '../../types';

interface TheaterHeaderProps {
    theater: Theater;
    onBack: () => void;
}

export default function TheaterHeader({ theater, onBack }: TheaterHeaderProps) {
    return (
        <div className="pl-40 border-b shadow-sm">
            <div className="px-4 py-4 flex gap-4">
                <button
                    onClick={onBack}
                    className="text-gray-600 transition-colors hover:text-sky-600 cursor-pointer"
                >
                    <ArrowLeft className="h-full transition-transform group-hover:-translate-x-1" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-blue-600">{theater?.name}</h1>
                    <div className=" text-xs text-gray-500 flex gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{theater?.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
