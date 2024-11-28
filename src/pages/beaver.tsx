import { useState, useEffect } from "react";

export default function Home() {
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const [step, setStep] = useState(1);
  const [dateAnswer, setDateAnswer] = useState("");

  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(() => {
        const newLeft = Math.random() * (window.innerWidth - 80);
        const newTop = Math.random() * (window.innerHeight - 80);
        setPosition({ left: newLeft, top: newTop });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleLorisQuestion = () => {
    setStep(1);
  };

  const handleDateCheck = () => {
    if (dateAnswer === "2024-09-14") {
      setStep(3);
    } else {
      setStep(4);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {step === 0 && (
        <button
          onClick={handleLorisQuestion}
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
      )}
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Você é a Loris?</h1>
          <button
            onClick={() => setStep(2)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sim
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Qual foi a data em que tiramos fotos da lua em Guará usando o telescópio?</h1>
          <input
            type="date"
            value={dateAnswer}
            onChange={(e) => setDateAnswer(e.target.value)}
            className="mt-4 p-2 border rounded"
          />
          <button
            onClick={handleDateCheck}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirmar
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">🎉 Você acertou! 🎉</h1>
          <p className="text-lg mt-2">Aguarde por novas atualizações 🦦❤️!</p>
        </div>
      )}
      {step === 4 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Você não é a loris! 😡</h1>
        </div>
      )}
    </div>
  );
}