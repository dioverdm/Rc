import React, { useState, useEffect } from 'react';
import InstallPWA from '../common/appInstall'; // Asegúrate de que la ruta sea correcta

function InstallSection() {
  const [showInstallSection, setShowInstallSection] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Función para verificar si la PWA ya está instalada
  const isAppInstalled = () => {
    return (
      window.matchMedia('(display-mode: standalone)').matches || // Verifica el modo standalone
      window.navigator.standalone === true || // Para iOS
      document.referrer.includes('android-app://') // Para Android
    );
  };

  useEffect(() => {
    // Si la PWA ya está instalada, no mostramos la sección
    if (isAppInstalled()) {
      console.log('La PWA ya está instalada');
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      console.log('Evento beforeinstallprompt capturado en InstallSection'); // Verifica en la consola
      setDeferredPrompt(e);
      setShowInstallSection(true); // Mostrar la sección si el navegador es compatible
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA instalada');
        } else {
          console.log('Instalación de PWA rechazada');
        }
        setDeferredPrompt(null);
        setShowInstallSection(false); // Ocultar la sección después de la instalación
      });
    }
  };

  return (
    <>
      {showInstallSection && (
        <div className="install_section" style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f5f5f5', margin: '20px 0' }}>
          <h2>¡Instala nuestra aplicación!</h2>
          <p>Disfruta de una experiencia más rápida y accede a nuestras funciones sin conexión.</p>
          <InstallPWA deferredPrompt={deferredPrompt} onInstallClick={handleInstallClick} />
        </div>
      )}
    </>
  );
}

export default InstallSection;