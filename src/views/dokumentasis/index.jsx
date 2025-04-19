//import useState dan useEffect
import { useState, useEffect } from 'react';

//import api
import api from '../../api';

//import Link
import { Link } from 'react-router-dom';

export default function DokumentasiIndex() {

    //ini state
    const [dokumentasis, setDokumentasis] = useState([]);

    //define method
    const fetchDataDokumentasis = async () => {

        //fetch data from API with Axios
        await api.get('/api/dokumentasis')
            .then(response => {
                
                //assign response data to state "posts"
                setDokumentasis(response.data.data.data);
            })
        
    }

    //run hook useEffect
    useEffect(() => {
        
        //call method "fetchDataPosts"
        fetchDataDokumentasis();

    }, []);

    //method deleteDokumentasi
    const deleteDokumentasi = async (id) => {
        
        //delete with api
        await api.delete(`/api/dokumentasis/${id}`)
            .then(() => {
                
                //call method "fetchDataPosts"
                fetchDataDokumentasis();

            })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/dokumentasis/create" className="btn btn-md '#8B4513' rounded shadow border-0 mb-3">ADD NEW DOKUMENTASI</Link>
                    <div className="row">
                        {
                            dokumentasis.length > 0
                                ? dokumentasis.map((dokumentasi, index) => (
                                    <div key={index} className="col-md-4 mb-4">
                                        <div className="card border-0 shadow" style={{ backgroundColor: '#2d2a26', borderRadius: '12px' }}>
                                            <img src={dokumentasi.image} alt={dokumentasi.judul} className="card-img-top rounded" style={{ height: '200px', objectFit: 'cover' }} />
                                            <div className="card-body" style={{ padding: '20px' }}>
                                                <h5 className="card-title" style={{ color: '#DAA520', fontFamily: 'Georgia, serif' }}>{dokumentasi.judul}</h5>
                                                <p className="card-text" style={{ color: '#FFF8DC', fontFamily: 'Georgia, serif', fontSize: '14px' }}>{dokumentasi.deskripsi}</p>
                                                <p className="card-text" style={{ fontSize: '12px', color: '#FFF8DC' }}>{dokumentasi.tanggal}</p>
                                                <div className="d-flex justify-content-between mt-3">
                                                    <Link to={`/dokumentasis/edit/${dokumentasi.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0">EDIT</Link>
                                                    <Link to={`/dokumentasis/detail/${dokumentasi.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0">LIHAT</Link>
                                                    <button onClick={() => deleteDokumentasi(dokumentasi.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : <div className="col-12">
                                    <div className="alert alert-danger mb-0 text-center">
                                        Data Belum Tersedia!
                                    </div>
                                  </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
