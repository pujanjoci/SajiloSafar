import React from 'react';

const StatusBadge = ({ status, type = 'default' }) => {
    const styles = {
        success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border-amber-100',
        error: 'bg-red-50 text-red-700 border-red-100',
        info: 'bg-blue-50 text-blue-700 border-blue-100',
        default: 'bg-gray-50 text-gray-700 border-gray-100'
    };

    let styleKey = 'default';

    const lowerStatus = String(status).toLowerCase();

    if (['active', 'confirmed', 'completed', 'paid'].includes(lowerStatus)) styleKey = 'success';
    else if (['pending', 'maintenance', 'delayed'].includes(lowerStatus)) styleKey = 'warning';
    else if (['cancelled', 'inactive', 'blocked'].includes(lowerStatus)) styleKey = 'error';
    else if (['processing', 'ongoing'].includes(lowerStatus)) styleKey = 'info';

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[styleKey] || styles.default}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
