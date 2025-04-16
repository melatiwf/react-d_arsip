import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api";

export default function PengunjungIndex() {
  const [pengunjungs, setPengunjungs] = useState([]);

  const fetchDataPengunjungs = async () => {
    try {
      const response = await api.get("/api/pengunjungs");
      setPengunjungs(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPengunjungs();
  }, []);

  const deletePengunjung = async (id) => {
    Swal.fire({
      title: "Apakah Kamu Yakin?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/pengunjungs/${id}`);
          Swal.fire({
            title: "Berhasil!",
            text: "Data berhasil dihapus.",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          });
          fetchDataPengunjungs();
        } catch (error) {
          Swal.fire({
            title: "Gagal!",
            text: error.response?.data?.message || "Terjadi kesalahan.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div
      className="container py-5"
      style={{
        background: `url('https://www.transparenttextures.com/patterns/old-mathematics.png')`,
        backgroundColor: "#1e1c1a",
        color: "#f8f3e8",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <Link
            to="/pengunjungs/create"
            className="btn btn-warning mb-4 fw-bold"
            style={{
              borderRadius: "30px",
              backgroundColor: "#cba135",
              border: "none",
              color: "#2d1f12",
              fontSize: "1.1rem",
            }}
          >
            + ADD NEW PENGUNJUNG
          </Link>

          <div className="row">
            {pengunjungs.length > 0 ? (
              pengunjungs.map((pengunjung, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div
                    className="card shadow rounded-4 border-0"
                    style={{
                      backgroundColor: "#2d2a26",
                      color: "#f8f3e8",
                      border: "1px solid #a18861",
                      boxShadow: "inset 0 0 10px #00000055, 0 4px 8px #00000040",
                    }}
                  >
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-warning">
                        {pengunjung.nama}
                      </h5>
                      <p>
                        <strong>Jenis Kelamin:</strong> {pengunjung.jenis_kelamin}
                      </p>
                      <p>
                        <strong>Asal Instansi:</strong> {pengunjung.asal_instansi}
                      </p>
                      <p>
                        <strong>Jumlah:</strong> {pengunjung.jumlah}
                      </p>
                      <p>
                        <strong>Email:</strong> {pengunjung.email}
                      </p>
                      <div className="d-flex justify-content-between mt-3">
                        <Link
                          to={`/pengunjungs/edit/${pengunjung.id}`}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#6c757d",
                            color: "#fff",
                            borderRadius: "20px",
                          }}
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => deletePengunjung(pengunjung.id)}
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#b23b3b",
                            color: "#fff",
                            borderRadius: "20px",
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-warning fw-semibold">
                  Data Belum Tersedia!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
