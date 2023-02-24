import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import PopUp from '../components/PupUp'
import { db } from '../database/firebase'
import { uid } from 'uid'


function Beranda() {
  // ** Write

  // ** Read
  // const writeToDatabase = () = > {

  // }

  // ** Delete

  // ** Update

  // ** PopUp
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('popupDisplayed', 'true');
    console.log(localStorage);
  };
  useEffect(() => {
    const popupDisplayed = localStorage.getItem('popupDisplayed');
    if (!popupDisplayed) {
      setIsOpen(true);
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PopUp isOpen={isOpen} onClose={handleClose} />
      <div className='xl:px-52 lg:px-32 md:px-5 xs:px-5'>
        <div>
          <Carousel />
        </div>
        <div>
          <div className='mt-5 mb-5'>
            <span className='text-2xl font-bold '>GAME TOP UP</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Beranda