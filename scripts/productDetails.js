/* ==========================================================================
   LÓGICA DE DETALHES DO PRODUTO (CONSUMINDO JSON)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  
  // 1. Lê a URL atual e extrai o ID (ex: productDetails.html?id=2)
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id');

  // Se não houver ID na URL, avisa o usuário e para o código
  if (!produtoId) {
    const titleElement = document.getElementById('product-title');
    if (titleElement) titleElement.innerText = "Nenhum produto selecionado.";
    return;
  }

  try {
    // 2. Busca o arquivo JSON 
    const resposta = await fetch('../dados/produtos.json');
    
    if (!resposta.ok) {
      throw new Error('Falha ao carregar o banco de dados de produtos.');
    }

    const produtos = await resposta.json();

    // 3. Procura o produto no array. 
    const produtoSelecionado = produtos.find(p => p.id === parseInt(produtoId));

    // 4. Se encontrou o produto, injeta os dados no HTML
    if (produtoSelecionado) {
      
      const titleElement = document.getElementById('product-title');
      if (titleElement) titleElement.innerText = produtoSelecionado.nome;
      
      // CORREÇÃO 1: Trata a categoria que agora pode ser uma lista (Array)
      const catElement = document.getElementById('product-category');
      if (catElement) {
        const categoriaParaMostrar = Array.isArray(produtoSelecionado.categoria) 
          ? produtoSelecionado.categoria[0] 
          : produtoSelecionado.categoria;
        catElement.innerText = categoriaParaMostrar.toUpperCase();
      }

      // CORREÇÃO 2: Ajusta o caminho da imagem de "./images/" para "../images/"
      const imgElement = document.getElementById('main-product-img');
      if (imgElement) {
        const imgCorrigida = produtoSelecionado.img.replace('./images/', '../images/');
        imgElement.src = imgCorrigida;
      }
      
      // Formata o preço para o padrão brasileiro (ex: 150.00 vira 150,00)
      if (produtoSelecionado.preco) {
        const priceElement = document.getElementById('product-price');
        if (priceElement) priceElement.innerText = produtoSelecionado.preco.toFixed(2).replace('.', ',');
      }

      // Preenche a descrição 
      const descElement = document.getElementById('product-desc');
      if (descElement) {
        descElement.innerText = produtoSelecionado.descricao || "Descrição detalhada não disponível para este produto.";
      }

      // Deixa o Breadcrumb (trilha de navegação) dinâmico
      const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
      if (breadcrumbCurrent) {
        breadcrumbCurrent.innerText = produtoSelecionado.nome;
      }

      // Atualiza o título da aba do navegador dinamicamente
      document.title = `Expositores Bueno | ${produtoSelecionado.nome}`;

      // CORREÇÃO 3: Lógica do WhatsApp movida para o local correto
      const btnWhatsapp = document.getElementById('btn-whatsapp-product');
      if (btnWhatsapp) {
        const mensagem = `Olá! Gostaria de solicitar um orçamento para o produto: ${produtoSelecionado.nome}`;
        const mensagemCodificada = encodeURIComponent(mensagem);
        btnWhatsapp.href = `https://wa.me/5551996034579?text=${mensagemCodificada}`;
      }

    } else {
      // Se a URL tiver um ID que não existe no JSON (ex: id=999)
      const titleElement = document.getElementById('product-title');
      if (titleElement) titleElement.innerText = "Produto não encontrado.";
      
      const imgElement = document.getElementById('main-product-img');
      if (imgElement) imgElement.style.display = 'none'; 
    }

  } catch (erro) {
    console.error("Erro ao carregar os detalhes do produto:", erro);
    const titleElement = document.getElementById('product-title');
    if (titleElement) titleElement.innerText = "Erro ao carregar as informações.";
  }
});