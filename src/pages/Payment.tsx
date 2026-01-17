import { useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Payment = () => {

  const location = useLocation();

  const { payload, amount } = location.state as {
    payload: {
      showtimeId: string;
      seatData: {
        seats: {
          row: string;
          column: number;
          layoutType: string;
        }[];
      };
    };
    amount: number;
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      toast.loading("Initiating payment...", { id: "payment" });

      const res = await axios.post(
        '/api/orders',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const { paymentUrl, orderId } = res.data;

      console.log(orderId)


      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      toast.success("Redirecting to payment gateway...", { id: "payment" });

    } catch (err: any) {
      console.error('Order failed:', err.response?.data || err);
      toast.error('Order failed. Please try again.', { id: "payment" });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment
        </h1>

        <p className="text-gray-500 mb-6">
          Review your payment details before confirming
        </p>

        <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-3 mb-6">
          <span className="text-gray-600 font-medium">Total Amount</span>
          <span className="text-xl font-bold text-gray-800">
            ₹{amount}
          </span>
        </div>

        <button
          onClick={placeOrder}
          className="w-full rounded-xl bg-sky-500 px-6 py-3 text-white font-semibold transition-all cursor-pointer
                        hover:bg-sky-600 active:scale-[0.98] focus:outline-none focus:ring-2
                        focus:ring-sky-400 focus:ring-offset-2"
        >
          Confirm & Pay
        </button>

        <p className="mt-4 text-center text-xs text-gray-400">
          Secure payment • No extra charges
        </p>
      </div>
    </div>

  );
};

export default Payment;
