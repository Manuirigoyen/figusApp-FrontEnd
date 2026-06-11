import { useMemo } from 'react';
import { COUNTRIES } from '../../../../constants/countries';

import type { PersonalDataSectionProps } from '../types/props/PersonalDataSectionProps';
import type { ConfigDataField } from '../types/ConfigDataField';

export const PersonalDataSection = ({
  user,
  setUser,
  updateField,
  loadingFields,
  fieldStatus,
  profilePictureSection,
}: PersonalDataSectionProps) => {
  const today = new Date().toISOString().split('T')[0];

  const fields = useMemo(
    () =>
      [
        { key: 'first_name', label: 'Nombre', type: 'text' },
        { key: 'last_name', label: 'Apellido', type: 'text' },
        { key: 'date_of_birth', label: 'Fecha de nacimiento', type: 'date' },
        { key: 'nationality', label: 'Nacionalidad', type: 'select' },
        { key: 'email', label: 'Correo electrónico', type: 'email' },
      ] as const,
    [],
  );

  return (
    <section className="config-section">
      <h3 className="config-section-title">Datos personales</h3>

      <div className="row g-3 align-items-start">
        {fields.map((field) => {
          const key = field.key as ConfigDataField;

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
                ) : (
                  <input
                    type={field.type}
                    className="form-control register-input config-input"
                    value={String(user[key as keyof typeof user] ?? '')}
                    max={field.key === 'date_of_birth' ? today : undefined}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                )}

                <button
                  type="button"
                  className="btn register-btn config-action-btn"
                  disabled={loadingFields[key]}
                  onClick={() => {
                    const value = String(user[key as keyof typeof user] ?? '');
                    void updateField(key, value);
                  }}
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

        <div className="col-12 col-md-6">
          {profilePictureSection}
        </div>
      </div>
    </section>
  );
};