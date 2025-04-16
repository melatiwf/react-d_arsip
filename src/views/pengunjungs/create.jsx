//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function PengunjungCreate() {

    //define state
   // const [image, setImage] = useState('');
    const [nama, setNama] = useState('');
    const [jenis_kelamin, setJenis_kelamin] = useState('');
    const [asal_instansi, setAsal_instansi] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [email, setEmail] = useState('');
    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    // const handleFileChange = (e) => {
    //     setImage(e.target.files[0]);
    // }

    //method store post
    const storePengunjung = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        //formData.append('image', image);
        formData.append('nama', nama);
        formData.append('jenis_kelamin', jenis_kelamin);
        formData.append('asal_instansi', asal_instansi);
        formData.append('jumlah', jumlah);
        formData.append('email', email);


        //send data with API
        try {
            await api.post('/api/pengunjungs', formData);
            navigate(`/pengunjungs`); // Redirect ke halaman detail peminjaman
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data.errors || {}); // Menyimpan error dari response API
            } else {
                setErrors({ general: 'Terjadi kesalahan, coba lagi.' });
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePengunjung}>
                            
                
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama</label>
                                    <input type="text" className="form-control" onChange={(e) => setNama(e.target.value)} placeholder="Nama"/>
                                    {
                                        errors.nama && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.nama[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Jenis Kelamin</label>
                                    <input type="enum" className="form-control" onChange={(e) => setJenis_kelamin(e.target.value)} placeholder="Jenis Kelamin"/>
                                    {
                                        errors.jenis_kelamin && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.jenis_kelamin[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Asal Instansi</label>
                                    <input type="text" className="form-control" onChange={(e) => setAsal_instansi(e.target.value)} placeholder="Asal Instansi"/>
                                    {
                                        errors.asal_instansi && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.asal_instansi[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Jumlah pengunjung</label>
                                    <input type="text" className="form-control" onChange={(e) => setJumlah(e.target.value)} placeholder="Jumlah"/>
                                    {
                                        errors.jumlah && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.jumlah[0]}
                                            </div>
                                        )
                                    }
                                </div>


                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    {
                                        errors.email && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.email[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                {/* <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control"/>
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.image[0]}
                                            </div>
                                        )
                                    }
                                </div> */}

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}