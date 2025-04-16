import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import views
import Home from '../views/home.jsx';

import PostIndex from '../views/posts/index.jsx';
import PostCreate from '../views/posts/create.jsx';
import PostDetail from '../views/posts/detail.jsx';
import PostEdit from '../views/posts/edit.jsx';

import Register from '../views/auth/Register.jsx';
import Login from '../views/auth/Login.jsx';
import NotAuthorized from '../views/auth/notauthorized.jsx';

import Dashboard from '../views/auth/Dashboard.jsx';

import PengunjungCreate from '../views/pengunjungs/create.jsx';
import PengunjungDetail from '../views/pengunjungs/detail.jsx';
import PengunjungEdit from '../views/pengunjungs/edit.jsx';
import PengunjungIndex from '../views/pengunjungs/index.jsx';

import KunjunganCreate from '../views/kunjungans/create.jsx';
import KunjunganDetail from '../views/kunjungans/detail.jsx';
import KunjunganEdit from '../views/kunjungans/edit.jsx';
import KunjunganIndex from '../views/kunjungans/index.jsx';

import PengumumanCreate from "../views/pengumumans/create.jsx";
import PengumumanDetail from "../views/pengumumans/detail.jsx";
import PengumumanEdit from "../views/pengumumans/edit.jsx";
import PengumumanIndex from "../views/pengumumans/index.jsx";

import DokumentasiCreate from "../views/dokumentasis/create.jsx";
import DokumentasiDetail from "../views/dokumentasis/detail.jsx";
import DokumentasiEdit from "../views/dokumentasis/edit.jsx";
import DokumentasiIndex from "../views/dokumentasis/index.jsx";

import ProtectedRoute from './ProtectedRoute.jsx';
import ProtectedAdminCheck from './ProtectedAdminCheck.jsx'; // Import ProtectedAdminCheck
import PetugasCreate from "../views/petugas/create.jsx";
import PetugasEdit from "../views/petugas/edit.jsx";
import PetugasIndex from "../views/petugas/index.jsx";

function RoutesIndex() {
    return (
        <Routes>
            {/* Route for Home */}
            <Route path="/" element={<Home />} />

            {/* Routes for Posts */}
            <Route path="/posts" element={<ProtectedRoute><PostIndex /></ProtectedRoute>} />
            <Route path="/posts/create" element={<ProtectedRoute><PostCreate /></ProtectedRoute>} />
            <Route path="/posts/detail/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
            <Route path="/posts/edit/:id" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />

            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notauthorized/" element={<NotAuthorized />} />
            <Route path="/dashboard" element={<Dashboard />} />

             {/* Routes for Siswas */}
             <Route path="/pengunjungs/create" element={<ProtectedRoute><PengunjungCreate /></ProtectedRoute>} />
            <Route path="/pengunjungs/edit/:id" element={<ProtectedRoute><PengunjungEdit /></ProtectedRoute>} />
            <Route path="/pengunjungs/detail/:id" element={<ProtectedRoute><PengunjungDetail /></ProtectedRoute>} />
            <Route path="/pengunjungs" element={<ProtectedRoute><PengunjungIndex /></ProtectedRoute>} />

            {/* Routes for Produks */}
            <Route path="/kunjungans/create" element={<ProtectedRoute><KunjunganCreate /></ProtectedRoute>} />
            <Route path="/kunjungans/edit/:id" element={<ProtectedRoute><KunjunganEdit /></ProtectedRoute>} />
            <Route path="/kunjungans/detail/:id" element={<ProtectedRoute><KunjunganDetail /></ProtectedRoute>} />
            <Route path="/kunjungans" element={<ProtectedRoute><KunjunganIndex /></ProtectedRoute>} />

            {/* Routes for Kategori_barangs */}
            <Route path="/pengumumans/create" element={<ProtectedRoute><PengumumanCreate /></ProtectedRoute>} />
            <Route path="/pengumumans/edit/:id" element={<ProtectedRoute><PengumumanEdit /></ProtectedRoute>} />
            <Route path="/pengumumans/detail/:id" element={<ProtectedRoute><PengumumanDetail /></ProtectedRoute>} />
            <Route path="/pengumumans" element={<ProtectedRoute><PengumumanIndex /></ProtectedRoute>} />

            <Route path="/dokumentasis/create" element={<ProtectedRoute><DokumentasiCreate /></ProtectedRoute>} />
            <Route path="/dokumentasis/edit/:id" element={<ProtectedRoute><DokumentasiEdit /></ProtectedRoute>} />
            <Route path="/dokumentasis/detail/:id" element={<ProtectedRoute><DokumentasiDetail /></ProtectedRoute>} />
            <Route path="/dokumentasis" element={<ProtectedRoute><DokumentasiIndex /></ProtectedRoute>} />



            {/* Routes for Petugas (Only Admin can access) */}
            <Route path="/petugas/create" element={<ProtectedAdminCheck><PetugasCreate /></ProtectedAdminCheck>} />
            <Route path="/petugas/edit/:id" element={<ProtectedAdminCheck><PetugasEdit /></ProtectedAdminCheck>} />
            <Route path="/petugas" element={<ProtectedAdminCheck><PetugasIndex /></ProtectedAdminCheck>} />
        </Routes>
    );
}

export default RoutesIndex;
