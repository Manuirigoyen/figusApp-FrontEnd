import './config.css';

import { usePasswordUpdate } from './hooks/usePasswordUpdate';
import { useProfilePicture } from './hooks/useProfilePicture';
import { useUserConfig } from './hooks/useUserConfig';

import { PersonalDataSection } from './components/PersonalDataSection';
import { PasswordSection } from './components/PasswordSection';
import { ProfilePictureSection } from './components/ProfilePictureSection';
import { DeleteAccountSection } from './components/DeleteAccountSection';

import type { ConfigProps } from './types/props/ConfigProps';

const configLogo = new URL(
  '../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

export const Config = ({ user, setUser }: ConfigProps) => {
  const {
    isLoading,
    updateField,
    removeAccount,
    loadingFields,
    fieldStatus,
  } = useUserConfig();

  const passwordHook = usePasswordUpdate(user.id);

  const profilePictureHook = useProfilePicture({
    user,
    setUser,
  });

  if (isLoading) {
    return (
      <div className="text-center p-5">
        Cargando perfil...
      </div>
    );
  }

  return (
    <section className="config-shell">
      <div className="register-card shadow-lg config-card">

        <header className="register-header text-center">
          <img
            src={configLogo}
            alt="FigusApp"
            className="register-logo config-logo img-fluid"
          />

          <h1 className="register-title mb-2">
            Configuración de usuario
          </h1>

          <p className="register-subtitle mb-0">
            Administrá tus datos personales, seguridad y cuenta.
          </p>
        </header>

        <div className="register-body">
          <PersonalDataSection
            user={user}
            setUser={setUser}
            updateField={updateField}
            loadingFields={loadingFields}
            fieldStatus={fieldStatus}
          />

          <hr className="config-divider" />

          <ProfilePictureSection
            {...profilePictureHook}
          />

          <hr className="config-divider" />

          <PasswordSection
            {...passwordHook}
          />

          <hr className="config-divider" />

          <DeleteAccountSection
            removeAccount={removeAccount}
            loading={loadingFields.delete_account}
            status={fieldStatus.delete_account}
          />
        </div>
      </div>
    </section>
  );
};