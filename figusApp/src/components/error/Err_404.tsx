import './error.css';

import error404 from '../../assets/img/error/error404.png';

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