import { useEffect, useState } from "react";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [nome, setNome] = useState("");

  const API = "/tarefas"; // substitua pela URL real da API

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setTarefas);
  }, []);

  const adicionar = async () => {
    const resp = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });
    const nova = await resp.json();
    setTarefas([...tarefas, nova]);
    setNome("");
  };

  const remover = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTarefas(tarefas.filter(t => t.id !== id));
  };

  return (
    <div style={{ margin: "40px" }}>
      <h1>Minha Lista de Tarefas</h1>

      <input
        value={nome}
        onChange={e => setNome(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {tarefas.map(t => (
          <li key={t.id}>
            {t.nome}{" "}
            <button onClick={() => remover(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
