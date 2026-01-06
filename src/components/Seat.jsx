import React from 'react';
import { Check, X, Sofa, Crown } from 'lucide-react';

const Seat = ({ seatNumber, status, isSelected, onClick, type = 'standard' }) => {
    const getSeatState = () => {
        if (status === 'booked') {
            return {
                bg: 'bg-gray-50',
                border: 'border-2 border-gray-200',
                text: 'text-gray-400',
                cursor: 'cursor-not-allowed',
                hover: '',
                icon: <X className="w-3 h-3 text-gray-400" />,
                indicator: 'bg-gray-300'
            };
        }

        if (isSelected) {
            return {
                bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
                border: 'border-2 border-blue-500',
                text: 'text-white',
                cursor: 'cursor-pointer',
                hover: 'hover:shadow-lg hover:shadow-blue-100',
                icon: <Check className="w-3 h-3 text-white" />,
                indicator: 'bg-white'
            };
        }

        return {
            bg: 'bg-white',
            border: 'border-2 border-gray-300',
            text: 'text-gray-800',
            cursor: 'cursor-pointer',
            hover: 'hover:border-blue-400 hover:shadow-md hover:shadow-blue-100',
            icon: null,
            indicator: 'bg-blue-400'
        };
    };

    const getSeatTypeStyle = () => {
        switch (type) {
            case 'premium':
                return 'border-amber-400 bg-gradient-to-b from-amber-50 to-white';
            case 'sofa':
                return 'border-emerald-400 bg-gradient-to-b from-emerald-50 to-white';
            case 'window':
                return 'window-seat-style';
            case 'left-window':
                return 'border-l-4 border-l-blue-400';
            case 'right-window':
                return 'border-r-4 border-r-blue-400';
            case 'aisle':
                return '';
            default:
                return '';
        }
    };

    const seatState = getSeatState();
    const typeStyle = getSeatTypeStyle();

    return (
        <button
            onClick={() => status !== 'booked' && onClick(seatNumber)}
            disabled={status === 'booked'}
            className={`
        relative w-14 h-14 m-1 rounded-lg flex flex-col items-center justify-center 
        transition-all duration-200 ease-out
        ${seatState.bg} ${seatState.border} ${seatState.text} ${seatState.cursor} ${seatState.hover}
        ${typeStyle}
        ${!isSelected && status !== 'booked' ? 'hover:scale-[1.02]' : ''}
        active:scale-95
        shadow-sm
      `}
            aria-label={`Seat ${seatNumber} - ${type !== 'standard' ? type : ''} - ${status === 'booked' ? 'Booked' : isSelected ? 'Selected' : 'Available'}`}
        >
            {/* Seat Type Icon */}
            {type === 'premium' && (
                <Crown className="absolute -top-2 -right-2 w-4 h-4 text-amber-500" />
            )}
            {type === 'sofa' && (
                <Sofa className="absolute -top-2 -right-2 w-4 h-4 text-emerald-500" />
            )}

            {/* Seat Number */}
            <span className="text-sm font-semibold tracking-tight">
                {seatNumber}
            </span>

            {/* Status Indicator */}
            <div className="mt-1">
                <div className={`w-2 h-2 rounded-full ${seatState.indicator}`} />
            </div>

            {/* Status Icon */}
            {seatState.icon && (
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border">
                    {seatState.icon}
                </div>
            )}
        </button>
    );
};

// Enhanced Legend Component
export const SeatLegend = ({ className = '', busType = 'standard' }) => {
    const legends = [
        {
            color: 'bg-white border-gray-300',
            text: 'Available',
            dotColor: 'bg-blue-400'
        },
        {
            color: 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500',
            text: 'Selected',
            dotColor: 'bg-white'
        },
        {
            color: 'bg-gray-50 border-gray-200',
            text: 'Booked',
            dotColor: 'bg-gray-300'
        },
        {
            color: 'bg-gradient-to-b from-amber-50 to-white border-amber-400',
            text: 'Premium Seat',
            icon: <Crown className="w-3 h-3 text-amber-500" />
        }
    ];

    // Add sofa seat legend only for bus types that have them
    if (busType.toLowerCase().includes('sofa') || busType.toLowerCase().includes('luxury sofa')) {
        legends.push({
            color: 'bg-gradient-to-b from-emerald-50 to-white border-emerald-400',
            text: 'Sofa Seat',
            icon: <Sofa className="w-3 h-3 text-emerald-500" />
        });
    }

    return (
        <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(legends.length, 5)} gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm ${className}`}>
            {legends.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                    <div className={`relative w-8 h-8 rounded-lg border ${item.color}`}>
                        {item.dotColor && (
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${item.dotColor}`} />
                        )}
                        {item.icon && (
                            <div className="absolute -top-1 -right-1">
                                {item.icon}
                            </div>
                        )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
            ))}
        </div>
    );
};

export default Seat;