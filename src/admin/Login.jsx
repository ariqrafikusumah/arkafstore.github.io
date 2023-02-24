import React, { useState } from "react";
import { db } from "../database/firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await db.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <>
            <form onSubmit={handleLogin}>
                {error && <div>{error}</div>}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login