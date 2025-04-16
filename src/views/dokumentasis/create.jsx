//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function DokumentasiCreate() {

    //define state
    const [image, setImage] = useState('');
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [tanggal, setTanggal] = useState('');
    

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //method store post
    const storeDokumentasi = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('image', image);
        formData.append('judul', judul);
        formData.append('deskripsi', deskripsi);
        formData.append('tanggal', tanggal);

        //send data with API
        await api.post('/api/dokumentasis', formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/dokumentasis');

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
                            <form onSubmit={storeDokumentasi}>
                            
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
                                    <label className="form-label fw-bold">Judul</label>
                                    <input type="text" className="form-control" onChange={(e) => setJudul(e.target.value)} placeholder="Judul"/>
                                    {
                                        errors.judul && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.judul[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Deskripsi</label>
                                    <input type="text" className="form-control" onChange={(e) => setDeskripsi(e.target.value)} placeholder="Deskripsi"/>
                                    {
                                        errors.deskripsi && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.deskripsi[0]}
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

                                

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}