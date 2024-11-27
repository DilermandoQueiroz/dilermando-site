import { useState, useEffect } from "react";

export default function Home() {
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const [clicked, setClicked] = useState(false);

  // Função para movimentar o botão constantemente
  useEffect(() => {
    if (!clicked) {
      const interval = setInterval(() => {
        const newLeft = Math.random() * (window.innerWidth - 120); // Subtraímos 120 para o botão não sair da tela
        const newTop = Math.random() * (window.innerHeight - 60); // Subtraímos 60 para o botão não sair da tela
        setPosition({ left: newLeft, top: newTop });
      }, 1000); // Movimenta a cada 1 segundo

      return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }
  }, [clicked]);

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
          <h1 className="text-2xl font-bold text-green-500">🎉 Feliz aniversario! 🎉</h1>
          <p className="text-lg mt-2">Eu te amo muito🦦❤️!</p>
        </div>
      )}
    </div>
  );
}