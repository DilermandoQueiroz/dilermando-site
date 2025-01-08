import { useState, useEffect, useRef } from "react";

const HomePage = () => {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [tempoDecorrido, setTempoDecorrido] = useState('');

  // Data inicial para começar a contagem
  const dataInicial = new Date('2025-01-06T20:49:30.953Z'); // Data do namoro

  // Função para calcular a diferença entre as datas em anos, meses, dias, horas, minutos e segundos
  const calcularTempoDecorrido = (dataInicial: Date) => {
    const agora = new Date();
    const diferença = agora.getTime() - dataInicial.getTime(); // Diferença em milissegundos

    // Calculando anos, meses e dias
    const anos = Math.floor(diferença / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diferença % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diferença % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

    // Calculando horas, minutos e segundos
    const horas = Math.floor((diferença % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferença % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferença % (1000 * 60)) / 1000);

    // Condicionando a exibição
    let tempo = '';

    if (anos > 0) tempo += `${anos} ano(s) `;
    if (meses > 0) tempo += `${meses} mês(es) `;
    if (dias > 0) tempo += `${dias} dia(s) `;
    tempo += `${horas}h ${minutos}m ${segundos}s`;

    return tempo;
  };

  useEffect(() => {
    if (autenticado) {
      const intervalo = setInterval(() => {
        const tempo = calcularTempoDecorrido(dataInicial);
        setTempoDecorrido(tempo);
      }, 1000);

      return () => clearInterval(intervalo); // Limpa o intervalo quando o componente for desmontado
    }
  }, [autenticado]);

  const [rocketPosition, setRocketPosition] = useState({ x: 300, y: 400 });
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateGame = () => {
      setRocketPosition((prev) => {
        let { x, y } = prev;
        if (keysPressed.current["w"]) y = Math.max(y - 5, 0);
        if (keysPressed.current["s"]) y = Math.min(y + 5, window.innerHeight - 100);
        if (keysPressed.current["a"]) x = Math.max(x - 5, 0);
        if (keysPressed.current["d"]) x = Math.min(x + 5, window.innerWidth - 100);
        return { x, y };
      });

      animationFrame.current = requestAnimationFrame(updateGame);
    };

    animationFrame.current = requestAnimationFrame(updateGame);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      keysPressed.current[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event: { key: string }) => {
      keysPressed.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (senha === '11.05') {
      setAutenticado(true); // Usuário autenticado, exibe a contagem
    } else {
      setErro('Senha incorreta!');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {!autenticado ? (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </form>
          {erro && <p className="text-red-600 text-center mt-2">{erro}</p>}
        </>
      ) : (
        <>
          <div>
            <span className="text-3xl">{tempoDecorrido}</span>
            <div
              className="absolute text-7xl"
              style={{
                left: `${rocketPosition.x}px`,
                top: `${rocketPosition.y}px`,
              }}
            >
              🚀
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;