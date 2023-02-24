import React, { useEffect, useState } from 'react'
import { uid } from 'uid'
import { db } from '../../database/firebase'
import { set, ref, onValue, remove, update } from "firebase/database";
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Mobilelegends() {
    // ** Read
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                });
            }
        });
    }, []);
    return (
        <>

        </>
    )
}

export default Mobilelegends