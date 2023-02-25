import React, { useState } from "react";
import { db } from "../database/firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

// Fungsi untuk melakukan sign in
async function signIn(email, password) {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        set(ref(db, `users/${user.uid}`), {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            lastLogin: new Date().toISOString(),
        });
    } catch (error) {
        console.error(error);
    }
}
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        signIn(email, password);
        console.log(signIn);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

export default Login