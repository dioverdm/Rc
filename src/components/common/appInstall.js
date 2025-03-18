import React from 'react';

function InstallPWA({ deferredPrompt, onInstallClick }) {
  return (
    <div>
      <button onClick={onInstallClick} className="btn">Instalar la aplicación</button>
    </div>
  );
}

export default InstallPWA;