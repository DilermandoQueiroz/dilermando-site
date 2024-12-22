import { useState, useEffect, useRef } from "react";

interface GameProps {
  starName: string;
  constellation: string;
  starDistance: number;
}

export function Game({ starName, constellation, starDistance }: GameProps) {
  const [rocketPosition, setRocketPosition] = useState({ x: 300, y: 400 });
  interface Asteroid {
    id: number;
    x: number;
    y: number;
  }
  
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  interface Decoration {
    id: number;
    x: number;
    y: number;
    type: string;
  }
  
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [distance, setDistance] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isProposal, setIsProposal] = useState(false);
  const [proposalAccepted, setProposalAccepted] = useState<boolean | null>(null);
  const [showStory, setShowStory] = useState(false);
  const [isFreeMode, setIsFreeMode] = useState(false);
  const [showOfficialMessage, setShowOfficialMessage] = useState(false); // Controle da mensagem oficial de namoro
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animationFrame = useRef<number | null>(null);
  const gameAreaRef = useRef(null);
  const [showBlackScreen, setShowBlackScreen] = useState(false);

  const resetGame = () => {
    setRocketPosition({ x: 300, y: 400 });
    setAsteroids([]);
    setDecorations([]);
    setDistance(0);
    setIsGameOver(false);
    setIsWin(false);
    setIsProposal(false);
    setProposalAccepted(null);
    setShowStory(false);
    setIsFreeMode(false);
    setShowOfficialMessage(false);
  };

  useEffect(() => {
    if (isGameOver || isWin || isFreeMode) return;

    const interval = setInterval(() => {
      setAsteroids((prevAsteroids) => [
        ...prevAsteroids,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: -100,
        },
      ]);
    }, 1000); // Adiciona meteoros a cada 1 segundo

    return () => clearInterval(interval); // Limpa intervalo ao desmontar ou mudar condições
  }, [isGameOver, isWin, isFreeMode]);

  useEffect(() => {
    const updateDecorations = () => {
      if (!isFreeMode) return;

      const emojiOptions = [
        "❤️", "✨", "🎉", "🌈", "🦄", "💖", "🌟", "🐶", "🐱", "🌸", "🎂", "🍩", 
        "🐻", "🧸", "🦒", "🍭", "💐", "🐥", "🦋", "🌷", "🍓", "🍬", "🌼", "🌻", 
        "🐰", "🪽", "🌙", "🌹", "🍎", "🐼", "🥰", "💖", "🍩", "🎂", "🐝", "🐚", 
        "🧁", "🌷", "🐦", "🪷", "🍉", "🐴", "🐢"
      ];
      setDecorations((prevDecorations) => [
        ...prevDecorations,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: emojiOptions[Math.floor(Math.random() * emojiOptions.length)],
        },
      ]);
    };

    const interval = setInterval(updateDecorations, 300);
    return () => clearInterval(interval);
  }, [isFreeMode]);

  useEffect(() => {
    const updateGame = () => {
      if (isGameOver) return;

      setRocketPosition((prev) => {
        let { x, y } = prev;
        if (keysPressed.current["w"]) y = Math.max(y - 5, 0);
        if (keysPressed.current["s"]) y = Math.min(y + 5, window.innerHeight - 100);
        if (keysPressed.current["a"]) x = Math.max(x - 5, 0);
        if (keysPressed.current["d"]) x = Math.min(x + 5, window.innerWidth - 100);
        return { x, y };
      });

      if (!isFreeMode) {
        setAsteroids((prevAsteroids) =>
          prevAsteroids
            .map((asteroid) => ({
              ...asteroid,
              y: asteroid.y + 10,
            }))
            .filter((asteroid) => asteroid.y < window.innerHeight)
        );

        setDistance((prev) => {
          if (prev + 1 >= starDistance) {
            setIsWin(true);
            setShowStory(true);
            return starDistance;
          }
          return prev + 0.1;
        });

        asteroids.forEach((asteroid) => {
          if (
            Math.abs(asteroid.x - rocketPosition.x) < 80 &&
            Math.abs(asteroid.y - rocketPosition.y) < 80
          ) {
            setIsGameOver(true);
          }
        });
      }

      animationFrame.current = requestAnimationFrame(updateGame);
    };

    animationFrame.current = requestAnimationFrame(updateGame);
    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isGameOver, isWin, isFreeMode, asteroids]);

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        resetGame();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isGameOver]);

  useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
      keysPressed.current[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event: { key: string; }) => {
      keysPressed.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      ref={gameAreaRef}
      className="relative w-full h-full bg-black overflow-hidden"
      style={{ position: "fixed", top: 0, left: 0 }}
    >
      {isWin && !isFreeMode && showStory && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
        <div className="text-white text-center text-4xl font-bold mb-4 leading-relaxed">
          <p>
            Sob o brilho da estrela{" "}
            <span className="text-yellow-400">{starName}</span>, na constelação{" "}
            <span className="text-yellow-400">{constellation}</span>,
          </p>
          <p>
            viajamos juntos pelo infinito do cosmos, 
          </p>
          <p>
            explorando um universo onde cada momento é mais especial ao seu lado.
          </p>
          <p>
            Aqui, sob a luz das estrelas, quero transformar este instante em algo eterno. 💖
          </p>
        </div>
        <button
          onClick={() => {
            setIsProposal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Continuar
        </button>
      </div>
      )}

      {isProposal && proposalAccepted === null && !showBlackScreen && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <h1 className="text-white text-4xl font-bold">
            Laura Dias de Oliveira e Silva, você aceita namorar comigo? 💕
          </h1>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setProposalAccepted(true);
                setShowOfficialMessage(true);
                setTimeout(() => {
                  setShowOfficialMessage(false);
                  setIsFreeMode(true);
                }, 3000); // Exibe mensagem oficial por 3 segundos
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Sim! 💖
            </button>
            <button
              onClick={() => setShowBlackScreen(true)} // Exibe a tela preta
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Não 😢
            </button>
          </div>
        </div>
      )}

      {showBlackScreen && ( // Renderiza a tela preta com ponto branco
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div
            className="w-4 h-4 bg-white rounded-full"
            style={{ width: "10px", height: "10px" }} // Ajuste do tamanho do ponto branco
          ></div>
        </div>
      )}

      {showOfficialMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <h1 className="text-white text-4xl font-bold">
          🎉 Agora é oficial! A gente tá namorando! 💖✨
          </h1>
        </div>
      )}

      {isFreeMode && (
        <>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
            <h1 className="text-white text-4xl font-bold">
            🎉 Agora é oficial! A gente tá namorando! 💖✨
            </h1>
          </div>
          <div
            className="absolute text-7xl"
            style={{
              left: `${rocketPosition.x}px`,
              top: `${rocketPosition.y}px`,
            }}
          >
            🚀
          </div>
          {decorations.map((decoration) => (
            <div
              key={decoration.id}
              className="absolute text-4xl"
              style={{
                left: `${decoration.x}px`,
                top: `${decoration.y}px`,
              }}
            >
              {decoration.type}
            </div>
          ))}
        </>
      )}

      {!isWin && !isGameOver && !isFreeMode && (
        <>
          <div
            className="absolute text-7xl"
            style={{
              left: `${rocketPosition.x}px`,
              top: `${rocketPosition.y}px`,
            }}
          >
            🚀
          </div>

          {asteroids.map((asteroid) => (
            <div
              key={asteroid.id}
              className="absolute text-6xl text-gray-400"
              style={{
                left: `${asteroid.x}px`,
                top: `${asteroid.y}px`,
              }}
            >
              🪨
            </div>
          ))}
        </>
      )}

      <div className="absolute top-0 left-0 p-4 text-white">
        <p>
          🌌 {starName} na constelação {constellation}
        </p>
        {!isFreeMode && (
          <p>
            Distância: {((distance / starDistance) * 100).toFixed(1)}%
          </p>
        )}
      </div>
    </div>
  );
}