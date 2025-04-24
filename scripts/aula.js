document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const temaIndex = parseInt(params.get('tema'), 10);
    const temas = JSON.parse(localStorage.getItem('temas')) || [];
    const dadosAula = temas[temaIndex] || { nome: '', descricao: '', thumb: '', modulos: [] };
  
    // Preenche título, breadcrumb, resumo e thumbnail
    document.getElementById('page-title').textContent = dadosAula.nome;
    document.getElementById('breadcrumb-title').textContent = dadosAula.nome;
    document.getElementById('resumo-texto').textContent = dadosAula.descricao;
    document.getElementById('video-thumb').src = dadosAula.thumb || 'https://via.placeholder.com/800x450';
  
    // Monta acordeão de módulos → aulas
    const container = document.getElementById('modulos-container');
    container.innerHTML = '';
  
    dadosAula.modulos.forEach((modulo, mIdx) => {
      // Título do módulo
      const h3 = document.createElement('h3');
      h3.textContent = modulo.titulo;
      container.appendChild(h3);
  
      // Lista de aulas
      const ul = document.createElement('ul');
      modulo.aulas.forEach((aula, aIdx) => {
        const li = document.createElement('li');
        li.textContent = aula;
        if (aIdx === 0) li.classList.add('active');
        li.addEventListener('click', () => {
          ul.querySelectorAll('li').forEach(item => item.classList.remove('active'));
          li.classList.add('active');
        });
        ul.appendChild(li);
      });
      container.appendChild(ul);
  
      // Toggle do acordeão
      h3.addEventListener('click', () => {
        ul.classList.toggle('active');
      });
    });
  });
  