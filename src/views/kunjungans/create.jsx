//import useState
import { useState } from 'react';
import { useEffect } from 'react';
//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function KunjunganCreate() {

    //define state
    const [image, setImage] = useState('');
    const [nama_instansi, setNama_instansi] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [tujuan_kunjungan, setTujuan_kunjungan] = useState('');
    const [pengunjungs_id, setPengunjungs_id] = useState('');

    const fetchDataPengunjungs = async () => {
        try {
            const response = await api.get('/api/pengunjungs');
            setPengunjungs(response.data.data.data);
        } catch (error) {
            console.error('Failed to fetch Pengunjung:', error);
        }
    };

    // Run useEffect
    useEffect(() => {
        fetchDataPengunjungs();
    }, []);

    //state validation
    const [errors, setErrors] = useState([]);
    const [pengunjungs, setPengunjungs] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //method store post
    const storeKunjungan = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('image', image);
        formData.append('nama_instansi', nama_instansi);
        formData.append('tanggal', tanggal);
        formData.append('tujuan_kunjungan', tujuan_kunjungan);
        formData.append('pengunjungs_id', pengunjungs_id);

        //send data with API
        await api.post('/api/kunjungans', formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/kunjungans');

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storeKunjungan}>

                            <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control"/>
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.image[0]}
                                            </div>
                                        )
                                    }
                                </div>

                            
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Instansi</label>
                                    <input type="text" className="form-control" onChange={(e) => setNama_instansi(e.target.value)} placeholder="Nama Instansi"/>
                                    {
                                        errors.nama_instansi && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.nama_instansi[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tanggal</label>
                                    <input type="date" className="form-control" onChange={(e) => setTanggal(e.target.value)} placeholder="Tanggal"/>
                                    {
                                        errors.tanggal && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.tanggal[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tujuan Kunjungan</label>
                                    <input type="text" className="form-control" onChange={(e) => setTujuan_kunjungan(e.target.value)} placeholder="Tujuan Kunjungan"/>
                                    {
                                        errors.tujuan_kunjungan && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.tujuan_kunjungan[0]}
                                            </div>
                                        )
                                    }
                                </div>

<div className="mb-3">
    <label className="form-label fw-bold">Nama Pengunjung</label>
    <select className="form-select" onChange={(e) => setPengunjungs_id(e.target.value)} required>
        <option value="">-- Pilih Pengunjung --</option>
        {pengunjungs.map((pengunjung) => (
            <option key={pengunjung.id} value={pengunjung.id}>
                {pengunjung.nama}
            </option>
        ))}
    </select>
    {errors.pengunjungs_id && (
        <div className="alert alert-danger mt-2">
            {errors.pengunjungs_id[0]}
        </div>
    )}
</div>



                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}