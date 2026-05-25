import { useCallback, useState } from 'react';
import { updateUserProfile } from '../services/updateUserProfile';
import { useUserProfile } from '../hooks/useUserProfile';
import './config.css';

export const Config = () => {
  const { user, setUser, isLoading } = useUserProfile();
  const [loadingFields, setLoadingFields] = useState<Record<string, boolean>>({});
  const [fieldStatus, setFieldStatus] = useState<Record<string, string>>({});

  const handleUpdateField = useCallback(
    async (field: string, inputId: string) => {
      const input = document.getElementById(inputId) as HTMLInputElement;
      if (!input) return;

      const value = input.type === 'file'? input.files?.[0] : input.value;

      if (!value || (typeof value === 'string' &&!value.trim())) {
        setFieldStatus(prev => ({...prev, [field]: 'El campo no puede estar vacío' }));
        return;
      }

      setLoadingFields(prev => ({...prev, [field]: true }));
      setFieldStatus(prev => ({...prev, [field]: '' }));

      try {
        const updatedUser = await updateUserProfile(field, value);
        setUser(updatedUser);
        setFieldStatus(prev => ({...prev, [field]: '✓ Actualizado' }));

        if (input.type === 'file') input.value = '';

        setTimeout(() => {
          setFieldStatus(prev => ({...prev, [field]: '' }));
        }, 3000);

      } catch (err) {
        setFieldStatus(prev => ({
        ...prev,
          [field]: err instanceof Error? err.message : 'Error al actualizar'
        }));
      } finally {
        setLoadingFields(prev => ({...prev, [field]: false }));
      }
    },
    [setUser],
  );

  const handleChangePassword = useCallback(async () => {
    const newPassInput = document.getElementById('inputNewPassword') as HTMLInputElement;
    const confirmInput = document.getElementById('inputConfirmPassword') as HTMLInputElement;

    const newPassword = newPassInput.value;
    const confirmPassword = confirmInput.value;

    if (!newPassword ||!confirmPassword) {
      setFieldStatus(prev => ({...prev, password: 'Completá ambos campos' }));
      return;
    }

    if (newPassword!== confirmPassword) {
      setFieldStatus(prev => ({...prev, password: 'Las contraseñas no coinciden' }));
      return;
    }

    setLoadingFields(prev => ({...prev, password: true }));
    setFieldStatus(prev => ({...prev, password: '' }));

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/me/password', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword, confirmPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al cambiar contraseña');
      }

      setFieldStatus(prev => ({...prev, password: '✓ Contraseña actualizada' }));
      newPassInput.value = '';
      confirmInput.value = '';

      setTimeout(() => {
        setFieldStatus(prev => ({...prev, password: '' }));
      }, 3000);

    } catch (err) {
      setFieldStatus(prev => ({
      ...prev,
        password: err instanceof Error? err.message : 'Error al actualizar'
      }));
    } finally {
      setLoadingFields(prev => ({...prev, password: false }));
    }
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    const confirmed = window.confirm('¿Estás seguro? Esta acción no se puede deshacer y perderás todos tus datos.');
    if (!confirmed) return;

    setLoadingFields(prev => ({...prev, delete: true }));
    setFieldStatus(prev => ({...prev, delete: '' }));

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/me', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.status!== 204) {
        const error = await response.json();
        throw new Error(error.message || 'Error al eliminar cuenta');
      }

      window.location.href = '/login';

    } catch (err) {
      setFieldStatus(prev => ({
      ...prev,
        delete: err instanceof Error? err.message : 'Error al eliminar'
      }));
      setLoadingFields(prev => ({...prev, delete: false }));
    }
  }, []);

  if (isLoading) return <div className="text-center p-5">Cargando perfil...</div>;
  if (!user) return <div className="text-center p-5">No se pudo cargar el perfil</div>;

  return (
    <div className="main-content-content position-relative z-1">
      <div className="container-fluid px-4">
        <div className="row g-0 justify-content-center">
          <div className="col-xl-12 col-lg-10 col-md-12 px-0">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-11 col-12">
                <div className="p-4 p-lg-5">

                  <div className="mb-5">
                    <h3 className="fw-bold fs-3 mb-4 text-white">Datos Personales</h3>

                    <div className="form-group-full mb-4">
                      <label className="form-label fw-bold fs-6 mb-3">Nombre completo</label>
                      <div className="row g-3">
                        <div className="col-lg-6 col-md-6">
                          <div className="input-group input-register-wide">
                            <input
                              type="text"
                              id="inputFirstName"
                              className="form-control form-control-lg input-register"
                              placeholder="Primer nombre"
                              defaultValue={user.first_name}
                            />
                            <button
                              className="btn btn-outline-primary px-3"
                              onClick={() => handleUpdateField('first_name', 'inputFirstName')}
                              disabled={loadingFields.first_name}
                              title="Actualizar"
                            >
                              {loadingFields.first_name? '...' : <i className="bi bi-check-lg fs-5"></i>}
                            </button>
                          </div>
                          <div className="form-text mt-2 small">
                            {fieldStatus.first_name}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-group input-register-wide">
                            <input
                              type="text"
                              id="inputLastName"
                              className="form-control form-control-lg input-register"
                              placeholder="Apellido"
                              defaultValue={user.last_name}
                            />
                            <button
                              className="btn btn-outline-primary px-3"
                              onClick={() => handleUpdateField('last_name', 'inputLastName')}
                              disabled={loadingFields.last_name}
                              title="Actualizar"
                            >
                              {loadingFields.last_name? '...' : <i className="bi bi-check-lg fs-5"></i>}
                            </button>
                          </div>
                          <div className="form-text mt-2 small">
                            {fieldStatus.last_name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group-full mb-4">
                      <label htmlFor="inputDob" className="form-label fw-bold fs-6 mb-3">Fecha de nacimiento</label>
                      <div className="input-group input-register-wide">
                        <input
                          type="date"
                          id="inputDob"
                          className="form-control form-control-lg input-register"
                          defaultValue={user.date_of_birth}
                        />
                        <button
                          className="btn btn-outline-primary px-3"
                          onClick={() => handleUpdateField('date_of_birth', 'inputDob')}
                          disabled={loadingFields.date_of_birth}
                          title="Actualizar"
                        >
                          {loadingFields.date_of_birth? '...' : <i className="bi bi-check-lg fs-5"></i>}
                        </button>
                      </div>
                      <div className="form-text mt-2 small">
                        {fieldStatus.date_of_birth}
                      </div>
                    </div>

                    <div className="form-group-full mb-4">
                      <label htmlFor="inputCountry" className="form-label fw-bold fs-6 mb-3">Nacionalidad</label>
                      <div className="input-group input-register-wide">
                        <select
                          id="inputCountry"
                          className="form-select form-control-lg input-register"
                          defaultValue={user.nationality}
                        >
                          <option value="AR">Argentina</option>
                          <option value="BR">Brasil</option>
                          <option value="UY">Uruguay</option>
                          <option value="CL">Chile</option>
                          <option value="CO">Colombia</option>
                          <option value="MX">México</option>
                        </select>
                        <button
                          className="btn btn-outline-primary px-3"
                          onClick={() => handleUpdateField('nationality', 'inputCountry')}
                          disabled={loadingFields.nationality}
                          title="Actualizar"
                        >
                          {loadingFields.nationality? '...' : <i className="bi bi-check-lg fs-5"></i>}
                        </button>
                      </div>
                      <div className="form-text mt-2 small">
                        {fieldStatus.nationality}
                      </div>
                    </div>

                    <div className="form-group-full mb-4">
                      <label htmlFor="inputContact" className="form-label fw-bold fs-6 mb-3">Número telefónico</label>
                      <div className="input-group input-register-wide">
                        <input
                          type="text"
                          id="inputContact"
                          className="form-control form-control-lg input-register"
                          placeholder="+54 9 299 123-4567"
                          defaultValue={user.phone_number || ''}
                        />
                        <button
                          className="btn btn-outline-primary px-3"
                          onClick={() => handleUpdateField('phone_number', 'inputContact')}
                          disabled={loadingFields.phone_number}
                          title="Actualizar"
                        >
                          {loadingFields.phone_number? '...' : <i className="bi bi-check-lg fs-5"></i>}
                        </button>
                      </div>
                      <div className="form-text mt-2 small">
                        {fieldStatus.phone_number}
                      </div>
                    </div>

                    <div className="form-group-full mb-4">
                      <label htmlFor="inputPhoto" className="form-label fw-bold fs-6 mb-3">Foto de perfil</label>
                      <div className="input-group input-register-wide">
                        <input
                          type="file"
                          id="inputPhoto"
                          className="form-control form-control-lg input-register"
                          accept="image/*"
                        />
                        <button
                          className="btn btn-outline-primary px-3"
                          onClick={() => handleUpdateField('profile_picture', 'inputPhoto')}
                          disabled={loadingFields.profile_picture}
                          title="Actualizar"
                        >
                          {loadingFields.profile_picture? '...' : <i className="bi bi-check-lg fs-5"></i>}
                        </button>
                      </div>
                      <div className="form-text mt-2 small">
                        {fieldStatus.profile_picture}
                      </div>
                    </div>
                  </div>

                  {/* CAMBIAR CONTRASEÑA */}
                  <div className="mb-5">
                    <hr className="my-4" />
                    <h3 className="fw-bold fs-3 mb-4 text-white">Cambiar Contraseña</h3>

                    <div className="form-group-full mb-4">
                      <label className="form-label fw-bold fs-6 mb-3">Nueva contraseña</label>
                      <div className="row g-3">
                        <div className="col-lg-6 col-md-6">
                          <input
                            type="password"
                            id="inputNewPassword"
                            className="form-control form-control-lg input-register"
                            placeholder="Contraseña"
                            minLength={8}
                            maxLength={12}
                          />
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-group input-register-wide">
                            <input
                              type="password"
                              id="inputConfirmPassword"
                              className="form-control form-control-lg input-register"
                              placeholder="Confirmar"
                              minLength={8}
                              maxLength={12}
                            />
                            <button
                              className="btn btn-outline-primary px-3"
                              onClick={() => handleChangePassword()}
                              disabled={loadingFields.password}
                              title="Actualizar"
                            >
                              {loadingFields.password? '...' : <i className="bi bi-check-lg fs-5"></i>}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="form-text mt-2 small text-white-50">
                        <i className="bi bi-info-circle"></i> Mínimo 8 caracteres: mayúsculas, números y símbolos especiales
                      </div>
                      <div className="form-text mt-1 small">
                        {fieldStatus.password}
                      </div>
                    </div>
                  </div>

                  {/* ELIMINAR CUENTA */}
                  <div className="mb-5">
                    <hr className="my-4" />
                    <h3 className="fw-bold fs-3 mb-4 text-white">Eliminar Cuenta</h3>

                    <div className="form-group-full mb-4">
                      <div className="row g-3">
                        <div className="col-lg-8 col-md-8">
                          <p className="text-white-50">Esta acción es permanente y no se puede deshacer. Se eliminarán todos tus datos.</p>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <button
                            className="btn btn-danger btn-lg w-100"
                            onClick={() => handleDeleteAccount()}
                            disabled={loadingFields.delete}
                          >
                            {loadingFields.delete? 'Eliminando...' : 'Eliminar Cuenta'}
                          </button>
                        </div>
                      </div>
                      <div className="form-text mt-2 small">
                        {fieldStatus.delete}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};