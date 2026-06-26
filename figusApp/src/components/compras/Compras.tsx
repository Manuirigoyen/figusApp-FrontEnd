import { useState, useEffect, useMemo } from 'react';
import { purchasesService, type PurchaseResponse } from './services/purchasesService';
import { useAuth } from '../../routes/hooks/useAuth';
import './compras.css';

/**
 * Componente que muestra el historial de transacciones de un usuario.
 * Estructura de nodos idéntica a Config para una transición visual fluida.
 */
export const Compras: React.FC = () => {
  const { user } = useAuth();
  const [compras, setCompras] = useState<PurchaseResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>('');

  useEffect(() => {
    if (!user?.id) return;

    const cargarHistorial = async () => {
      try {
        setIsLoading(true);
        const data = await purchasesService.obtenerComprasPorUsuario(user.id);
        setCompras(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'No se pudo cargar el historial.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarHistorial();
  }, [user?.id]);

  const comprasFiltradas = useMemo(() => {
    if (!filtroTipo) return compras;
    return compras.filter(c => c.store?.product_type === filtroTipo);
  }, [compras, filtroTipo]);

  const formatearFecha = (fechaStr: string): string => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calcularCostoFinal = (compra: PurchaseResponse): number => {
    const total = Number(compra.total_usd);
    const descuento = Number(compra.discount_usd);
    return total - descuento;
  };

  if (isLoading) {
    return (
      <div className="text-center p-5">
        Cargando historial de compras...
      </div>
    );
  }

  return (
    <section className="config-shell">
      <div className="register-card shadow-lg config-card">
        <header className="register-header text-center">
          <div className="config-logo d-inline-block img-fluid fs-1 mb-2">
            🛒
          </div>

          <h1 className="register-title mb-2">
            Historial de Compras
          </h1>

          <p className="register-subtitle">
            Gestioná y filtrá tus transacciones.
          </p>
        </header>

        <div className="register-body">
          <div className="row g-2 mb-4 justify-content-center">
            <div className="col-12 col-md-6">
              <select 
                className="form-select config-input" 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)}
                disabled={!!error}
              >
                <option value="">Todas las categorías</option>
                <option value="unidad">Sobres</option>
                <option value="pack">Packs</option>
                <option value="combo">Combos</option>
                <option value="spin">Giros Ruleta</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="text-center py-4 text-danger fw-bold">
              {error}
            </div>
          )}

          {!error && comprasFiltradas.length === 0 && (
            <div className="text-center py-5 text-muted">
              No se encontraron registros de compra disponibles.
            </div>
          )}

          {!error && comprasFiltradas.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr className="text-secondary">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Total (ARS)</th>
                    <th>Fecha y hora</th>
                  </tr>
                </thead>
                <tbody>
                  {comprasFiltradas.map((compra) => (
                    <tr key={compra.id}>
                      <td className="fw-bold">
                        {compra.store?.name ?? `Producto #${compra.store_id}`}
                      </td>
                      <td>{compra.quantity}</td>
                      <td className="text-success fw-bold">
                        ${calcularCostoFinal(compra).toFixed(2)}
                      </td>
                      <td>{formatearFecha(compra.purchased_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};