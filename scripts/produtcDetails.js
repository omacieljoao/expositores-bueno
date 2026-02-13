// scripts/produto.js

// 1. Você precisa ter acesso aos seus dados de produto aqui.
// Se eles estão em outro arquivo (ex: data.js), você importa:
// import { produtosData } from './data.js';

// Simulando seu "banco de dados" para o exemplo funcionar
const produtosData = [
  { id: 1, nome: "CABIDE FINO ACRÍLICO COM GANCHO", categoria: "CABIDES", preco: "12,90", imagem: "../images/cabide-luxo.jpg", descricao: "Cabide acrílico transparente de alta qualidade." },
  { id: 2, nome: "ARARA DE PAREDE", categoria: "ARARAS", preco: "150,00", imagem: "../images/arara-parede.jpg", descricao: "Arara resistente para loja." }
];

document.addEventListener('DOMContentLoaded', () => {
  
  // 2. Lê a URL atual (ex: www.seusite.com/pages/produto.html?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  
  // 3. Extrai o número do ID que veio na URL
  const produtoId = urlParams.get('id');

  // 4. Se encontrou um ID na URL, busca o produto correspondente
  if (produtoId) {
    // Procura no array o produto que tem o id igual ao da URL
    const produtoSelecionado = produtosData.find(p => p.id == produtoId);

    if (produtoSelecionado) {
      // 5. Preenche os campos do HTML com os dados encontrados
      document.getElementById('product-title').innerText = produtoSelecionado.nome;
      document.getElementById('product-category').innerText = produtoSelecionado.categoria;
      document.getElementById('product-price').innerText = produtoSelecionado.preco;
      document.getElementById('product-desc').innerText = produtoSelecionado.descricao;
      document.getElementById('main-product-img').src = produtoSelecionado.imagem;
      
      // Ajusta o Breadcrumb para mostrar o nome do produto
      document.querySelector('.breadcrumb-current').innerText = produtoSelecionado.nome;
      
      // Opcional: Atualiza o título da aba do navegador
      document.title = `Expositores Bueno | ${produtoSelecionado.nome}`;

    } else {
      // Se não achar o produto com aquele ID
      document.getElementById('product-title').innerText = "Produto não encontrado";
    }
  } else {
     // Se alguém acessar produto.html direto sem passar ID na URL
     document.getElementById('product-title').innerText = "Nenhum produto selecionado";
  }
});