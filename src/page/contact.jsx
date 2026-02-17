import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Get in Touch</h1>
                <p className="text-gray-600 text-lg italic">We'd love to hear about your next AI project.</p>
            </div>

            <div className="w-full bg-white rounded-[2rem] shadow-2xl p-10 md:p-16 border border-gray-100 flex flex-col md:flex-row gap-16">
                <div className="w-full md:w-1/2 space-y-8">
                    <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
                    <p className="text-gray-600">
                        Have questions about our AI project generator or need assistance? Our team is here to help you build your future.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-700 font-medium">
                            <span className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">📍</span>
                            Mumbai, India
                        </div>
                        <div className="flex items-center gap-4 text-gray-700 font-medium">
                            <span className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">✉️</span>
                            hello@geminiaiapp.com
                        </div>
                    </div>
                </div>

                <form className="w-full md:w-1/2 space-y-6">
                    <div>
                        <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" type="text" placeholder="Your Name" required />
                    </div>
                    <div>
                        <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" type="email" placeholder="Email Address" required />
                    </div>
                    <div>
                        <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none h-32 resize-none" placeholder="How can we help?" required></textarea>
                    </div>
                    <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-[0.98]" type="submit">
                        Send Message
                    </button>
                    <div className="text-center mt-4">
                        <Link to="/" className="text-indigo-600 text-sm font-semibold hover:underline decoration-2 underline-offset-4">← Back to home</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
