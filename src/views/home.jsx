import { Link } from 'react-router-dom';
import { Smile, Users, CalendarCheck, Megaphone, Camera } from 'lucide-react';

export default function Home() {
    const buttons = [
        { to: '/dashboard', label: 'Mulai', icon: <Smile size={20} className="me-2" /> },
        { to: '/pengunjungs', label: 'Pengunjung', icon: <Users size={20} className="me-2" /> },
        { to: '/kunjungans', label: 'Kunjungan', icon: <CalendarCheck size={20} className="me-2" /> },
        { to: '/pengumumans', label: 'Pengumuman', icon: <Megaphone size={20} className="me-2" /> },
        { to: '/dokumentasis', label: 'Dokumentasi', icon: <Camera size={20} className="me-2" /> },
    ];

    return (
        <div
            className="p-5 mb-4 rounded-4 shadow-lg position-relative"
            style={{
                background: `url("https://www.transparenttextures.com/patterns/old-mathematics.png") repeat, linear-gradient(135deg, #2f2e2e, #1e1c1a)`,
                backgroundBlendMode: 'multiply',
                border: '1px solid #5e4b3c',
            }}
        >
            {/* STEMPEL */}
            <img
                src="/stempel-arsip.png"
                alt="Stempel Arsip"
                style={{
                    width: '100px',
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    opacity: 0.15,
                    transform: 'rotate(-15deg)',
                    zIndex: 0,
                }}
            />

            <div className="container-fluid py-5 text-center text-light" style={{ position: 'relative', zIndex: 1 }}>
                <h1
                    className="fw-bold mb-3"
                    style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '3.5rem',
                        color: '#d1bfa7',
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)',
                        borderBottom: '2px solid #d1bfa7',
                        borderImage: 'linear-gradient(to right, #d1bfa7, #8e7d6b, #d1bfa7) 1',
                        display: 'inline-block',
                        paddingBottom: '8px',
                    }}
                >
                    ✨ DIGITAL ARSIP ✨
                </h1>
                <p
                    className="col-md-8 mx-auto fs-5 mb-5"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        color: '#ccc5b9',
                    }}
                >
                    Arsip digital bergaya klasik elegan. Semua dokumenmu tersimpan rapi dan abadi. 📜🕯️
                </p>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {buttons.map(({ to, label, icon }) => (
                        <div key={to} className="col">
                            <div
                                className="card shadow-sm border-0 rounded-4 position-relative"
                                style={{
                                    backgroundColor: '#3b3735',
                                    border: '1px solid #5e4b3c',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <div className="vintage-ornament">
                                    <svg width="100%" height="12" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q25 0 50 5 Q75 10 100 5" fill="none" stroke="#c8b79c" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <div
                                    className="card-body text-center p-4"
                                    style={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        color: '#f0e8d9',
                                    }}
                                >
                                    <div
                                        className="card-title fs-4 fw-bold mb-3"
                                        style={{
                                            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)',
                                            color: '#e3c99c',
                                        }}
                                    >
                                        {icon}
                                        {label.toUpperCase()}
                                    </div>
                                    <Link
                                        to={to}
                                        className="btn w-100 py-2 shadow-sm"
                                        style={{
                                            borderRadius: '50px',
                                            color: '#1e1c1a',
                                            backgroundColor: '#d9c8af',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            fontFamily: '"Cormorant Garamond", serif',
                                            transition: 'all 0.3s',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                            e.currentTarget.style.backgroundColor = '#e6d5b9';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.backgroundColor = '#d9c8af';
                                        }}
                                    >
                                        Akses
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
