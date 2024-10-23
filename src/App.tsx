import React from 'react';
import Home from './Home';

/**
 * Componente principal de la aplicación.
 *
 * Este componente renderiza el componente `Home`, que representa la página inicial de la aplicación.
 *
 * @returns {JSX.Element} El contenido del componente App.
 */
const App: React.FC = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;

