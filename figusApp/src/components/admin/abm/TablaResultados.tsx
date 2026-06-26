import React from 'react';
import { resolveImageUrl } from '../../../utils/resolveImageUrl'; 
import './tablaResultados.css';

interface Props {
  data: object | object[] | null;
}

export const TablaResultados: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const items = Array.isArray(data) ? data : [data];
  if (items.length === 0) return null;

  const keys = Array.from(new Set(items.flatMap(Object.keys)));

  const esCampoImagen = (key: string) => 
    key.toLowerCase().includes('image') || key.toLowerCase().includes('cover');

  const renderCell = (key: string, val: unknown) => {
    if (esCampoImagen(key) && typeof val === 'string') {
      return (
        <img 
          src={resolveImageUrl(val, 'store')} 
          alt="Preview" 
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
        />
      );
    }

    if (typeof val === 'object' && val !== null) {
      return <pre style={{ fontSize: '10px', margin: 0 }}>{JSON.stringify(val, null, 1)}</pre>;
    }

    return String(val ?? '');
  };

  return (
    <div className="table-responsive mt-3">
      <table className="table table-dark table-striped table-bordered align-middle">
        <thead>
          <tr className="text-white">
            {keys.map((key) => <th key={key}>{key.toUpperCase()}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              {keys.map((key) => (
                <td key={key}>
                  {renderCell(key, (item as Record<string, unknown>)[key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};