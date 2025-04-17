//import Link dan useLocation dari react-router-dom
import { Link, useLocation, useNavigate } from "react-router-dom";


//import routes
import Routes from './routes';

import axios from 'axios';

export default function App() {


  // gunakan useLocation untuk mendapatkan rute saat ini
  const location = useLocation();
  const navigate = useNavigate();

  // cek jika lokasi adalah register atau login
  const hideNavbar = location.pathname === '/register' || location.pathname === '/login';
  const isAdmin = localStorage.getItem('is_administrator') === '1';
  console.log('isAdmin:', isAdmin);

  //function logout
  const logoutHanlder = async () => {
    const token = localStorage.getItem("token");


    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      //set axios header dengan type Authorization + Bearer token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      //fetch Rest API
      await axios.post('http://localhost:8000/api/logout');

      //remove token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("is_administrator");


      //redirect halaman login
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      {/* Tampilkan navbar hanya jika tidak di halaman register atau login */}
      {!hideNavbar && (
        <div>
          <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
              <Link to="/" className="navbar-brand">HOME</Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link active" aria-current="page">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pengunjungs" className="nav-link active" aria-current="page">Pengunjung</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/kunjungans" className="nav-link active" aria-current="page">Kunjungan</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pengumumans" className="nav-link active" aria-current="page">Pengumuman</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dokumentasis" className="nav-link active" aria-current="page">Dokumentasi</Link>
                  </li>

                  {isAdmin && (
                    <li className="nav-item">
                      <Link to="/petugas" className="nav-link active" aria-current="page">Petugas</Link>
                    </li>
                  )}
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}


      {/* Render halaman yang ada di Routes */}
      <Routes />


    </>
  );
}


