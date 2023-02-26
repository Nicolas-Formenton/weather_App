import { useState, useEffect } from 'react';
import splashScreen from './style/splashScreen.css'
import Loading from './loading.jsx'

function SplashScreen() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    // Simule um atraso de 3 segundos para a exibição da tela de carregamento
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 2000);
  }, []);

  if (showSplashScreen) {
    return (
      <div className="splash-screen">
        <Loading />
      </div>
    );
  }

  // Retorna `null` para não exibir a tela de carregamento depois de concluído
  return null;
}

export default SplashScreen;