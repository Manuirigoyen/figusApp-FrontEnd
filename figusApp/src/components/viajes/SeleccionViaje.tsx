import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useLocalStorage } from '../album/hooks/useLocalStorage';
import './seleccionViaje.css';

import viajeBrasil from '../../assets/img/icons/seleccionViaje/viajeBrasil.png';
import viajeColombia from '../../assets/img/icons/seleccionViaje/viajeColombia.png';
import viajeMexico from '../../assets/img/icons/seleccionViaje/viajeMexico.png';

function getUserFromToken() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export default function SeleccionViaje() {
  const navigate = useNavigate();
  const tokenUser = getUserFromToken();

  const userEmail = tokenUser?.email || 'tu correo';
  const userId = tokenUser?.sub || tokenUser?.id || tokenUser?.user_id || 'guest';

  const localStorageKey = `selectedTravel_${userId}`;

  const [selectedCountry, setSelectedCountry] = useLocalStorage<string | null>(
    localStorageKey,
    null,
  );

  const [showModal, setShowModal] = useState(false);

  const countries = [
    {
      id: 'brasil',
      label: 'Brasil',
      image: viajeBrasil,
    },
    {
      id: 'colombia',
      label: 'Colombia',
      image: viajeColombia,
    },
    {
      id: 'mexico',
      label: 'México',
      image: viajeMexico,
    },
  ];

  const handleSelect = (countryLabel: string) => {
    if (selectedCountry && selectedCountry !== countryLabel) return;

    if (!selectedCountry) {
      setSelectedCountry(countryLabel);
    }

    setShowModal(true);
  };

  return (
    <div className="seleccion-viaje">
      <h1>Elegí tu destino ✈️</h1>
      <p>Seleccioná un país para recibir más información por correo!</p>

      {selectedCountry && (
        <p className="selected-note">
          Ya elegiste <strong>{selectedCountry}</strong>. No podés cambiar de
          país.
        </p>
      )}

      <div className="countries">
        {countries.map((country) => {
          const isSelected = selectedCountry === country.label;
          const isDisabled = !!selectedCountry && !isSelected;

          return (
            <button
              key={country.id}
              className={`country-card ${country.id} ${
                isSelected ? 'selected' : ''
              }`}
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.12)), url(${country.image})`,
              }}
              disabled={isDisabled}
              onClick={() => handleSelect(country.label)}
              aria-pressed={isSelected}
            >
              <span className="country-label">{country.label}</span>
            </button>
          );
        })}
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver
      </button>

      {showModal && (
        <div className="sv-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="sv-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Información enviada</h3>

            <p>
              Te mandamos un mail a <strong>{userEmail}</strong> con más
              información sobre el viaje a{' '}
              <strong>{selectedCountry}</strong>.
            </p>

            <div className="sv-modal-actions">
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}