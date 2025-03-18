import React, { useState, useEffect } from 'react';
import InstallPWA from '../common/appInstall';

function InstallSection() {
  const [showInstallSection, setShowInstallSection] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('Evento beforeinstallprompt disparado'); // Verifica en la consola
      setShowInstallSection(true); // Mostrar la sección si el navegador es compatible
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <>
      {showInstallSection && (
        <div className="install_section" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', margin: '20px 0' }}>
          <h2>¡Instala nuestra aplicación!</h2>
          <p>Disfruta de una experiencia más rápida y accede a nuestras funciones sin conexión.</p>
          {/* Aquí puedes añadir el botón más tarde */}
        </div>
      )}
    </>
  );
}

export default InstallSection;