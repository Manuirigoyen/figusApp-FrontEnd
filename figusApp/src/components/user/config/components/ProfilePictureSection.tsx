import type { RefObject } from 'react';

import type { FieldStatusMap } from '../types/maps/FieldStatusMap';
import type { LoadingMap } from '../types/maps/LoadingMap';

/**
 * Props para la sección de actualización de foto de perfil del usuario.
 */
type Props = {
  profilePreview: string | null;
  profilePictureRef: RefObject<HTMLInputElement | null>;
  handleProfilePictureUpdate: () => Promise<void>;
  fieldStatus: FieldStatusMap;
  loadingFields: LoadingMap;
};

export const ProfilePictureSection = ({
  profilePreview,
  profilePictureRef,
  handleProfilePictureUpdate,
  fieldStatus,
  loadingFields,
}: Props) => {
  return (
    <section className="config-section">
      <div className="row g-3">
        <div className="col-12">
          {profilePreview && (
            <div className="mb-3 text-center">
              <img
                src={profilePreview}
                alt="Preview"
                className="config-profile-preview"
              />
            </div>
          )}

          <div className="input-group config-input-group">
            <input
              ref={profilePictureRef}
              type="file"
              id="inputPhoto"
              className="form-control register-input config-input"
              accept="image/png,image/jpeg,image/webp"
            />

            <button
              className="btn register-btn config-action-btn"
              type="button"
              disabled={!!loadingFields.profile_picture}
              onClick={() => {
                void handleProfilePictureUpdate();
              }}
            >
              {loadingFields.profile_picture ? '...' : '✓'}
            </button>
          </div>

          <div className="config-note mt-2">
            PNG, JPG o WEBP. Máximo recomendado: 5MB.
          </div>

          <div className="config-status">
            {fieldStatus.profile_picture}
          </div>
        </div>
      </div>
    </section>
  );
};