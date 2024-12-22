import { Game } from "@/components/beaver/game";
import { useState, useEffect } from "react";

export default function Home() {
  const [position, setPosition] = useState({ left: 50, top: 50 });
  const [step, setStep] = useState(3);
  const [dateAnswer, setDateAnswer] = useState("");
  const [starCode, setStarCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [starInfo, setStarInfo] = useState(null);

  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(() => {
        setPosition({
          left: Math.random() * (window.innerWidth - 80),
          top: Math.random() * (window.innerHeight - 80),
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleFetch = async (url, options, onSuccess, onError) => {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
      } else {
        const error = await response.text();
        onError(error);
      }
    } catch (error) {
      onError(error.message);
    }
  };

  const fetchStarInfo = () => {
    if (!starCode) {
      setFeedback("Por favor, insira um código de estrela válido.");
      return;
    }
  
    handleFetch(
      `https://api.api-ninjas.com/v1/stars?name=${starCode}`,
      { method: "GET", headers: { "X-Api-Key": "RQOEsW++tV9j7t6gWLcpTA==sZF5F9ovzE8yxIIz" } },
      (data) => {
        if (!data || data.length === 0) {
          setFeedback("Nome da estrela está incorreto. Por favor, tente novamente.");
          return;
        }
  
        const starDetails = data[0];
        setStarInfo(starDetails);
  
        // Salvar as informações da estrela no localStorage
        localStorage.setItem(
          "starInfo",
          JSON.stringify({
            name: starDetails.name,
            magnitude: starDetails.apparent_magnitude,
            constellation: starDetails.constellation,
            distance: starDetails.distance_light_year,
            timestamp: new Date().toISOString(),
          })
        );
        console.log("Informações da estrela salvas no localStorage.");
        console.log(starDetails);
        console.log(new Date().toISOString())
        setStep(5);
      },
      (error) => setFeedback(`Erro ao buscar informações da estrela: ${error}`)
    );
  };


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {step === 0 && (
        <button
          onClick={() => setStep(1)}
          className="absolute text-4xl"
          style={{ left: `${position.left}px`, top: `${position.top}px`, background: "none", border: "none", cursor: "pointer" }}
        >
          🦦
        </button>
      )}
      {step === 1 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Você é a Loris?</h1>
          <button onClick={() => setStep(2)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Sim</button>
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
          <button onClick={() => setStep(dateAnswer === "2024-09-14" ? 3 : 4)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Confirmar</button>
        </div>
      )}
      {step === 3 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Escolha uma estrela 🌟</h1>
          <p className="text-lg mt-2">Insira o nome da estrela que você escolheu:</p>
          <input
            type="text"
            value={starCode}
            onChange={(e) => setStarCode(e.target.value)}
            placeholder="Nome da estrela"
            className="mt-4 p-2 border rounded"
          />
          <button onClick={fetchStarInfo} className="ml-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded">Buscar</button>
          {feedback && <p className="text-sm mt-2">{feedback}</p>}
        </div>
      )}
      {step === 4 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Você não é a Loris! 😡</h1>
        </div>
      )}
      {step === 5 && (
        <div className="text-center">
        <h1 className="text-2xl font-bold">Estamos na Terra 🌍</h1>
        {starInfo && (
          <>
            <p className="text-lg mt-2">
              Vamos viajar para a estrela <strong>{starInfo.name}</strong>!
            </p>
            <div className="mt-4 p-4 bg-white shadow rounded text-left">
              <h2 className="text-xl font-bold">Informações da Estrela:</h2>
              <p><strong>Constelação:</strong> {starInfo.constellation}</p>
              <p><strong>Ascensão Reta:</strong> {starInfo.right_ascension}</p>
              <p><strong>Declinação:</strong> {starInfo.declination}</p>
              <p><strong>Magnitude Aparente:</strong> {starInfo.apparent_magnitude}</p>
              <p><strong>Magnitude Absoluta:</strong> {starInfo.absolute_magnitude}</p>
              <p><strong>Distância (anos-luz):</strong> {starInfo.distance_light_year}</p>
              <p><strong>Classe Espectral:</strong> {starInfo.spectral_class}</p>
            </div>
          </>
        )}
        <p className="mt-4">Você quer viajar comigo para ver essa estrela?</p>
        <div className="mt-4">
          <button onClick={() => setStep(6)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Sim</button>
          <button onClick={() => setStep(7)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">Não</button>
        </div>
      </div>
      )}
      {step === 6 && (
       <div className="text-center">
          <h1 className="text-2xl font-bold">Prepare-se para a jornada! 🚀🌌</h1>
          <p className="text-lg mt-4">
            A distância entre a Terra 🌍 e a estrela <strong>{starInfo.name}</strong> na constelação <strong>{starInfo.constellation}</strong> é de 
            <strong> {starInfo.distance_light_year} anos-luz</strong>! ✨
          </p>
          <p className="mt-2 text-lg font-semibold">
            A magnitude aparente da estrela é de <strong>{starInfo.apparent_magnitude}</strong>! 🌟
          </p>
          <p className="mt-2 text-lg font-semibold">
            🌟 Guarde essa informação, você precisará dela depois! 🔭
          </p>
          <button
            onClick={() => setStep(8)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            🚀
          </button>
        </div>
      )}
      {step === 7 && (
        <div className="text-center">
        <h1 className="text-2xl font-bold">Estamos na Terra 🌍</h1>
        {starInfo && (
          <>
            <p className="text-lg mt-2">
              Vamos viajar para a estrela <strong>{starInfo.name}</strong>!
            </p>
            <div className="mt-4 p-4 bg-white shadow rounded text-left">
              <h2 className="text-xl font-bold">Informações da Estrela:</h2>
              <p><strong>Constelação:</strong> {starInfo.constellation}</p>
              <p><strong>Ascensão Reta:</strong> {starInfo.right_ascension}</p>
              <p><strong>Declinação:</strong> {starInfo.declination}</p>
              <p><strong>Magnitude Aparente:</strong> {starInfo.apparent_magnitude}</p>
              <p><strong>Magnitude Absoluta:</strong> {starInfo.absolute_magnitude}</p>
              <p><strong>Distância (anos-luz):</strong> {starInfo.distance_light_year}</p>
              <p><strong>Classe Espectral:</strong> {starInfo.spectral_class}</p>
            </div>
          </>
        )}
        <p className="mt-4">Você quer viajar comigo para ver essa estrela?</p>
        <div className="mt-4">
          <button onClick={() => setStep(6)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Sim</button>
          <button onClick={() => setStep(6)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Sim</button>
        </div>
      </div>
      )}
      {step === 8 && (
       <Game
        starName={starInfo.name}
        constellation={starInfo.constellation}
        starDistance={starInfo.distance_light_year * 10}
       />
      )}
    </div>
  );
}