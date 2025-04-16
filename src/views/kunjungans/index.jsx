import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";

export default function KunjunganIndex() {
  const [kunjungans, setKunjungans] = useState([]);

  const fetchDataKunjungans = async () => {
    try {
      const response = await api.post("/api/kunjungans");
      setKunjungans(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteKunjungan = async (id) => {
    Swal.fire({
      title: "Apakah Kamu Yakin?",
      text: "Ingin menghapus data ini!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "TIDAK",
      confirmButtonText: "YA, HAPUS!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/kunjungans/${id}`);
          Swal.fire({
            title: "Data Berhasil Dihapus",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          fetchDataKunjungans(); // Refresh data setelah menghapus
        } catch (error) {
          Swal.fire({
            title: "Gagal Menghapus Data",
            text: error.response?.data?.message || "Terjadi kesalahan",
            icon: "error",
          });
        }
      }
    });
  };

  // Ambil data barang saat komponen dimuat
  useEffect(() => {
    fetchDataKunjungans();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <Link to="/kunjungans/create" className="btn btn-success mb-3">
            ADD NEW KUNJUNGAN
          </Link>
          <td>
          <Link to="/kunjungans/DataTable" className="btn btn-md btn-success rounded shadow border-0 mb-3">
            REKAP DATA KUNJUNGAN
          </Link>
          </td>
          
          <div className="row">
            {/* Looping  dan menampilkannya dalam card */}
            {kunjungans.length > 0 ? (
              kunjungans.map((kunjungan) => (
                <div className="col-md-4 mb-4" key={kunjungan.id}>
                  <div className="card shadow border-0">
                    <img
                      src={kunjungan.image}
                      alt={kunjungan.nama_instansi}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{kunjungan.nama_instansi}</h5>
                      <p className="card-text">{kunjungan.tanggal}</p>
                      <p className="card-text">{kunjungan.tujuan}</p>
                      <p className="card-text">Pengunjung: {kunjungan.pengunjungs_id}</p>
                      <div className="d-flex justify-content-between">
                        <Link to={`/kunjungans/edit/${kunjungan.id}`} className="btn btn-sm btn-primary">
                          <i className="fas fa-edit"></i> EDIT
                        </Link>
                        <button onClick={() => deleteKunjungan(kunjungan.id)} className="btn btn-sm btn-danger">
                          <i className="fas fa-trash"></i> DELETE
                        </button>
                        <Link to={`/kunjungans/detail/${kunjungan.id}`} className="btn btn-sm btn-info">
                          <i className="fas fa-eye"></i> LIHAT
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-danger mb-0">
                  Data Tidak Tersedia
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
