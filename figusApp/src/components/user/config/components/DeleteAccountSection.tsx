import type { DeleteAccountSectionProps } from '../types/props/DeleteAccountSectionProps';

/**
 * Sección responsable de la eliminación de la cuenta del usuario.
 * Incluye confirmación implícita y feedback de estado.
 */
export const DeleteAccountSection = ({
  removeAccount,
  loading,
  status,
}: DeleteAccountSectionProps) => {
  return (
    <section className="config-section">
      <h3 className="config-section-title">
        Eliminar cuenta
      </h3>

      <div className="row g-3 align-items-end">
        <div className="col-12 col-lg-8">
          <p className="config-note mb-0">
            Esta acción es permanente y no se puede deshacer.
          </p>
        </div>

        <div className="col-12 col-lg-4">
          <button
            className="btn btn-danger w-100 config-delete-btn"
            type="button"
            disabled={loading}
            onClick={removeAccount}
          >
            {loading ? 'Eliminando...' : 'Eliminar cuenta'}
          </button>
        </div>
      </div>

      {status ? (
        <div className="config-status mt-3">
          {status}
        </div>
      ) : null}
    </section>
  );
};