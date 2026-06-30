import { useEffect, useState, useMemo } from 'react';
import { getMyExchangeHistory, type ExchangeOffer } from '../intercambios/services/offersService';
import './ofertas.css';

const STATUS_LABEL: Record<string, string> = {
    pending: 'Pendiente',
    accepted: 'Aceptado',
    rejected: 'Rechazada',
};

const ROLE_LABEL: Record<string, string> = {
    offerer: 'Lo ofrecí yo',
    accepter: 'Lo acepté',
    rejecter: 'Lo rechacé',
};

/**
 * Componente que muestra el historial de intercambios de un usuario.
 * Estructura de nodos idéntica a Config y Compras para una transición visual fluida.
 */
export const Ofertas: React.FC = () => {
    const [offers, setOffers] = useState<ExchangeOffer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filtroEstado, setFiltroEstado] = useState<string>('');

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setError(null);
                setLoading(true);
                const data = await getMyExchangeHistory();
                setOffers(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error al cargar tus intercambios');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOffers();
    }, []);

    const ofertasFiltradas = useMemo(() => {
        if (!filtroEstado) return offers;
        return offers.filter((o) => o.status === filtroEstado);
    }, [offers, filtroEstado]);

    if (loading) {
        return (
            <div className="text-center p-5">
                Cargando historial de intercambios...
            </div>
        );
    }

    return (
        <section className="config-shell">
            <div className="register-card shadow-lg config-card">
                <header className="register-header text-center">
                    <div className="config-logo d-inline-block img-fluid fs-1 mb-2">
                        ⚖️
                    </div>

                    <h1 className="register-title mb-2">
                        Mis Intercambios
                    </h1>

                    <p className="register-subtitle">
                        Gestioná y filtrá tus propuestas de intercambio.
                    </p>
                </header>

                <div className="register-body">
                    <div className="row g-2 mb-4 justify-content-center">
                        <div className="col-12 col-md-6">
                            <select
                                className="form-select config-input"
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                                disabled={!!error}
                            >
                                <option value="">Todos los estados</option>
                                <option value="pending">Pendientes</option>
                                <option value="accepted">Aceptados</option>
                                <option value="rejected">Rechazados</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="text-center py-4 text-danger fw-bold">
                            {error}
                        </div>
                    )}

                    {!error && ofertasFiltradas.length === 0 && (
                        <div className="text-center py-5 text-muted">
                            No se encontraron registros de intercambios disponibles.
                        </div>
                    )}

                    {!error && ofertasFiltradas.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr className="text-secondary">
                                        <th>¿Quién oferta?</th>
                                        <th>Mi rol</th>
                                        <th>Oferta</th>
                                        <th>Demanda</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ofertasFiltradas.map((o) => (
                                        <tr key={o.id}>
                                            <td className="fw-bold">
                                                {o.offererUser.first_name} {o.offererUser.last_name}
                                            </td>
                                            <td>{ROLE_LABEL[o.role ?? ''] ?? '—'}</td>
                                            <td>
                                                {o.offerWallet.sticker.name} <span className="text-muted">x{o.offered_quantity}</span>
                                            </td>
                                            <td>
                                                {o.requestSticker.name} <span className="text-muted">x{o.request_quantity}</span>
                                            </td>
                                            <td>
                                                <span className={`badge status-badge status-${o.status}`}>
                                                    {STATUS_LABEL[o.status] ?? o.status}
                                                </span>
                                            </td>
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

export default Ofertas;