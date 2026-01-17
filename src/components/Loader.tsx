import { LucideLoader2 } from "lucide-react";

interface LoaderProps {
    fullScreen?: boolean;
    text?: string;
    size?: number;
}

const Loader = ({ fullScreen = false, text = "Loading...", size = 48 }: LoaderProps) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-all duration-300">
                <div className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-2xl border border-sky-100 animate-in fade-in zoom-in duration-300">
                    <LucideLoader2
                        size={size}
                        className="text-sky-500 animate-spin mb-4"
                        strokeWidth={2.5}
                    />
                    <p className="text-gray-600 font-semibold text-lg animate-pulse">{text}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]">
            <LucideLoader2
                size={size}
                className="text-sky-500 animate-spin mb-3"
                strokeWidth={2.5}
            />
            {text && <p className="text-gray-500 font-medium text-sm">{text}</p>}
        </div>
    );
};

export default Loader;
