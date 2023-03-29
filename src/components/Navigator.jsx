import React from 'react'
import { Link } from 'react-router-dom';
import { FaBarcode, FaGamepad, FaLightbulb, FaSignal } from 'react-icons/fa';

function Navigator() {
    return (
        <>
            <div>
                <div className='border bg-gray-100 rounded-sm p-3 grid grid-cols-4 text-center gap-5 text-sm font-semibold text-gray-500 '>
                    <Link className="" to="/">
                        <div className='cursor-pointer hover:text-indigo-500 hover:border-b-indigo-500 hover:border-b-4 duration-200 active:text-indigo-500'>
                            <div className='grid place-items-center sm:text-2xl'><FaGamepad /></div>
                            <div> Game</div>
                        </div>
                    </Link>
                    <Link className="" to="/voucher">
                        <div className='cursor-pointer hover:text-indigo-500 hover:border-b-indigo-500 hover:border-b-4 duration-200'>
                            <div className='grid place-items-center sm:text-2xl'><FaBarcode /></div>
                            Voucher
                        </div>
                    </Link>
                    <Link className="" to="/pulsa">
                        <div className='cursor-pointer hover:text-indigo-500 hover:border-b-indigo-500 hover:border-b-4 duration-200'>
                            <div className='grid place-items-center sm:text-2xl'><FaSignal /></div>
                            Pulsa
                        </div>
                    </Link>
                    <Link className="" to="/pln">
                        <div className='cursor-pointer hover:text-indigo-500 hover:border-b-indigo-500 hover:border-b-4 duration-200'>
                            <div className='grid place-items-center sm:text-2xl'><FaLightbulb /></div>
                            PLN
                        </div>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default Navigator