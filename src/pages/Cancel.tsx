import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center text-center">

        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Payment Cancelled
        </h1>


        <div className="relative mb-10">
          <div className="h-24 w-24 rounded-full bg-red-200 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center">
              <X className="h-8 w-8 text-white stroke-3" />
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 w-64">
          <button
            onClick={() => navigate("/")}
            className="w-full rounded-md border border-red-400 px-4 py-2 text-md font-medium text-red-600 transition-all duration-200 hover:scale-105 ease-in hover:bg-red-600 hover:text-white cursor-pointer"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-md font-medium text-gray-600transition-all duration-200 hover:scale-105 ease-in hover:bg-white cursor-pointer"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
