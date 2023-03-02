import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Form, FormControl, FormLabel } from "react-bootstrap";
import { BuildingLibraryIcon, Cog6ToothIcon, QrCodeIcon, TagIcon, WalletIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faUserCircle} from "@fortawesome/free-solid-svg-icons";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Login berhasil!');
                // Redirect ke halaman setelah login berhasil
                window.location.href = '/admin/dashboard-admin'; // redirect ke halaman dashboard
            })
            .catch((error) => {
                console.log('Login gagal:', error);
            });
    };
    return (
        <>
            <div>
                <div className="xl:px-52 lg:px-52 md:px-32 sm:px-2">
                    <div className="rounded-xl border border-gray-200 mt-3 p-3 bg-gradient-r shdaow-lg">
                        <div className="text-2xl font-bold text-indigo-500 mb-3 text-center">
                            FORM LOGIN
                        </div>
                        <div className="text-center">
                            <FontAwesomeIcon size="4x" icon={(faUserCircle)} className="text-indigo-500" />
                        </div>
                        <Form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <FormControl className="w-full" id="email" placeholder="email" name="email" type="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className="mb-3">
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <FormControl className="w-full" id="password" placeholder="password" name="password" type="password" value={password} onChange={handlePasswordChange} />
                            </div>
                            <div className="mb-3 text-blue no-underline">Forgot your password ?</div>
                            <button className="p-2 px-4 border rounded-lg " type="submit">Log-in</button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login