import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom'; // Tidak perlu `Link` karena tidak digunakan
import api from '../../api';


export default function PengumumanDetail() {


    // State untuk menyimpan data post
    const [pengumuman, setPengumuman] = useState(null); // null karena hanya satu objek post


    // Destructure ID dari URL
    const { id } = useParams();


    // Method untuk mengambil detail post
    const fetchDetailPengumuman = async () => {
        try {
            // Fetch data dari API
            const response = await api.get(`/api/pengumumans/${id}`);
           
            // Assign response data ke state "post"
            setPengumuman(response.data.data);
        } catch (error) {
            console.error('Error fetching produk data:', error);
        }
    }


    // Jalankan fetchDetailPost ketika komponen di-mount
    useEffect(() => {
        fetchDetailPengumuman();
    }, [id]); // Tambahkan `id` sebagai dependency agar hook dijalankan setiap kali id berubah


    // Menampilkan loading state atau pesan error jika diperlukan
    if (!pengumuman) {
        return <div>Loading...</div>; // Menampilkan loading sementara data belum tersedia
    }


    return (
        <div className="container mt-5">
         <Link to= '/pengumumans' className="btn btn-sm btn-primary rounded-sm shadow border-2 me-2">BACK</Link>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            {/* Menampilkan gambar, title, dan content post */}
                            {pengumuman.image && <img src={pengumuman.image} alt={pengumuman.title} width="200" className='w-100 rounded' />}
                            <hr/>
                            <h4>{pengumuman.nama_instansi}</h4>
                            <h4>{pengumuman.alamat}</h4>
                            <h4>{pengumuman.tanggal_kunjungan}</h4>
                            <h4>{pengumuman.tujuan_kunjungan}</h4>

                            <p className="mt-3">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
