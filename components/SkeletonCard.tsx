import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="relative w-full h-full max-w-sm rounded-[36px] overflow-hidden bg-dark-800 border border-white/10 animate-pulse">
    <div className="w-full h-full bg-gradient-to-b from-dark-700 to-dark-800" />
    <div className="absolute bottom-0 w-full p-6 pb-28">
      <div className="h-4 bg-dark-700 rounded w-20 mb-3" />
      <div className="h-8 bg-dark-700 rounded w-48 mb-2" />
      <div className="h-4 bg-dark-700 rounded w-32" />
    </div>
  </div>
);

export const SkeletonMessage: React.FC = () => (
  <div className="flex gap-2 animate-pulse">
    <div className="w-8 h-8 rounded-full bg-dark-700" />
    <div className="h-12 bg-dark-700 rounded-2xl w-48" />
  </div>
);
