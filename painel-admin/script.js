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
  
    // Atualiza os módulos após carregar os temas
    carregarModulos();
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
  
  // Carregar módulos do tema selecionado
  function carregarModulos() {
    const selectTema = document.getElementById("tema-select");
    const temaIndex = selectTema.value;
    const temas = getTemas();
  
    if (temaIndex !== undefined && temaIndex !== "") {
      const modulos = temas[temaIndex].modulos;
      const moduloSelect = document.getElementById("modulo-select");
  
      moduloSelect.innerHTML = ""; // Limpar o select de módulos
  
      modulos.forEach((modulo, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = modulo.titulo;
        moduloSelect.appendChild(opt);
      });
    }
  }
  
  // Editar módulo selecionado
  function editarModulo() {
    const temas = getTemas();
    const temaIndex = document.getElementById("tema-select").value;
    const moduloIndex = document.getElementById("modulo-select").value;
  
    const modulo = temas[temaIndex].modulos[moduloIndex];
  
    if (modulo) {
      document.getElementById("novo-modulo-nome").value = modulo.titulo;
      document.getElementById("novas-aulas").value = modulo.aulas.join(", ");
    }
  }
  
  // Salvar edição de módulo
  function salvarEdicao() {
    const temas = getTemas();
    const temaIndex = document.getElementById("tema-select").value;
    const moduloIndex = document.getElementById("modulo-select").value;
  
    const novoNome = document.getElementById("novo-modulo-nome").value;
    const novasAulas = document.getElementById("novas-aulas").value.split(",").map(a => a.trim());
  
    if (!novoNome || novasAulas.length === 0) return alert("Preencha os campos!");
  
    temas[temaIndex].modulos[moduloIndex] = { titulo: novoNome, aulas: novasAulas };
    salvarTemas(temas);
  
    document.getElementById("novo-modulo-nome").value = "";
    document.getElementById("novas-aulas").value = "";
  }
  
  // Excluir módulo
  function excluirModulo() {
    const temas = getTemas();
    const temaIndex = document.getElementById("tema-select").value;
    const moduloIndex = document.getElementById("modulo-select").value;
  
    if (confirm("Tem certeza que deseja excluir este módulo?")) {
      temas[temaIndex].modulos.splice(moduloIndex, 1);
      salvarTemas(temas);
  
      document.getElementById("novo-modulo-nome").value = "";
      document.getElementById("novas-aulas").value = "";
    }
  }
  
  atualizarSelect();
  