const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL'});
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
  },
  created() {
    this.fetchProdutos();
  },
});
