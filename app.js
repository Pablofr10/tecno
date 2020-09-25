const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
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
  },
  created() {
    this.fetchProdutos();
  },
});
