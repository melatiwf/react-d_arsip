//import useState
import { useState } from 'react';

//import useNavigate
import { useNavigate } from 'react-router-dom';

//import API
import api from '../../api';

export default function PengumumanCreate() {

    //define state
    const [image, setImage] = useState('');
    const [judul, setJudul] = useState('');
    const [tanggal_dibuat, setTanggal_dibuat] = useState('');
    const [tampil_hingga, setTampil_hingga] = useState('');    

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //method handle file change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //method store post
    const storePengumuman = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('image', image);
        formData.append('judul', judul);
        formData.append('tanggal_dibuat', tanggal_dibuat);
        formData.append('tampil_hingga', tampil_hingga);

        //send data with API
        await api.post('/api/pengumumans', formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/pengumumans');

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
                            <form onSubmit={storePengumuman}>
                            
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
                                    <label className="form-label fw-bold">Tanggal Dibuat</label>
                                    <input type="date" className="form-control" onChange={(e) => setTanggal_dibuat(e.target.value)} placeholder="Tanggal Dibuat"/>
                                    {
                                        errors.tanggal_dibuat && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.tanggal_dibuat[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tampil Hingga</label>
                                    <input type="text" className="form-control" onChange={(e) => setTampil_hingga(e.target.value)} placeholder="Tampil Hingga"/>
                                    {
                                        errors.tampil_hingga && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.tampil_hingga[0]}
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