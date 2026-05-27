import type { PasswordSectionProps } from '../types/props/PasswordSectionProps';
import type { ConfigDataField } from '../types/ConfigDataField';

/**
 * Sección de actualización de contraseña del usuario.
 */
export const PasswordSection = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  handlePasswordUpdate,
  newPasswordRef,
  confirmPasswordRef,
  fieldStatus,
  loadingFields,
}: PasswordSectionProps) => {
  const field: ConfigDataField = 'password';

  return (
    <section className="config-section">
      <h3 className="config-section-title">
        Cambiar contraseña
      </h3>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <input
            ref={newPasswordRef}
            type="password"
            className="form-control register-input config-input"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-6">
          <div className="input-group config-input-group">
            <input
              ref={confirmPasswordRef}
              type="password"
              className="form-control register-input config-input"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="btn register-btn config-action-btn"
              onClick={handlePasswordUpdate}
              disabled={!!loadingFields[field]}
              type="button"
            >
              ✓
            </button>
          </div>
        </div>
      </div>

      {fieldStatus[field] ? (
        <div className="config-status">
          {fieldStatus[field]}
        </div>
      ) : null}
    </section>
  );
};