import React from 'react';

interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    const getScoreStyle = (score: number) => {
        if (score >= 80) return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
        if (score >= 60) return 'bg-blue-50 text-blue-700 ring-blue-600/20';
        if (score >= 40) return 'bg-amber-50 text-amber-700 ring-amber-600/20';
        return 'bg-red-50 text-red-700 ring-red-600/20';
    };

    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getScoreStyle(score)}`}>
            {score}
        </span>
    );
};

export default ScoreBadge;