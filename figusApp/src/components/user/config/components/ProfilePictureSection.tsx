import type { RefObject } from 'react';

import type { FieldStatusMap } from '../types/maps/FieldStatusMap';
import type { LoadingMap } from '../types/maps/LoadingMap';

type Props = {
  profilePictureRef: RefObject<HTMLInputElement | null>;
  handleProfilePictureUpdate: () => Promise<void>;
  fieldStatus: FieldStatusMap;
  loadingFields: LoadingMap;
};

export const ProfilePictureSection = ({
  profilePictureRef,
  handleProfilePictureUpdate,
  fieldStatus,
  loadingFields,
}: Props) => {
  return (
    <div className="profile-picture-section">
      <label className="form-label">Foto de perfil</label>

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

      {fieldStatus.profile_picture ? (
        <div className="config-status">
          {fieldStatus.profile_picture}
        </div>
      ) : null}
    </div>
  );
};