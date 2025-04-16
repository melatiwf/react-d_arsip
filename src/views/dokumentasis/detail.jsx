import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom'; // Tidak perlu `Link` karena tidak digunakan
import api from '../../api';


export default function DokumentasiDetail() {


    // State untuk menyimpan data post
    const [dokumentasi, setDokumentasi] = useState(null); // null karena hanya satu objek post


    // Destructure ID dari URL
    const { id } = useParams();


    // Method untuk mengambil detail post
    const fetchDetailDokumentasi = async () => {
        try {
            // Fetch data dari API
            const response = await api.get(`/api/dokumentasis/${id}`);
           
            // Assign response data ke state "post"
            setDokumentasi(response.data.data);
        } catch (error) {
            console.error('Error fetching produk data:', error);
        }
    }


    // Jalankan fetchDetailPost ketika komponen di-mount
    useEffect(() => {
        fetchDetailDokumentasi();
    }, [id]); // Tambahkan `id` sebagai dependency agar hook dijalankan setiap kali id berubah


    // Menampilkan loading state atau pesan error jika diperlukan
    if (!dokumentasi) {
        return <div>Loading...</div>; // Menampilkan loading sementara data belum tersedia
    }


    return (
        <div className="container mt-5">
         <Link to= '/dokumentasis' className="btn btn-sm btn-primary rounded-sm shadow border-2 me-2">BACK</Link>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            {/* Menampilkan gambar, title, dan content post */}
                            {dokumentasi.image && <img src={dokumentasi.image} alt={dokumentasi.title} width="200" className='w-100 rounded' />}
                            <hr/>
                            <h4>{dokumentasi.judul}</h4>
                            <h4>{dokumentasi.deskripsi}</h4>
                            <h4>{dokumentasi.tanggal}</h4>
                            
                            <p className="mt-3">
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
