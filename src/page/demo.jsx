import React from 'react'
import { Link } from 'react-router-dom'

export default function Demo() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Platform Demo</h1>
                <p className="text-lg text-gray-600">See what's possible with our AI-driven tools.</p>
                <Link to="/" className="inline-block mt-6 text-indigo-600 font-bold hover:underline">
                    ← Back to Home
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-12">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-full md:w-1/2 space-y-6 text-left">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">⚡</div>
                            <h2 className="text-3xl font-bold text-gray-900">Experience Real-Time AI</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Our demo showcases the speed and accuracy of Google Gemini 1.5 Pro.
                                Watch as complex project ideas are transformed into actionable plans instantly.
                            </p>
                            <Link to="/login" className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
                                Try it Yourself
                            </Link>
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-50 rounded-3xl p-8 border border-gray-200 min-h-[300px] flex items-center justify-center">
                            <div className="space-y-4 w-full">
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                                <div className="mt-8 flex justify-center">
                                    <span className="text-indigo-600 font-bold animate-pulse">Analyzing...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
