import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full  flex items-center justify-center">
      <div className="flex flex-col items-center text-center">

        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          Payment Successful
        </h1>


        <div className="relative mb-10">
          <div className="h-24 w-24 rounded-full bg-green-200 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-8 w-8 text-white stroke-3" />
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-4 w-64">
          <button
            onClick={() => navigate("/ticket")}
            className="w-full rounded-md border border-sky-400 px-4 py-2 text-md font-medium text-sky-600 duration-200 ease-in hover:scale-105 transition-all hover:bg-blue-500 hover:text-white cursor-pointer"
          >
            View Ticket
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-md border border-zinc-300 px-4 py-2 text-md font-medium text-black cursor-pointer duration-200 ease-in hover:scale-105 hover:bg-white"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
