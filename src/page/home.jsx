import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-4 animate-bounce">
                        ✨ New: Modern React
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
                        <span className="block text-gray-900">Build Your Next</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-300% animate-gradient">
                            React Application
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Master the art of building scalable applications with React.
                        Explore our comprehensive demo and start your journey in modern web development.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 pt-6">
                        <Link to="/register" className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all">
                            Get Started
                        </Link>
                        <Link to="/demo" className="px-10 py-4 bg-white text-gray-900 font-bold rounded-2xl shadow-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all">
                            Live Demo
                        </Link>
                    </div>
                </div>

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { title: "React Core", desc: "Leverage the latest React features like Hooks, Context, and more for robust apps.", icon: "⚛️" },
                        { title: "Responsive UI", desc: "Perfectly crafted designs that look stunning on every screen size and device.", icon: "�" },
                        { title: "Clean Code", desc: "Follow industry best practices for maintainable and scalable frontend architecture.", icon: "�️" }
                    ].map((feature, i) => (
                        <div key={i} className="group bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 transform hover:-translate-y-3">
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}   