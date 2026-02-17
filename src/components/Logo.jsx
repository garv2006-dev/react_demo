import React from 'react';

const Logo = ({ className = "" }) => {
    return (
        <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
            <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center shadow-lg shadow-indigo-200">
                    <span className="text-white font-bold text-xl -rotate-12 group-hover:rotate-0 transition-transform duration-300">B</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full blur-sm animate-pulse"></div>
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-300% animate-gradient bg-clip-text text-transparent">
                My Brand
            </span>
        </div>
    );
};

export default Logo;
