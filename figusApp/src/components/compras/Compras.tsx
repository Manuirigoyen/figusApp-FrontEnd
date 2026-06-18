import { useState, useMemo } from 'react';
import './compras.css';

interface Compra {
  id: number;
  item: string;
  qty: number;
  total: number;
  date: string;
  tipo: string;
}

export const Compras: React.FC = () => {
  const [compras] = useState<Compra[]>([
    { id: 1, item: 'Combo Inicial', qty: 1, total: 4200.00, date: '2026-06-10 14:30', tipo: 'combo' },
    { id: 2, item: 'Sobre Dorado', qty: 2, total: 10000.00, date: '2026-06-08 09:15', tipo: 'unidad' },
    { id: 3, item: 'Giro Individual', qty: 5, total: 2500.00, date: '2026-06-05 18:45', tipo: 'spin' },
  ]);

  const [filtroTipo, setFiltroTipo] = useState('');

  const comprasFiltradas = useMemo(() => {
    return filtroTipo ? compras.filter(c => c.tipo === filtroTipo) : compras;
  }, [compras, filtroTipo]);

  return (
    <main id="mainContent" className="main-wrapper position-relative">
      <div className="login-overlay" />
      
      <section className="login-shell container py-4 py-md-5">
        <div className="login-card shadow-lg">
          <div className="login-header text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              fill="currentColor" 
              className="bi bi-cart4 mb-3" 
              viewBox="0 0 16 16"
              style={{ color: '#4ebd2a' }}
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
            </svg>

            <h1 className="login-title">Historial de Compras</h1>
            <p className="login-subtitle">Gestioná y filtrá tus transacciones.</p>
          </div>

          <div className="row g-2 mb-4 justify-content-center">
            <div className="col-12 col-md-6">
              <select 
                className="form-select login-input" 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                <option value="unidad">Sobres (Unidad)</option>
                <option value="combo">Combos</option>
                <option value="spin">Giros Ruleta</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr className="text-secondary">
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total (USD)</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {comprasFiltradas.map((compra) => (
                  <tr key={compra.id}>
                    <td className="fw-bold">{compra.item}</td>
                    <td>{compra.qty}</td>
                    <td className="text-success fw-bold">${compra.total.toFixed(2)}</td>
                    <td>{compra.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};