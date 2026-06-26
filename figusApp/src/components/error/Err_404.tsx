import './Err_404.css';

import error404 from '../../assets/img/error/error404.png';

/**
 * Err_404 component - Displays 404 Not Found error page
 * @returns React component with 404 error image
 */
export const Err_404 = () => {
  return (
    <main className="error-page">
      <img
        src={error404}
        alt="404 Not Found"
        className="error-image"
      />
    </main>
  );
};