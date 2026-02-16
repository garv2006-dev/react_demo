import React from 'react'
import { Link } from 'react-router-dom'

export default function home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center space-y-8">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    Home Page
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Welcome to our premium platform. Experience the power of modern design and seamless responsiveness.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link to="/login" className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
                        Get Started
                    </Link>
                    <Link to="/demo" className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow-md border border-indigo-100 hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
                        View Demo
                    </Link>
                </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Responsive", desc: "Perfectly sized for every screen, from mobile to desktop.", icon: "📱" },
                    { title: "Premium", desc: "Aesthetic designs that wow your users at first glance.", icon: "✨" },
                    { title: "Fast", desc: "Optimized for speed and smooth performance.", icon: "🚀" }
                ].map((feature, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}