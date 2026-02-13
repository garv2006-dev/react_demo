import React from 'react'
import { Link } from 'react-router-dom'
import home from '../page/home'
import about from '../page/about'
import contact from '../page/contact'


export default function Header() {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </div>
    )
}   