import type { ConfigFieldProps } from '../types/props/ConfigFieldProps';

/**
 * Contenedor genérico para un campo de configuración.
 *
 * Encapsula:
 * - label asociado al input
 * - contenido del campo (input, select, etc.)
 * - estado visual del campo (error, éxito, feedback)
 *
 * Se utiliza como wrapper estándar en formularios de perfil.
 */
export const ConfigField = ({
  id,
  label,
  children,
  status,
}: ConfigFieldProps) => {
  return (
    <div className="col-12 col-md-6">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      {children}

      {status ? (
        <div className="config-status">{status}</div>
      ) : null}
    </div>
  );
};