//import useState
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from '../../api';

export default function PetugasEdit() {

    //define state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //method fetchDetailPost
    const fetchDetailPetugas = async () => {
        
        //fetch data
        await api.get(`/api/petugas/${id}`)
            .then(response => {
                
                //assign to state
                setName(response.data.data.name);
                setEmail(response.data.data.email);
                setPassword(response.data.data.password);
                setPassword_confirmation(response.data.data.password_confirmation);

            })
    }

    //hook useEffect
    useEffect(() => {
        
        //call method "fetchDetailPost"
        fetchDetailPetugas();

    }, []);

    //method update post
    const updatePetugas = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', password_confirmation);       
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/petugas/${id}`, formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/petugas');

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
                  <Link to= '/petugas' className="btn btn-sm btn-primary rounded-sm shadow border-2 me-2">BACK</Link>

            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={updatePetugas}>
                            

                            <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                                    {
                                        errors.name && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.name[0]}
                                            </div>
                                            
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email</label>
                                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                                    {
                                        errors.email && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.email[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                                    {
                                        errors.password && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.password[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Password_confirmation</label>
                                    <input type="password" className="form-control" onChange={(e) => setPassword_confirmation(e.target.value)} placeholder="Password_confirmation"/>
                                    {
                                        errors.password_confirmation && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.password_confirmation[0]}
                                            </div>
                                        )
                                    }
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