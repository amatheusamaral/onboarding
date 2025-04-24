const temas = JSON.parse(localStorage.getItem("temas")) || [];
const container = document.getElementById("temas-container");
container.innerHTML = ""; // limpa antes de popular

temas.forEach((tema, index) => {
  const link = document.createElement("a");
  link.href = `aula.html?tema=${index}`;
  link.className = "card";
  link.innerHTML = `<h2>${tema.nome}</h2><p>${tema.descricao}</p>`;
  container.appendChild(link);
});
