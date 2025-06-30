const catalogo = new Catalogo();

catalogo.cargarInfoJSON(() => {
  renderizarCatalogo(catalogo);
});
