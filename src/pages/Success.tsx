import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-linear-to-r from-sky-200 via-sky-50 to-sky-200">
      <div className="flex flex-col items-center text-center bg-white/50 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Payment Successful
        </h1>


        <div className="relative mb-8 md:mb-10 animate-bounce-slow">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-green-100 flex items-center justify-center">
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
              <Check className="h-7 w-7 md:h-8 md:w-8 text-white stroke-3" />
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => navigate("/ticket")}
            className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-base md:text-lg font-semibold text-white duration-200 ease-in hover:bg-sky-600 transition-all hover:scale-105 cursor-pointer shadow-md shadow-sky-100"
          >
            View Ticket
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-6 py-3 text-base md:text-lg font-medium text-gray-700 cursor-pointer duration-200 ease-in hover:bg-gray-50 hover:scale-105 transition-all"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
