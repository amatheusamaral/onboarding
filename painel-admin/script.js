function getTemas() {
    return JSON.parse(localStorage.getItem("temas")) || [];
  }
  
  function salvarTemas(temas) {
    localStorage.setItem("temas", JSON.stringify(temas));
    atualizarSelect();
  }
  
  // Criar novo tema
  function criarTema() {
    const nome = document.getElementById("tema-nome").value;
    const descricao = document.getElementById("tema-descricao").value;
  
    if (!nome || !descricao) return alert("Preencha os campos!");
  
    const temas = getTemas();
    temas.push({ nome, descricao, modulos: [] });
    salvarTemas(temas);
  
    document.getElementById("tema-nome").value = "";
    document.getElementById("tema-descricao").value = "";
  }
  
  // Atualizar select com temas existentes
  function atualizarSelect() {
    const select = document.getElementById("tema-select");
    const temas = getTemas();
    select.innerHTML = "";
    temas.forEach((tema, index) => {
      const opt = document.createElement("option");
      opt.value = index;
      opt.textContent = tema.nome;
      select.appendChild(opt);
    });
  }
  
  // Adicionar módulo e aulas
  function adicionarModulo() {
    const temas = getTemas();
    const index = document.getElementById("tema-select").value;
    const modulo = document.getElementById("modulo-nome").value;
    const aulas = document.getElementById("aulas").value.split(",").map(a => a.trim());
  
    if (!modulo || aulas.length === 0) return alert("Preencha os campos!");
  
    temas[index].modulos.push({ titulo: modulo, aulas });
    salvarTemas(temas);
  
    document.getElementById("modulo-nome").value = "";
    document.getElementById("aulas").value = "";
  }
  
  atualizarSelect();
  