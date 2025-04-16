import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom'; // Tidak perlu `Link` karena tidak digunakan
import api from '../../api';


export default function PengunjungDetail() {


    // State untuk menyimpan data post
    const [pengunjung, setPengunjung] = useState(null); // null karena hanya satu objek post


    // Destructure ID dari URL
    const { id } = useParams();


    // Method untuk mengambil detail post
    const fetchDetailPengunjung = async () => {
        try {
            // Fetch data dari API
            const response = await api.get(`/api/pengunjungs/${id}`);
           
            // Assign response data ke state "post"
            setPengunjung(response.data.data);
        } catch (error) {
            console.error('Error fetching pengunjung data:', error);
        }
    }


    // Jalankan fetchDetailPost ketika komponen di-mount
    useEffect(() => {
        fetchDetailPengunjung();
    }, [id]); // Tambahkan `id` sebagai dependency agar hook dijalankan setiap kali id berubah


    // Menampilkan loading state atau pesan error jika diperlukan
    if (!pengunjung) {
        return <div>Loading...</div>; // Menampilkan loading sementara data belum tersedia
    }


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">
                <div className="col-md-6">
                <Link to= '/pengunjungs' className="btn btn-sm btn-primary rounded-sm shadow border-0 me-4">BACK</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">                            
                            {/* Menampilkan gambar, title, dan content post */}
                            {pengunjung.image && <img src={pengunjung.image} alt={pengunjung.title} width="200" className='w-80 rounded' />}
                            <hr/>
                            <h4>{pengunjung.nama}</h4>
                            <h4>{pengunjung.alamat}</h4>
                            <h4>{pengunjung.nomor_telepon}</h4>
                            <h4>{pengunjung.email}</h4>

                            <p className="mt-3">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
