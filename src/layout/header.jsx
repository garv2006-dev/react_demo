import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Logo from '../components/Logo'

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Contact</Link>
                        <Link to="/demo" className="text-gray-600 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors">Demo</Link>
                    </div>
                    <div className="flex items-center">
                        {token ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all shadow-md hover:shadow-red-200"
                            >
                                Log Out
                            </button>
                        ) : (
                            <Link to="/login" className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200">
                                Log In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}