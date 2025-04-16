//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';

export default function PengumumanIndex() {

    // State
    const [pengumumans, setPengumumans] = useState([]);

    // Fetch data
    const fetchDataPengumumans = async () => {
        try {
            const response = await api.get('/api/pengumumans');
            setPengumumans(response.data.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataPengumumans();
    }, []);

    const deletePengumuman = async (id) => {
        try {
            await api.delete(`/api/pengumumans/${id}`);
            fetchDataPengumumans();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <div className="container py-5" style={{
            background: `url('https://www.transparenttextures.com/patterns/white-wall-3.png')`,
            backgroundColor: "#2c2b28",
            color: "#fefae0",
            fontFamily: "'Cinzel', serif",
        }}>
            <div className="row">
                <div className="col-md-12">
                    <Link to="/pengumumans/create" className="btn mb-4 fw-bold" style={{
                        borderRadius: "30px",
                        backgroundColor: "#e5c07b",
                        border: "none",
                        color: "#2c2b28",
                        fontSize: "1.1rem",
                    }}>
                        + ADD NEW PENGUMUMAN
                    </Link>
                    <div className="card border-0 shadow rounded-4" style={{ backgroundColor: "#3a3a35" }}>
                        <div className="card-body">
                            <table className="table table-bordered text-light">
                                <thead style={{ backgroundColor: "#44403c", color: "#e5c07b" }}>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Judul</th>
                                        <th scope="col">Tanggal Dibuat</th>
                                        <th scope="col">Tampil Hingga</th>
                                        <th scope="col" style={{ width: '15%' }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pengumumans.length > 0 ? (
                                        pengumumans.map((pengumuman, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    <img src={pengumuman.image} alt={pengumuman.judul} width="180" className="rounded shadow" />
                                                </td>
                                                <td>{pengumuman.judul}</td>
                                                <td>{pengumuman.tanggal_dibuat}</td>
                                                <td>{pengumuman.tampil_hingga}</td>
                                                <td className="text-center">
                                                    <Link to={`/pengumumans/edit/${pengumuman.id}`} className="btn btn-sm me-2" style={{ backgroundColor: "#6c757d", color: "#fff", borderRadius: "20px" }}>
                                                        ✏️ Edit
                                                    </Link>
                                                    <Link to={`/pengumumans/detail/${pengumuman.id}`} className="btn btn-sm me-2" style={{ backgroundColor: "#5f6f52", color: "#fff", borderRadius: "20px" }}>
                                                        🔍 Lihat
                                                    </Link>
                                                    <button onClick={() => deletePengumuman(pengumuman.id)} className="btn btn-sm" style={{ backgroundColor: "#b23b3b", color: "#fff", borderRadius: "20px" }}>
                                                        🗑️ Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                <div className="alert alert-warning fw-semibold">
                                                    Data Belum Tersedia!
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
