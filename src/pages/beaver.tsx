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
        const newLeft = Math.random() * (window.innerWidth - 80); // Ajuste para o tamanho do emoji
        const newTop = Math.random() * (window.innerHeight - 80); // Ajuste para o tamanho do emoji
        setPosition({ left: newLeft, top: newTop });
      }, isMobile ? 200 : 400); // Movimenta mais rápido no celular e no desktop

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
          className="absolute text-4xl"
          style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          🦦
        </button>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-500">🎉 Feliz aniversario! 🎉</h1>
          <p className="text-lg mt-2">Eu te amo muito 🦦❤️!</p>
        </div>
      )}
    </div>
  );
}