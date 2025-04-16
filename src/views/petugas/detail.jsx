import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Tidak perlu `Link` karena tidak digunakan
import api from '../../api';


export default function PostDetail() {


    // State untuk menyimpan data post
    const [post, setPost] = useState(null); // null karena hanya satu objek post


    // Destructure ID dari URL
    const { id } = useParams();


    // Method untuk mengambil detail post
    const fetchDetailPost = async () => {
        try {
            // Fetch data dari API
            const response = await api.get(`/api/posts/${id}`);
           
            // Assign response data ke state "post"
            setPost(response.data.data);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    }


    // Jalankan fetchDetailPost ketika komponen di-mount
    useEffect(() => {
        fetchDetailPost();
    }, [id]); // Tambahkan `id` sebagai dependency agar hook dijalankan setiap kali id berubah


    // Menampilkan loading state atau pesan error jika diperlukan
    if (!post) {
        return <div>Loading...</div>; // Menampilkan loading sementara data belum tersedia
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            {/* Menampilkan gambar, title, dan content post */}
                            {petugas.barang.image && <img src={peminjaman.barang.image} alt={peminjaman.barang.nama} width="200" className='w-100 rounded' />}
                            <hr/>
                            <h4>{post.title}</h4>
                            <p className="mt-3">
                                {post.content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
