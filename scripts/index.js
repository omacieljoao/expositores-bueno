const images = document.querySelectorAll('.carousel-item');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIndex = 0;

function showImage(index) {
  images[currentIndex].classList.remove('active');
  currentIndex = (index + images.length) % images.length;
  images[currentIndex].classList.add('active');
}

if(nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
}

setInterval(() => {
  showImage(currentIndex + 1);
}, 5000);


/* ==========================================================================
   COMPONENTE DE BUSCA (HEADER)
   ========================================================================== */

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchCategoryTop = document.getElementById('search-category');

/**
 * Filtra os produtos baseando-se no texto digitado e na categoria selecionada
 */
function executarBusca() {
    const termo = searchInput.value.toLowerCase().trim();
    const categoria = searchCategoryTop.value;

    // Filtra a partir da sua lista mestra 'produtos'
    listaAtualProdutos = produtos.filter(p => {
        const matchesNome = p.nome.toLowerCase().includes(termo);
        const matchesCategoria = (categoria === "Todos" || p.categoria === categoria);
        return matchesNome && matchesCategoria;
    });

    // Sempre reseta para a página 1 ao realizar uma nova busca
    paginaAtual = 1;

    // Chama a função que redesenha a grade e a paginação
    if (typeof atualizarTela === 'function') {
        atualizarTela();
    } else {
        exibirPagina(listaAtualProdutos, 1);
    }
}

// Evento ao clicar no botão de lupa
if (searchBtn) {
    searchBtn.addEventListener('click', executarBusca);
}

// Evento ao apertar 'Enter' dentro do campo de busca
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') executarBusca();
    });
}

// Evento ao trocar a categoria no dropdown do topo
if (searchCategoryTop) {
    searchCategoryTop.addEventListener('change', executarBusca);
}
/* ==========================================================================
   LÓGICA DO MENU DROPDOWN
   ========================================================================== */

/**
 * Gerencia a abertura e fechamento dos sub-menus
 */
document.querySelectorAll('.has-dropdown').forEach(menuPai => {
  
  // Evento ao passar o mouse (Desktop)
  menuPai.addEventListener('mouseenter', function() {
    const dropdown = this.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.style.display = 'block';
      // Pequeno delay para a animação de opacidade se houver no CSS
      setTimeout(() => { dropdown.style.opacity = '1'; }, 10);
    }
  });

  // Evento ao tirar o mouse (Desktop)
  menuPai.addEventListener('mouseleave', function() {
    const dropdown = this.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.style.display = 'none';
      dropdown.style.opacity = '0';
    }
  });

  // Suporte para cliques em dispositivos Touch (Celular/Tablet)
  menuPai.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
      const dropdown = this.querySelector('.dropdown-menu');
      
      // Se o menu estiver fechado, abre ele e impede o link principal
      if (dropdown && dropdown.style.display !== 'block') {
        e.preventDefault();
        dropdown.style.display = 'block';
        dropdown.style.opacity = '1';
      }
    }
  });
});

/**
 * Fecha os dropdowns se o usuário clicar fora do menu
 */
document.addEventListener('click', function(e) {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.dropdown-menu').forEach(d => {
      d.style.display = 'none';
      d.style.opacity = '0';
    });
  }
});


// 1. Banco de dados de produtos
const produtos = [
  { id: 1, categoria: "Araras", nome: "ARARA", preco: 12.90, img: "./images/cards/araraMDFColmeia.jpg",tamanho: "Médio" },
  { id: 2, categoria: "Araras", nome: "ARARA DESMONTÁVEL", preco: 89.00, img: "./images/arara.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 1, categoria: "Araras", nome: "ARARA", preco: 12.90, img: "./images/cards/araraMDFColmeia.jpg",tamanho: "Médio" },
  { id: 2, categoria: "Araras", nome: "ARARA DESMONTÁVEL", preco: 89.00, img: "./images/arara.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
  { id: 3, categoria: "Manequins", nome: "MANEQUIM MASCULINO", preco: 150.00, img: "./images/manequim.jpg" },
];
// Adicione isso logo abaixo do array 'const produtos'
let listaAtualProdutos = [...produtos]; // Começa com todos os produtos

// Esta função substitui a necessidade de chamar renderizarProdutos isoladamente
function atualizarTela() {
    exibirPagina(listaAtualProdutos, paginaAtual);
}
const grid = document.getElementById('products-grid');

// 2. Função para renderizar os cards com as classes CORRETAS para o CSS
function renderizarProdutos(lista) {
  if(!grid) return;
  grid.innerHTML = ""; 
  
  lista.forEach(prod => {
    const card = `
      <div class="product-card">
        <div class="product-image-container">
          <span class="category-badge">${prod.categoria.toUpperCase()}</span>
          <img src="${prod.img}" alt="${prod.nome}" class="product-img">
        </div>
        <div class="product-info">
          <h3>${prod.nome}</h3>
          <div class="product-footer">
            <div class="price-container">
              <span class="price-label">A partir de</span>
              <span class="price-value">R$ ${prod.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="btn-add-cart">
              <img src="./images/cartLogo.png" alt="Carrinho" ">
            </button>
          </div>
        </div>
      </div>
    `;
    grid.innerHTML += card;
  });
}

// 3. Lógica de Filtragem por Categoria
document.querySelectorAll('.filter-list li').forEach(item => {
  item.addEventListener('click', () => {
    const categoriaSelecionada = item.textContent.trim();
    const produtosFiltrados = produtos.filter(p => 
      p.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
    );
    renderizarProdutos(produtosFiltrados);
  });
});
/* ==========================================================================
   LÓGICA DE ORDENAÇÃO (RELEVÂNCIA E PREÇO)
   ========================================================================== */

const sortSelect = document.getElementById('sort-products');

if (sortSelect) {
  sortSelect.addEventListener('change', function() {
    const criterio = this.value;
    
    // 1. Criamos uma cópia da lista original para não perder a referência
    let listaOrdenada = [...produtos]; 

    // 2. Aplicamos a lógica de ordenação baseada no valor do select
    if (criterio === 'price-asc') {
      // Menor Preço (Crescente: A - B)
      listaOrdenada.sort((a, b) => a.preco - b.preco);
    } else if (criterio === 'price-desc') {
      // Maior Preço (Decrescente: B - A)
      listaOrdenada.sort((a, b) => b.preco - a.preco);
    } else {
      // Relevância (Volta para a ordem original pelo ID)
      listaOrdenada.sort((a, b) => a.id - b.id);
    }

    // 3. Renderiza a lista já ordenada
    // Verifica se você está usando a paginação que criamos antes ou a renderização simples
    if (typeof exibirPagina === 'function') {
        // Se tiver paginação, exibe a página 1 da nova lista ordenada
        exibirPagina(listaOrdenada, 1);
        
        // (Opcional) Atualiza a referência global se quiser que a paginação continue ordenada
        // produtos = listaOrdenada; 
    } else {
        // Se não tiver paginação, usa a renderização padrão
        renderizarProdutos(listaOrdenada);
    }
  });
}
/* ==========================================================================
   LÓGICA DO FILTRO DE TAMANHO (DROPDOWN)
   ========================================================================== */

const sizeSelect = document.getElementById('size-select');

if(sizeSelect) {
  sizeSelect.addEventListener('change', function() {
    const tamanhoSelecionado = this.value;

    // 1. Se escolheu a opção padrão (""), mostra todos os produtos
    if(tamanhoSelecionado === "") {
        // Se estiver usando paginação, chame exibirPagina(produtos, 1) em vez disso
        renderizarProdutos(produtos);
        return;
    }

    // 2. Filtra os produtos que têm a propriedade 'tamanho' igual ao selecionado
    // IMPORTANTE: Seus objetos no array 'produtos' precisam ter a propriedade 'tamanho'
    const produtosFiltrados = produtos.filter(p =>
      p.tamanho && p.tamanho === tamanhoSelecionado
    );

    // 3. Renderiza o resultado filtrado
    // Se estiver usando paginação, chame exibirPagina(produtosFiltrados, 1) em vez disso
    renderizarProdutos(produtosFiltrados);
  });
}

/* ==========================================================================
   LÓGICA DO FILTRO DE PREÇO (Mínimo e Máximo)
   ========================================================================== */

const btnFilterPrice = document.getElementById('btn-filter-price');
const inputMin = document.getElementById('price-min');
const inputMax = document.getElementById('price-max');

if (btnFilterPrice) {
  btnFilterPrice.addEventListener('click', () => {
    // 1. Pega os valores digitados (ou define padrões se estiver vazio)
    // Se o usuário não digitar nada no min, assume 0.
    const min = parseFloat(inputMin.value) || 0;
    // Se o usuário não digitar nada no max, assume Infinito.
    const max = parseFloat(inputMax.value) || Infinity;

    // 2. Filtra a lista original de produtos
    const produtosFiltradosPorPreco = produtos.filter(p => 
      p.preco >= min && p.preco <= max
    );

    // 3. Verifica se existe paginação para exibir corretamente
    if (typeof exibirPagina === 'function') {
      exibirPagina(produtosFiltradosPorPreco, 1);
    } else {
      renderizarProdutos(produtosFiltradosPorPreco);
    }
  });
}
// 4. Lógica para limpar Preço
/* ==========================================================================
   CORREÇÃO: LIMPAR FILTROS E RESETAR ESTADO
   ========================================================================== */
const btnClear = document.querySelector('.btn-clear');

if (btnClear) {
  btnClear.addEventListener('click', () => {
    // 1. Limpa visualmente os campos de input de preço
    document.getElementById('price-min').value = "";
    document.getElementById('price-max').value = "";

    // 2. Reseta o dropdown de tamanho (se você tiver o ID 'size-select')
    const sizeSelect = document.getElementById('size-select');
    if (sizeSelect) sizeSelect.value = "";

    // 3. Reseta o dropdown de ordenação para 'Relevância'
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) sortSelect.value = "relevance";

    // 4. ESSENCIAL: Reseta a lista atual para a lista COMPLETA original
    listaAtualProdutos = [...produtos]; 

    // 5. Reseta para a primeira página
    paginaAtual = 1;

    // 6. Atualiza a tela com tudo resetado
    atualizarTela();
  });
}
renderizarProdutos(produtos);

/* ==========================================================================
   LÓGICA DE PAGINAÇÃO DINÂMICA
   ========================================================================== */

let paginaAtual = 1;
const itensPorPagina = 6; // Defina quantos cards quer ver por vez

/**
 * Renderiza os produtos de uma página específica
 * @param {Array} lista - A lista completa ou filtrada de produtos
 * @param {number} pagina - O número da página desejada
 */
function exibirPagina(lista, pagina) {
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosDaPagina = lista.slice(inicio, fim);

  renderizarProdutos(produtosDaPagina);
  atualizarBotoesPaginacao(lista.length, pagina);
}

/**
 * Cria os botões de números e controla o estado ativo
 */
function atualizarBotoesPaginacao(totalItens, pagina) {
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);
  const container = document.querySelector('.page-numbers');
  const btnAnterior = document.querySelector('.btn-prev');
  const btnProximo = document.querySelector('.btn-next');

  if (!container) return;

  container.innerHTML = ""; // Limpa números antigos

  for (let i = 1; i <= totalPaginas; i++) {
    const activeClass = i === pagina ? 'active' : '';
    container.innerHTML += `<button class="page-num ${activeClass}" onclick="irParaPagina(${i})">${i}</button>`;
  }

  // Desativa botões se estiver na primeira ou última página
  btnAnterior.disabled = pagina === 1;
  btnProximo.disabled = pagina === totalPaginas;

  // Armazena a página atual globalmente para os botões Prox/Ant
  paginaAtual = pagina;
}

// Funções globais para os cliques
window.irParaPagina = (n) => exibirPagina(produtos, n);
window.proximaPagina = () => { if ((paginaAtual * itensPorPagina) < produtos.length) exibirPagina(produtos, paginaAtual + 1); };
window.paginaAnterior = () => { if (paginaAtual > 1) exibirPagina(produtos, paginaAtual - 1); };

// Inicializa a primeira página
exibirPagina(produtos, 1);