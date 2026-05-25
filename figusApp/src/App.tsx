import { Routes, Route } from 'react-router-dom';

import { Header } from './components/home/Header';
import { Home } from './components/home/Home';
import { Footer } from './components/home/Footer';

import { Login }  from './components/login/Login'; 
import { Register }  from './components/register/Register';

import { Err_404 }  from './components/error/Err_404'; 
import { User }  from './components/user/user';
/* 
import { Ruleta } from './components/rulet/Ruleta';
import { Intercambios }  from './components/intercambios/Intercambios'; 
import { Tienda } from './components/tienda/Tienda'; 



import Album  from './components/album/Album';
import Billetera from './components/billetera/Billetera';
*/


import { Admin } from './components/admin/Admin';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user" element={<User/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="*" element={<Err_404/>}/>
     
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;