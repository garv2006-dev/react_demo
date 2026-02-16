import React from 'react'
import { Link } from 'react-router-dom'
export default function Contact() {
    return (
        <div>
            <h1>Contact</h1>
            <button><Link to="/">Back</Link></button>

            <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}   