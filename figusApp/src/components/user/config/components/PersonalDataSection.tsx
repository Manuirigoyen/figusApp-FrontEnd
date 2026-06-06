import { useMemo } from 'react';
import { COUNTRIES } from '../../../../constants/countries';

import type { PersonalDataSectionProps } from '../types/props/PersonalDataSectionProps';
import type { ConfigDataField } from '../types/ConfigDataField';

/**
 * Sección de datos personales del usuario.
 *
 * Renderiza campos editables (nombre, apellido, fecha de nacimiento, nacionalidad, email y archivo),
 * con actualización individual por campo, estados de carga y feedback por campo.
 */
export const PersonalDataSection = ({
  user,
  setUser,
  updateField,
  loadingFields,
  fieldStatus,
}: PersonalDataSectionProps) => {
  const today = new Date().toISOString().split('T')[0];

  const fields = useMemo(
    () => [
      { key: 'first_name', label: 'Nombre', type: 'text' },
      { key: 'last_name', label: 'Apellido', type: 'text' },
      { key: 'date_of_birth', label: 'Fecha de nacimiento', type: 'date' },
      { key: 'nationality', label: 'Nacionalidad', type: 'select' },
      { key: 'email', label: 'Correo electrónico', type: 'email' },
      { key: 'profile_file', label: 'Foto de perfil', type: 'file' },
    ] as const,
    []
  );

  return (
    <section className="config-section">
      <h3 className="config-section-title">Datos personales</h3>

      <div className="row g-3">
        {fields.map((field) => {
          const key = field.key as ConfigDataField;
          const isFile = field.type === 'file';

          return (
            <div key={field.key} className="col-12 col-md-6">
              <label className="form-label">{field.label}</label>

              <div className="input-group config-input-group">
                {field.type === 'select' ? (
                  <select
                    className="form-select register-input config-input"
                    value={user.nationality}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        nationality: e.target.value,
                      }))
                    }
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                ) : isFile ? (
                  <input
                    type="file"
                    className="form-control register-input config-input"
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        profile_file: e.target.files?.[0] ?? null,
                      }))
                    }
                  />
                ) : (
                  <input
                    type={field.type}
                    className="form-control register-input config-input"
                    value={user[field.key]}
                    max={field.key === 'date_of_birth' ? today : undefined}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                  />
                )}

                <button
                  type="button"
                  className="btn register-btn config-action-btn"
                  disabled={loadingFields[key]}
                  
                >
                  ✓
                </button>
              </div>

              {fieldStatus[key] ? (
                <div className="config-status">{fieldStatus[key]}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};