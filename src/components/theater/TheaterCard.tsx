import { MoveRight } from "lucide-react";
import type { Theater } from "../../types";

interface TheaterCardProps {
    theater: Theater;
    onClick: () => void;
}

export default function TheaterCard({ theater, onClick }: TheaterCardProps) {
    return (
        <div
            onClick={onClick}
            className="
              w-full rounded-2xl border border-gray-300 bg-linear-to-r from-white to-sky-100 px-6 py-5
              flex items-center justify-between
              cursor-pointer m-4
              transition-all duration-150 ease-in hover:-translate-y-1
              hover:shadow-md
            "
        >
            <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {theater.name}
                </h2>

                <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <span>{theater.location}</span>
                </div>
            </div>

            <div>
                <MoveRight />
            </div>
        </div>
    );
}
