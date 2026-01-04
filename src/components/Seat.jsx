import React from 'react';

const Seat = ({ seatNumber, status, isSelected, onClick }) => {
    const getSeatColor = () => {
        if (status === 'booked') return 'bg-gray-400 cursor-not-allowed';
        if (isSelected) return 'bg-green-500 text-white hover:bg-green-600';
        return 'bg-white border-2 border-gray-300 hover:border-green-500 hover:text-green-500';
    };

    return (
        <button
            onClick={() => status !== 'booked' && onClick(seatNumber)}
            disabled={status === 'booked'}
            className={`
        w-10 h-10 m-1 rounded-t-lg rounded-b-md flex items-center justify-center text-xs font-medium transition-all duration-200
        ${getSeatColor()}
      `}
            title={`Seat ${seatNumber}`}
        >
            {seatNumber}
        </button>
    );
};

export default Seat;
