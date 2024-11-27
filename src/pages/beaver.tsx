import { useState, useEffect } from "react";

export default function Home() {
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se o dispositivo é móvel
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iphone|ipad|mobile/i.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  // Função para movimentar o botão
  useEffect(() => {
    if (!clicked) {
      const interval = setInterval(() => {
        const newLeft = Math.random() * (window.innerWidth - 120);
        const newTop = Math.random() * (window.innerHeight - 60);
        setPosition({ left: newLeft, top: newTop });
      }, isMobile ? 500 : 1000); // Movimenta mais rápido no celular

      return () => clearInterval(interval);
    }
  }, [clicked, isMobile]);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {!clicked ? (
        <button
          onClick={handleClick}
          className="absolute px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded transition-all"
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
          }}
        >
          Botão Secreto! Não clique!
        </button>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-500">🎉 Parabéns! 🎉</h1>
          <p className="text-lg mt-2">Você conseguiu clicar no botão secreto!</p>
        </div>
      )}
    </div>
  );
}