import { useState } from 'react';
import type { SubmitEvent } from 'react';
import '../../../register/register.css';
import '../abm.css';
import {
  getUserById,
  getUsers,
} from '../services/usersService';
import { TablaResultados } from '../TablaResultados';

const adminLogo = new URL('../../../../assets/img/icons/logo.png', import.meta.url).href;

export const ListarUsuarios = () => {
  const [limiteUsuarios, setLimiteUsuarios] = useState<number>(5);
  const [datosParaTabla, setDatosParaTabla] = useState<object | object[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const limpiarRelacionesUsuario = (usuario: any) => {
    if (!usuario) return null;
    const { 
      id, first_name, last_name, date_of_birth, 
      nationality, email, phone_number, role, profile_picture 
    } = usuario;
    return { id, first_name, last_name, date_of_birth, nationality, email, phone_number, role, profile_picture };
  };

  const procesarDatos = (data: any) => {
    if (Array.isArray(data)) {
      return data.map(limpiarRelacionesUsuario).filter(Boolean);
    }
    return limpiarRelacionesUsuario(data);
  };

  const handleBuscarUsuario = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const id = Number(formData.get('id'));

      const data = await getUserById(id);
      setDatosParaTabla(procesarDatos(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al buscar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleListarUsuarios = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const data = await getUsers(limiteUsuarios);
      setDatosParaTabla(procesarDatos(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar usuarios');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img src={adminLogo} alt="FigusApp" className="register-logo abm-logo img-fluid" />
        <h2 className="register-title abm-title mb-0">Listar Usuarios</h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Buscar usuario por ID</h3>
          </div>
          <form onSubmit={handleBuscarUsuario} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputId" className="form-label">ID del usuario</label>
                <input type="number" id="inputId" name="id" min={1} required defaultValue={1} className="form-control register-input abm-input" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar usuario'}
              </button>
            </div>
          </form>
        </section>

        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Listar todos los usuarios</h3>
          </div>
          <form onSubmit={handleListarUsuarios} className="abm-form">
            <div className="row g-3">
              <div className="col-12 abm-field">
                <label htmlFor="inputLimite" className="form-label">
                  Límite: <strong className="abm-range-value">{limiteUsuarios}</strong>
                </label>
                <input type="range" id="inputLimite" name="limite_usuarios" min={1} max={15} value={limiteUsuarios} onChange={(e) => setLimiteUsuarios(Number(e.target.value))} className="form-range abm-range" />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button type="submit" className="btn register-btn abm-btn w-100" disabled={loading}>
                {loading ? 'Listando...' : 'Listar usuarios'}
              </button>
            </div>
          </form>
        </section>

        {datosParaTabla && <TablaResultados data={datosParaTabla} />}

        {error && <div className="text-danger mt-3 text-center fw-bold">{error}</div>}
      </div>
    </section>
  );
};