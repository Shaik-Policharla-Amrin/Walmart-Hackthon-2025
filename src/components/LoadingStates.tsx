import React from 'react';

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-lg skeleton"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded skeleton w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded skeleton w-1/2"></div>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <div className="h-3 bg-gray-200 rounded skeleton"></div>
      <div className="h-3 bg-gray-200 rounded skeleton w-5/6"></div>
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 bg-gray-200 rounded skeleton w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded skeleton w-16"></div>
    </div>
    <div className="space-y-3">
      <div className="flex items-end space-x-2 h-32">
        {[...Array(7)].map((_, i) => (
          <div 
            key={i}
            className="bg-gray-200 rounded-t skeleton flex-1"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          ></div>
        ))}
      </div>
    </div>
  </div>
);

export const SkeletonMetric = () => (
  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
    <div className="text-center">
      <div className="w-12 h-12 bg-gray-200 rounded-lg skeleton mx-auto mb-3"></div>
      <div className="h-8 bg-gray-200 rounded skeleton w-20 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded skeleton w-24 mx-auto"></div>
    </div>
  </div>
);

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const LoadingSpinner = ({ size = 'md', color = 'text-[#0071ce]' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${color} animate-spin`}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export const PulseLoader = () => (
  <div className="flex space-x-2">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 bg-[#0071ce] rounded-full animate-pulse"
        style={{ animationDelay: `${i * 0.2}s` }}
      ></div>
    ))}
  </div>
);