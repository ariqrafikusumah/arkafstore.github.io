import React from 'react'
import Logo from '../assets/img/logo-web.png'
import { Nav, Navbar, Offcanvas, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarTop() {
  return (
    <>
      <div>
        {[false].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className=" border-gray-200 shadow-lg xl:px-52 lg:px-32">
            <Container fluid>
              <Navbar.Brand><Link to="/"><img src={Logo} className="h-9 mr-3 sm:h-9" alt="logo" /></Link></Navbar.Brand>
              {/* <marquee className="xl:w-auto lg:w-auto md:w-auto sm:w-32 xs:w-32 xss:w-32 font-mono text-xl drop-shadow-xl bg-indigo-300 rounded-lg">Nikmati Bonus Diamonds Dan lain lain</marquee> */}
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton="text-black">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <img src={Logo} className="h-9 mr-3 sm:h-9" alt="logo" />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/Tentang">Tentang</Nav.Link>
                    <Nav.Link href="/PrivacyPolicy">Privacy Policy</Nav.Link>
                    <Nav.Link href="/Terms">Terms &amp; Condition</Nav.Link>
                    {/* <Nav.Link to="/auth/Sign-in">Login</Nav.Link> */}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </>
  )
}

export default NavbarTop