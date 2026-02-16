import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            MyBrand
                        </Link>
                        <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                            Building modern experiences with premium designs and seamless responsiveness.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/demo" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Demo</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Features</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Contact</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <span className="text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors">
                            Twitter
                        </span>
                        <span className="text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors">
                            LinkedIn
                        </span>
                        <span className="text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors">
                            GitHub
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}