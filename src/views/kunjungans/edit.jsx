//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function KunjunganEdit() {

    //define state
    const [image, setImage] = useState('');
    const [nama_instansi, setNama_instansi] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [tujuan_kunjungan, setTujuan_kunjungan] = useState('');
    const [pengunjungs_id, setPengunjungs_id] = useState('');

    const [pengunjungs, setPengunjungs] = useState([]);

    const fetchDataPengunjung = async () => {

        //fetch data from API with Axios
        await api.get('/api/pengunjungs')
            .then(response => {

                //assign response data to state "posts"
                setPengunjungs(response.data.data.data);

            })

    }

    //run hook useEffect
    useEffect(() => {

        //call method "fetchDataPosts"
        fetchDataPengunjung();

    }, []);



    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //method fetchDetailPost
    const fetchDetailKunjungan = async () => {

        //fetch data
        await api.get(`/api/kunjungans/${id}`)
            .then(response => {

                //assign to state
                setImage(response.data.data.image);
                setNama_instansi(response.data.data.nama_instansi);
                setTanggal(response.data.data.tanggal);
                setTujuan_kunjungan(response.data.data.tujuan_kunjungan);
                setPengunjungs_id(response.data.data.pengunjungs_id);

            })
    }

    //hook useEffect
    useEffect(() => {

        //call method "fetchDetailPost"
        fetchDetailKunjungan();

    }, []);

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //method update post
    const updateKunjungan = async (e) => {
        e.preventDefault();

        //init FormData
        const formData = new FormData();

        //append data
        formData.append('image', image);
        formData.append('nama_instansi', nama_instansi);
        formData.append('tanggal', tanggal);
        formData.append('tujuan_kunjungan', tujuan_kunjungan);
        formData.append('pengunjungs_id', pengunjungs_id);
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/kunjungans/${id}`, formData)
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
                            <form onSubmit={updateKunjungan}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control" />
                                    {
                                        image && (
                                            <div className="mt-2">
                                                <img src={image} alt="Preview" width="150" />
                                            </div>
                                        )
                                    }
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.image[0]}
                                            </div>
                                        )
                                    }                                </div>


                                <div className="mb-3">
                                    <label className="form-label fw-bold">Nama Instansi</label>
                                    <input type="text" className="form-control" value={nama_instansi} onChange={(e) => setNama_instansi(e.target.value)} placeholder="Nama Instansi" />
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
                                    <input type="date" className="form-control" value={tanggal} onChange={(e) => setTanggal(e.target.value)} placeholder="Tanggal" />
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
                                    <input type="num" className="form-control" value={tujuan_kunjungan} onChange={(e) => setTujuan_kunjungan(e.target.value)} placeholder="Tujuan Kunjungan" />
                                    {
                                        errors.tujuan_kunjungan && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.tujuan_kunjungan[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Pengunjung</label>
                                    <select id='pengunjungs_id' className="form-control" onChange={(e) => setPengunjungs_id(e.target.value)} value={pengunjungs_id}  >
                                        <option value="">--Silahkan Pilih --</option>
                                        {
                                            pengunjungs.length > 0
                                                ? pengunjungs.map((pengunjungs) => (
                                                    <option value={pengunjungs.id}>{pengunjungs.nama}</option>


                                                ))
                                                : <option>Data belum tersedia</option>
                                        }
                                    </select>
                                </div>


                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}