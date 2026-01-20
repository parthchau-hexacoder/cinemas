import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SeatHeader = () => {
    const navigate = useNavigate();

    return (
        <header
            onClick={() => navigate(-1)}
            className="mb-8 md:mb-12 flex items-center gap-3 md:gap-4 cursor-pointer group">
            <ArrowLeft className="h-6 w-6 md:h-8 md:w-8 text-sky-500 transition-transform group-hover:-translate-x-1" />
            <h1 className="text-2xl md:text-4xl font-bold text-sky-500">Select Seat</h1>
        </header>
    );
};

export default SeatHeader;
