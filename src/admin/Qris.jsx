import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { uid } from 'uid'
import { auth, db } from '../database/firebase'
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { FloatingLabel, Form, FormControl, Spinner, Button, Modal } from 'react-bootstrap';
import { set, ref, onValue, remove, update } from "firebase/database";
import { Login } from '../auth';

function Qris() {
  const [dataTabel, setDataTabel] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [qr_qris, setQr_Qris] = useState('');
  const [qris_name, setQris_name] = useState('');
  const [qris_img, setQris_img] = useState('');
  const [picture, setPicture] = useState('');
  const [tempUuid, setTempUuid] = useState('');

  // ** Read 
  useEffect(() => {
    onValue(ref(db, `/payment-qris`), (snapshot) => {
      let timerInterval
      Swal.fire({
        title: 'Memuat data !',
        html: 'I will close in <b></b> milliseconds.',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
      setisLoading(false);
      setDataTabel([]);
      const data = snapshot.val();
      if (data !== null) {
        setDataTabel((oldArray) => {
          const newArray = Object.values(data).sort((a, b) => a.qris_name.localeCompare(b.qris_name));
          return [...oldArray, ...newArray];
      });
      } else {
        setisError(true);
      }
    });
    console.log("Data has been Read to database");
  }, []);

  // ** Delete
  const handleDelete = (item) => {
    remove(ref(db, `/payment-qris/${item.uuid}`));
  };

  //** Update
  const handleUpdate = (item) => {
    console.log(
      'Update Button',
      'uuid :', item.uuid
    );
    setModalShow2(true, item.uuid);
    setQr_Qris(item.qr_qris);
    setQris_name(item.qris_name);
    setPicture(item.picture);
    setQris_img(item.qris_img);
    setTempUuid(item.uuid);
  };
  //** Login Session User */
  const [user, setUser] = useState(null);
  const [loginTime, setLoginTime] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('success-login')) {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Berhasil Login',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [location]);

  // ** Fungsi untuk logout */
  const handleLogout = () => {
    auth.signOut()
      .then(() => {

        console.log('Logout berhasil');
        // redirect ke halaman login
        window.location.href = '/auth/login?pesan=logout';
      })
      .catch((error) => {
        console.log('Logout gagal: ', error);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Login berhasil!');
        setUser(user);

      } else {
        console.log('Belum login');
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      // set waktu login
      setLoginTime(new Date().toLocaleString());
    }
  }, [user]);

  useEffect(() => {
    let timer = null;

    if (user) {
      // **  Set timer untuk logout setelah 30 menit */
      timer = setInterval(() => {
        handleLogout();
      }, 30 * 60 * 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [user]);

  // Render komponen Login jika user belum login
  if (!user) {
    return (
      null
    );
  }
  if (isLoading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="grow" variant="" className='bg-indigo-500' />
        <Spinner animation="grow" variant="" className='bg-indigo-500' />
        <Spinner animation="grow" variant="" className='bg-indigo-500' />
      </div>
    );
  else if (dataTabel && !isError)
    return (
      <>
        {user ? (
          <div>
            <div className="container xl:px-52 lg:px-32 md:px-5 xs:px-5 mt-5">
              <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-3" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <a href="/admin/dashboard-admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 ">
                      <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                      <a href="/admin/qris" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Payment</a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                      <a href="/admin/qris" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Qris</a>
                    </div>
                  </li>
                </ol>
              </nav>

              <div className='text-3xl font-bold mb-4 mt-10'>
                Payment QRIS
              </div>
              <div>
                <button className=" rounded-full"><PlusCircleIcon className="w-8 hover:text-indigo-500 " onClick={() => setModalShow(true)} /></button>
                <TambahData
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              <div>
                <div className="overflow-x-auto h-full max-h-[500px] overflow-y-scroll rounded-lg">
                  <table className="table-auto border-collapse">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 border">No</th>
                        <th className="py-2 px-4 border">QRIS</th>
                        <th className="py-2 px-4 border">QRIS Nama</th>
                        <th className="py-2 px-4 border">Gambar</th>
                        <th className="py-2 px-4 border">QRIS Owner</th>
                        <th className="py-2 px-4 border">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataTabel.map((item, index) => {
                        return (
                          <>
                            <tr key={item.uuid}>
                              <td className="px-6 py-4 whitespace-nowrap border">
                                <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap border">
                                <div className="text-sm font-medium text-gray-900">{item.qr_qris}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap border">
                                <div className="text-sm text-gray-500">{item.qris_name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap border">
                                <div className="text-sm px-3 text-gray-500"><img className="w-8" src={item.picture} alt={item.qris_name} /></div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap border">
                                <div className="text-sm px-3 text-gray-500"><img className="w-8" src={item.qris_img} alt={item.qris_name} /></div>
                              </td>
                              <td className="flex px-6 py-4 whitespace-nowrap border">
                                <div>
                                  <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdate(item)} >
                                    Edit
                                  </button>
                                  <EditData
                                    show={modalShow2}
                                    onHide={() => setModalShow2(false)}
                                    qr_qris={qr_qris}
                                    qris_name={qris_name}
                                    picture={picture}
                                    qris_img={qris_img}
                                    uuid={tempUuid}
                                  />
                                </div>
                                <div>
                                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDelete(item)}>
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </>
    )
  else {
    return (
      <>
        <div>
          <div className="container xl:px-52 lg:px-32 md:px-5 xs:px-5 mt-5">
            <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-3" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a href="/admin/dashboard-admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 ">
                    <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                    <a href="/admin/qris" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Payment</a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                    <a href="/admin/qris" className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 ">Qris</a>
                  </div>
                </li>
              </ol>
            </nav>

            <div className='text-3xl font-bold mb-4 mt-10'>
              Payment QRIS
            </div>
            <div>
              <button className=" rounded-full"><PlusCircleIcon className="w-8 hover:text-indigo-500 " onClick={() => setModalShow(true)} /></button>
              <TambahData
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
            <div>
              <div className="overflow-x-auto rounded-lg">
                <table className="table-auto border-collapse">
                  <thead className="bg-gray-50">
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 border">No</th>
                      <th className="py-2 px-4 border">QRIS</th>
                      <th className="py-2 px-4 border">QRIS Nama</th>
                      <th className="py-2 px-4 border">Gambar</th>
                      <th className="py-2 px-4 border">QRIS Owner</th>
                      <th className="py-2 px-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    Tidak Ada Data
                    {dataTabel.map((item, index) => {
                      return (
                        <>
                          <tr key={item.uuid}>
                            <td className="px-6 py-4 whitespace-nowrap border">
                              <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                              <div className="text-sm font-medium text-gray-900">{item.qr_qris}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                              <div className="text-sm text-gray-500">{item.qris_name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                              <div className="text-sm px-3 text-gray-500"><img className="w-8" src={item.picture} alt={item.qris_name} /></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border">
                              <div className="text-sm px-3 text-gray-500"><img className="w-8" src={item.qris_img} alt={item.qris_name} /></div>
                            </td>
                            <td className="flex px-6 py-4 whitespace-nowrap border">
                              <div>
                                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdate(item)} >
                                  Edit
                                </button>
                                <EditData
                                  show={modalShow2}
                                  onHide={() => setModalShow2(false)}
                                  qr_qris={qr_qris}
                                  qris_name={qris_name}
                                  picture={picture}
                                  qris_img={qris_img}
                                  uuid={tempUuid}
                                />
                              </div>
                              <div>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDelete(item)}>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

function TambahData(props) {
  const [qr_qris, setQr_Qris] = useState("");
  const [qris_name, setQris_name] = useState("");
  const [qris_img, setQris_img] = useState("");
  const [picture, setPicture] = useState("");

  const handleDataChange1 = (e) => {
    setQr_Qris(e.target.value)
  }
  const handleDataChange2 = (e) => {
    setQris_name(e.target.value)
  }
  const handleDataChange3 = (e) => {
    setPicture(e.target.value)
  }
  const handleDataChange4 = (e) => {
    setQris_img(e.target.value)
  }
  // ** Write
  const handleOnSubmit = () => {
    const uuid = uid();
    set(ref(db, `/payment-qris/${uuid}`), {
      picture,
      qr_qris,
      qris_img,
      qris_name,
      uuid,
    });
    setQr_Qris("");
    setQris_name("");
    setQris_img("");
    setPicture("");
    props.onHide('');
    window.location.reload();
    console.log('Data Produk Mlbb Berahasil Ditambah', handleOnSubmit);
  }
  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Tambah Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingQR"
              label="QRIS"
              className="mb-3"
            >
              <FormControl type="text" value={qr_qris} onChange={handleDataChange1} placeholder='QRIS' />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingQrisName"
              label="QRIS Nama"
              className="mb-3"
            >
              <FormControl type="text" value={qris_name} onChange={handleDataChange2} placeholder='QRIS Nama' />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPicture"
              label="Gambar (https://example.com/)"
              className="mb-3"
            >
              <FormControl type="url" value={picture} onChange={handleDataChange3} placeholder='Gambar' />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingQRISowner"
              label="QRIS Owner (https://example.com/)"
              className="mb-3"
            >
              <FormControl type="text" value={qris_img} onChange={handleDataChange4} placeholder='QRIS Owner' />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button className='bg-red-500' onClick={props.onHide}>Close</Button>
            <Button type='submit' onClick={handleOnSubmit} className='bg-indigo-500 '>Save</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  )
}
function EditData(props) {
  const [qr_qris, setQr_Qris] = useState(props.qr_qris || "");
  const [qris_name, setQris_name] = useState(props.qris_name || "");
  const [qris_img, setQris_img] = useState(props.qris_img || "");
  const [picture, setPicture] = useState(props.picture || "");
  const [tempUuid, setTempUuid] = useState(props.uuid || "");

  useEffect(() => {
    setQr_Qris(props.qr_qris || "");
  }, [props.qr_qris]);

  useEffect(() => {
    setQris_name(props.qris_name || "");
  }, [props.qris_name]);

  useEffect(() => {
    setQris_img(props.qris_img || "");
  }, [props.qris_img]);

  useEffect(() => {
    setPicture(props.picture || "");
  }, [props.picture]);

  useEffect(() => {
    // Update nilai tempUuid saat props.uuid berubah
    setTempUuid(props.uuid || "");
  }, [props.uuid]);

  const handleDataChange1 = (e) => {
    setQr_Qris(e.target.value)
  }
  const handleDataChange2 = (e) => {
    setQris_name(e.target.value)
  }
  const handleDataChange3 = (e) => {
    setPicture(e.target.value)
  }
  const handleDataChange4 = (e) => {
    setQris_img(e.target.value)
  }

  // ** Update
  const handleSubmitChange = (e) => {
    console.log("tempUuid :", tempUuid);
    e.preventDefault();
    if (tempUuid) {
      update(ref(db, `/payment-qris/${tempUuid}`), {
        picture,
        qr_qris,
        qris_img,
        qris_name,
        uuid: tempUuid,
      });
      setPicture('');
      setQr_Qris('');
      setQris_img('');
      setQris_name('');
      window.location.reload();
      props.onHide();
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmitChange}>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel
              controlId="floatingQRIS"
              label="QRIS"
              className="mb-3"
            >
              <FormControl type="text" value={qr_qris} onChange={handleDataChange1} placeholder='QRIS' />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingQRISName"
              label="QRIS Name"
              className="mb-3"
            >
              <FormControl type="text" value={qris_name} onChange={handleDataChange2} placeholder='QRIS Name' />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingGambar"
              label="Gambar (https://example.com/)"
              className="mb-3"
            >
              <FormControl type="url" value={picture} onChange={handleDataChange3} placeholder='(https://example.com/)' />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingOwner"
              label="QRIS Owner"
              className="mb-3"
            >
              <FormControl type="text" value={qris_img} onChange={handleDataChange4} placeholder='Kode Produk' />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button className='bg-red-500' onClick={props.onHide}>Close</Button>
            <Button type='submit' onClick={handleSubmitChange} className='bg-indigo-500 '>Save</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  )
}

export default Qris