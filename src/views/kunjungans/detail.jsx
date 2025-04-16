import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom'; // Tidak perlu `Link` karena tidak digunakan
import api from '../../api';


export default function KunjunganDetail() {


    // State untuk menyimpan data post
    const [kunjungan, setKunjungan] = useState(null); // null karena hanya satu objek post


    // Destructure ID dari URL
    const { id } = useParams();


    // Method untuk mengambil detail post
    const fetchDetailKunjungan = async () => {
        try {
            // Fetch data dari API
            const response = await api.get(`/api/kunjungans/${id}`);
           
            // Assign response data ke state "post"
            setKunjungan(response.data.data);
        } catch (error) {
            console.error('Error fetching produk data:', error);
        }
    }


    // Jalankan fetchDetailPost ketika komponen di-mount
    useEffect(() => {
        fetchDetailKunjungan();
    }, [id]); // Tambahkan `id` sebagai dependency agar hook dijalankan setiap kali id berubah


    // Menampilkan loading state atau pesan error jika diperlukan
    if (!kunjungan) {
        return <div>Loading...</div>; // Menampilkan loading sementara data belum tersedia
    }


    return (
        <div className="container mt-5">
         <Link to= '/kunjungans' className="btn btn-sm btn-primary rounded-sm shadow border-2 me-2">BACK</Link>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            {/* Menampilkan gambar, title, dan content post */}
                            {kunjungan.image && <img src={kunjungan.image} alt={kunjungan.title} width="200" className='w-100 rounded' />}
                            <hr/>
                            <h4>{kunjungan.nama_pengirim}</h4>
                            <h4>{kunjungan.alamat}</h4>
                            <h4>{kunjungan.nomor_telepon}</h4>

                            <p className="mt-3">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
