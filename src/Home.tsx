import React, { useState, useEffect } from 'react';
import QrScanner from './QrScanner'; 
import './Styles.css'; 
import { saveIdClient } from './Store';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [balance, setBalance] = useState<number | null>(null); 
  const [userId, setUserId] = useState<string | null>(null);

  // Función que maneja lo que sucede cuando se lee un código QR
  const handleQrScan = async (data: string | null) => {
    if (data) {
      console.log('Código QR leído:', data);
      setShowQrScanner(false); // Cierra el escáner después de leer el código
      await handleLogin(); // Verificar al usuario para obtener el balance actualizado
    }
  };

  const handleLogin = async () => {
    console.log('Iniciando sesión con:', { name, phone, email, password });

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true); // Cambiar el estado a "logueado"
        setBalance(data.balance); // Actualiza el balance si la respuesta es exitosa
        setUserId(data.id); // Guardar el ID del usuario

        saveIdClient(data.id);
        sessionStorage.setItem('userData', JSON.stringify({
          name,
          email,
          phone,
          password,
          balance: data.balance,
          userId: data.id,
        }));
      } else {
        alert('Credenciales incorrectas o cliente no encontrado.');
        setBalance(null); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión.');
    }
  };

  const handleRegister = async () => {
    console.log('Registrando usuario con:', { name, phone, email, password });

    try {
      const response = await fetch('http://localhost:5000/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (response.ok) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        setIsRegistering(false); 
      } else {
        alert('Error al registrarse. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error al registrarse:', error);
      alert('Ocurrió un error durante el registro.');
    }
  };

  const toggleQrScanner = () => {
    setShowQrScanner((prev) => !prev);
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      setIsLoggedIn(true);
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phone);
      setPassword(userData.password);
      setBalance(userData.balance);
      setUserId(userData.userId);
    }
  }, []);

  return (
    <div className="container">
      {!isLoggedIn ? ( 
        <>
          {isRegistering ? (
            <>
              <button>Pagina de Registro</button>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Registrar</button>

              <button>¿Ya tienes una cuenta?{' '}
                <span onClick={() => setIsRegistering(false)} style={{ color: 'blue', cursor: 'pointer' }}>
                  Inicia sesión aquí
                </span></button>
            </>
          ) : (
            <>
              <button>Pagina de Inicio de Sesion</button>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Iniciar Sesión</button>
              <button>
                ¿No tienes una cuenta?{' '}
                <span onClick={() => setIsRegistering(true)} style={{ color: 'blue', cursor: 'pointer' }}>
                  Regístrate aquí
                </span></button>
            </>
          )}
        </>
      ) : ( // Muestra el dashboard
        <>
          <div className="info-box" style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            <h1>Bienvenido, {name}</h1>
          </div>
          <div className="info-box" style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            Su saldo es de: ${balance !== null ? balance : 0}
          </div>
          <div className="info-box" style={{ backgroundColor: 'green', color: 'white', padding: '10px' }}>
            Id: {userId !== null ? userId : 0}
          </div>
          <div>
            <button onClick={toggleQrScanner}>
              {showQrScanner ? 'Cerrar Escáner' : 'Escanear QR'}
            </button>
          </div>
          {showQrScanner && <QrScanner onScan={handleQrScan} />} {/* Muestra el escáner solo si se activa */}
        </>
      )}
    </div>
  );
};

export default Home;



