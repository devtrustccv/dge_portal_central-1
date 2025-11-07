import React from 'react';

interface StatusBadgeProps {
    status: string;
    statusCode: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, statusCode }) => {
    const getStatusStyle = (code: string) => {
        switch (code) {
            case 'APPROVED':
                return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
            case 'PENDING':
                return 'bg-amber-50 text-amber-700 ring-amber-600/20';
            case 'REJECTED':
                return 'bg-red-50 text-red-700 ring-red-600/20';
            case 'ARCHIVED':
                return 'bg-gray-50 text-gray-700 ring-gray-600/20';
            default:
                return 'bg-blue-50 text-blue-700 ring-blue-600/20';
        }
    };

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyle(statusCode)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;