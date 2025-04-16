import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function PetugasIndex() {

    // Ini state
    const [petugas, setPetugas] = useState([]);

    // Define method untuk mengambil data petugas
    const fetchDataPetugas = async () => {
        await api.get('/api/petugas')
            .then(response => {
                setPetugas(response.data.data.data);
            });
    };

    // Run hook useEffect untuk mengambil data ketika komponen pertama kali dimuat
    useEffect(() => {
        fetchDataPetugas();
    }, []);

    // Method untuk menghapus petugas
    const deletePetugas = async (id) => {
        await api.delete(`/api/petugas/${id}`)
            .then(() => {
                fetchDataPetugas(); // Refresh data setelah penghapusan
            });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/petugas/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">
                        ADD NEW PETUGAS
                    </Link>
                    <div className="row">
                        {/* Looping setiap petugas dan menampilkan dalam card */}
                        {petugas.length > 0 ? (
                            petugas.map((petugas, index) => (
                                <div className="col-md-4 mb-4" key={index}>
                                    <div className="card border-0 shadow">
                                        <div className="card-body">
                                            <h5 className="card-title">{petugas.name}</h5>
                                            <p className="card-text">
                                                <strong>Email:</strong> {petugas.email}
                                            </p>
                                            <div className="d-flex justify-content-between">
                                                <Link
                                                    to={`/petugas/edit/${petugas.id}`}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    EDIT
                                                </Link>
                                                <button
                                                    onClick={() => deletePetugas(petugas.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    DELETE
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">
                                <div className="alert alert-danger mb-0">
                                    Data Belum Tersedia!
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
