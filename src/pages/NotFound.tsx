import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <div className="relative group p-10 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/40">
                <h1 className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-sky-600 via-indigo-600 to-sky-600 animate-pulse">
                    404
                </h1>

                <div className="bg-[#003B5C] px-3 py-1 text-sm rounded-md rotate-12 absolute top-[40%] left-[35%] text-white font-medium shadow-lg">
                    Page Not Found
                </div>

                <div className="mt-8 space-y-4">
                    <p className="text-xl text-gray-700 font-medium">
                        Oops! The page you're looking for has gone to the movies. 
                    </p>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Maybe it's watching a blockbuster or grabbing some popcorn.
                        Let's get you back to the lobby!
                    </p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="mt-10 group relative inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:bg-[#002B4C] hover:scale-105 active:scale-95 shadow-xl hover:shadow-sky-500/25 cursor-pointer"
                >
                    <Home className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                    Back to Home
                    <div className="absolute inset-0 rounded-full" />
                </button>
            </div>


            <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl -z-10 animate-blob" />
            <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />
        </div>
    );
};

export default NotFound;
