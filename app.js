const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    mensagemAlerta: 'Item Adicionado',
    alertaAtivo: false,
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    },
    // maiuscula(valor){
    //     return valor.toUpperCase();
    // }
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco;
        });
      }
      return total;
    },
  },
  methods: {
    fetchProdutos() {
      fetch('./api/produtos.json')
        .then((r) => r.json())
        .then((r) => {
          this.produtos = r;
        });
    },
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((res) => res.json())
        .then((res) => {
          this.produto = res;
        });
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    fecharModal({ target, currentTarget }) {
      if (target === currentTarget) this.produto = false;
    },
    adicionarItem() {
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
      this.alerta(`${nome} foi adicionado ao carrinho`);
    },
    removerItem(i) {
      this.carrinho.splice(i, 1);
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
  },
  watch: {
    produto() {
      document.title = this.produto.nome || 'Techno';
      const hash = this.produto.id || '';
      history.pushState(null, null, `#${hash}`);
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
    router() {
      const hash = document.location.hash;
      if (hash) {
        this.fetchProduto(hash.replace("#", ""));
      }
    },
  },
  created() {
    this.fetchProdutos();
    this.router();
    this.checarLocalStorage();
  },
});
