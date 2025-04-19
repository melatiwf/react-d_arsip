//import useState
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function PengunjungEdit() {

    //define state
  //  const [image, setImage] = useState('');
    const [nama, setNama] = useState('');
    const [jenis_kelamin, setJenis_kelamin] = useState('');
    const [asal_instansi, setAsal_instansi] = useState('');
    const [jumlah, setJumlah] = useState('');
    const [email, setEmail] = useState('');


    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //method fetchDetailPost
    const fetchDetailPengunjung = async () => {
        
        //fetch data
        await api.get(`/api/pengunjungs/${id}`)
            .then(response => {
                
                //assign to state
                setNama(response.data.data.nama);
                setJenis_kelamin(response.data.data.jenis_kelamin);
                setAsal_instansi(response.data.data.asal_instansi);
                setJumlah(response.data.data.jumlah);
                setEmail(response.data.data.email);
               // setImage(response.data.data.image);
            })
    }

    //hook useEffect
    useEffect(() => {
        
        //call method "fetchDetailPost"
        fetchDetailPengunjung();

    }, []);

    //method handle file change
    /*const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }*/

    //method update post
    const updatePengunjung = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('nama', nama);
        formData.append('jenis_kelamin', jenis_kelamin);
        formData.append('asal_instansi', asal_instansi);
        formData.append('jumlah', jumlah);
        formData.append('email', email);
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/pengunjungs/${id}`, formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/pengunjungs');

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
         <Link to= '/pengunjungs' className="btn btn-sm btn-primary rounded-sm shadow border-2 me-1">BACK</Link>

            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updatePengunjung}>
                            
                            <div className="mb-3">
                                    <label className="form-label fw-bold">Nama</label>
                                    <input type="text" className="form-control"value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama"/>
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
                                    <input type="enum" className="form-control"value={jenis_kelamin} onChange={(e) => setJenis_kelamin(e.target.value)} placeholder="Jenis Kelamin"/>
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
                                    <input type="text" className="form-control"value={asal_instansi} onChange={(e) => setAsal_instansi(e.target.value)} placeholder="Asal Intansi"/>
                                    {
                                        errors.asal_instansi && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.asal_instansi[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Jumlah Pengunjung</label>
                                    <input type="text" className="form-control"value={jumlah} onChange={(e) => setJumlah(e.target.value)} placeholder="Jumlah pengunjung"/>
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
                                    <input type="text" className="form-control"value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
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

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}