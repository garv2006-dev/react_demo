import React from 'react'
import { useState } from 'react'

export default function Demo() {
    const [login, setLogin] = useState(true)

    return (
        <div>
            <h1>{login ? "welcome to our website" : "Please login"}</h1>
            <button onClick={() => setLogin(!login)}>{login ? "Logout" : "Login"}</button>
        </div>
    )
}   