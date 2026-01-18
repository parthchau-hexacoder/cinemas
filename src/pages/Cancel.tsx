import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-linear-to-r from-red-50 via-white to-red-50">
      <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Payment Cancelled
        </h1>


        <div className="relative mb-8 md:mb-10">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-red-100 flex items-center justify-center">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-200">
              <X className="h-7 w-7 md:h-8 md:w-8 text-white stroke-3" />
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => navigate("/")}
            className="w-full rounded-2xl bg-red-500 px-6 py-3 text-base md:text-lg font-semibold text-white transition-all duration-200 hover:scale-105 ease-in hover:bg-red-600 cursor-pointer shadow-md shadow-red-100"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-base md:text-lg font-medium text-gray-700 transition-all duration-200 hover:scale-105 ease-in hover:bg-gray-50 cursor-pointer"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
