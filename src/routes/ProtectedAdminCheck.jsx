import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedAdminCheck = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [isAuthorized, setIsAuthorized] = useState(false); // State untuk otorisasi

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("is_administrator") === "1";

    // Simulasikan loading selama 2 detik
    setTimeout(() => {
      if (!token) {
        // Jika token tidak ada
        Swal.fire({
          title: "Akses Ditolak!",
          text: "Anda belum login. Silakan login terlebih dahulu.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setIsAuthorized(false);
          setIsLoading(false);
        });
      } else if (!isAdmin) {
        // Jika bukan admin
        Swal.fire({
          title: "Akses Ditolak!",
          text: "Anda tidak memiliki izin untuk mengakses halaman ini.",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setIsAuthorized(false);
          setIsLoading(false);
        });
      } else {
        // Jika admin
        Swal.fire({
          title: "Selamat Datang Admin!",
          text: "Anda berhasil masuk ke halaman admin.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setIsAuthorized(true);
          setIsLoading(false);
        });
      }
    }, 2000); // Durasi loading 2 detik
  }, []);

  if (isLoading) {
    // Menampilkan loading selama proses otorisasi
    Swal.fire({
      title: "Sistem sedang memeriksa izin masuk halaman ini",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    return null; // Tidak render apapun selama loading
  }

  if (!isAuthorized) {
    // Jika tidak diizinkan, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika diizinkan, render komponen anak
  return children;
};

export default ProtectedAdminCheck;
