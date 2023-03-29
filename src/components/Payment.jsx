import React, { useState, useEffect } from 'react'
import { BuildingLibraryIcon, QrCodeIcon, WalletIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'react-bootstrap';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { db } from '../database/firebase';
import { ref, get } from "firebase/database";

function Payment() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [dataPaymentQris, setDataPaymentQris] = useState([]);
    const [dataPaymentBank, setDataPaymentBank] = useState([]);
    const [dataPaymentWallet, setDataPaymentWallet] = useState([]);

    useEffect(() => {
        const qrisRef = ref(db, '/payment-qris');
        const bankRef = ref(db, '/payment-bank');
        const walletRef = ref(db, '/payment-wallet');

        Promise.all([get(qrisRef), get(bankRef), get(walletRef)])
            .then(([qrisSnapshot, bankSnapshot, walletSnapshot]) => {
                if (qrisSnapshot.exists() && bankSnapshot.exists() && walletSnapshot.exists()) {
                    const qrisData = qrisSnapshot.val();
                    const bankData = bankSnapshot.val();
                    const walletData = walletSnapshot.val();

                    setDataPaymentQris(Object.values(qrisData));
                    setDataPaymentBank(Object.values(bankData));
                    setDataPaymentWallet(Object.values(walletData));
                } else {
                    setIsError(true);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (isLoading) return (
        <div className="text-center mt-5">
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
            <Spinner animation="grow" variant="" className='bg-indigo-500' />
        </div>
    );
    else if (dataPaymentBank && dataPaymentQris && dataPaymentWallet && !isError)
        return (
            <>
                <div className='shadow-xl'>
                    <Accordion className='border-2 mb-3' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <div className='w-full'>
                                <Typography className='flex font-bold' sx={{ width: '100%', flexShrink: 0 }}>
                                    <QrCodeIcon className='w-5' />&nbsp;QRIS
                                </Typography>
                                <hr className='py-2' />
                                <Typography sx={{ color: 'text.secondary' }}> <img className='w-12' src="https://seeklogo.com/images/Q/quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png" alt="" /> </Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className='bg-gray-200'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentQris.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.qris_name} name='payment' value={item.qris_img} required />
                                        <label htmlFor={item.qris_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12 h-3' src={item.picture} alt={item.qr_qris} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.qris_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='border-2 mb-3' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <div className='w-full'>
                                <Typography className='flex font-bold' sx={{ width: '100%', flexShrink: 0 }}>
                                    <BuildingLibraryIcon className='w-5' />&nbsp;Bank Transfer
                                </Typography>
                                <hr className='py-2' />
                                <div className='flex gap-2'>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://i.pinimg.com/564x/58/5f/e2/585fe239050c065d22d16b1fc41d197e.jpg" alt="" />
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://i.pinimg.com/564x/c2/0c/ed/c20ced99c134399f7d61a6540af4b2ad.jpg" alt="" />
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtYt4l-prxI6r5xL2kB7Xbdj1NuMdgnwITbTYp0De_H29sxSzPJ4r6VsCLMqrFWNuxnpbp2a-sSyTCpqeNfTEqtLpMpkq0iJyFWRNwJx9FD1jb26noe4yHkl8TDz-Yj0HAiR2-8FUT9Cz3QTtjdiN7pkXhxYNDWTpaz3BJiMRBRxwvCl1Yc1na7p2mrQ/s16000/seabank.png" alt="" />
                                    </Typography>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className='bg-gray-200'>
                            <Typography>
                                <div className='grid grid-cols-2 gap-2'>
                                    {dataPaymentBank.map((item) => (
                                        <div key={item}>
                                            <input type="radio" className='hidden peer' id={item.bank_name} name='payment' value={item.number_account} required />
                                            <label htmlFor={item.bank_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                                <div className='grid grid-rows-1'>
                                                    <div className='w-full text-sm font-semibold'>
                                                        <img className='w-12 h-3' src={item.picture} alt={item.bank_name} />
                                                    </div>
                                                    <hr className='my-1' />
                                                    <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='border-2 mb-3' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <div className='w-full'>
                                <Typography className='flex font-bold' sx={{ width: '100%', flexShrink: 0 }}>
                                    <WalletIcon className='w-5' />&nbsp;E-Wallet
                                </Typography>
                                <hr className='py-2' />
                                <div className='flex gap-2'>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://cdn1.codashop.com/S/content/common/images/mno/DANA_CHNL_LOGO.png" alt="" />
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/768px-Logo_ovo_purple.svg.png" alt="" />
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://cdn1.codashop.com/S/content/common/images/mno/GO_PAY_CHNL_LOGO.png" alt="" />
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-12' src="https://cdn1.codashop.com/S/content/common/images/mno/SHOPEE_PAY_CHNL_LOGO.png" alt="" />
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        <img className='w-4' src="https://cdn1.codashop.com/S/content/common/images/mno/LINKAJA_ID_CHNL_LOGO.png" alt="" />
                                    </Typography>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className='bg-gray-200'>
                            <Typography>
                                <div className='grid grid-cols-2 gap-2'>
                                    {dataPaymentWallet.map((item) => (
                                        <div key={item}>
                                            <input type="radio" className='hidden peer' id={item.wallet_name} name='payment' value={item.number_account} required />
                                            <label htmlFor={item.wallet_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                                <div className='grid grid-rows-1'>
                                                    <div className='w-full text-sm font-semibold'>
                                                        <img className='w-12 h-3' src={item.picture} alt={item.wallet_name} />
                                                    </div>
                                                    <hr className='my-1' />
                                                    <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </>
        );
    else {
        return (
            <>
                <Accordion>
                    <Accordion.Item className='mt-3' eventKey='0'>
                        <Accordion.Header className='text-gray-500 font-bold'>
                            <QrCodeIcon className='w-5' />&nbsp;QRIS
                        </Accordion.Header>
                        <Accordion.Body className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentQris.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.qris_name} name='payment' value={item.qris_img} required />
                                        <label htmlFor={item.qris_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12 ' src={item.picture} alt={item.qr_qris} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.qris_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mt-3 border' eventKey='2'>
                        <Accordion.Header className='text-gray-500 font-bold'>
                            <BuildingLibraryIcon className='w-5' />&nbsp;Bank Transfer
                        </Accordion.Header>
                        <Accordion.Body className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentBank.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.bank_name} name='payment' value={item.number_account} required />
                                        <label htmlFor={item.bank_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12' src={item.picture} alt={item.bank_name} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className='mt-3 border' eventKey='3'>
                        <Accordion.Header className='text-gray-500 font-bold'>
                            <WalletIcon className='w-5' />&nbsp;E-Wallet
                        </Accordion.Header>
                        <Accordion.Body className='bg-gray-100'>
                            <div className='grid grid-cols-2 gap-2'>
                                {dataPaymentWallet.map((item) => (
                                    <div key={item}>
                                        <input type="radio" className='hidden peer' id={item.wallet_name} name='payment' value={item.number_account} required />
                                        <label htmlFor={item.wallet_name} className='inline-flex items-center justify-between w-full p-3 rounded-xl cursor-pointer border bg-white text-gray-500 peer-checked:ring-indigo-500 peer-checked:ring-2 peer-checked:text-indigo-500 peer-checked:bg-indigo-600'>
                                            <div className='grid grid-rows-1'>
                                                <div className='w-full text-sm font-semibold'>
                                                    <img className='w-12' src={item.picture} alt={item.wallet_name} />
                                                </div>
                                                <hr className='my-1' />
                                                <div className='w-full text-sm font-semibold'>{item.first_name} {item.last_name}</div>
                                            </div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
        )
    }
}

export default Payment