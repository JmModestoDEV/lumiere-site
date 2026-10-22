// Lumière | main.js
// Interações da página: menu mobile e ano do rodapé.

// 1) Seleciona os elementos que vamos controlar
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu-principal");

// 2) Função que abre ou fecha o menu
function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open)); // avisa leitores de tela
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  menu.classList.toggle("is-open", open); // o CSS faz o resto
}

function isOpen() {
  return toggle.getAttribute("aria-expanded") === "true";
}

// 3) Eventos (só se os elementos existirem na página)
if (header && toggle && menu) {
  // Clique no botão: alterna abrir e fechar
  toggle.addEventListener("click", () => {
    setMenu(!isOpen());
  });

  // Clique em qualquer link do menu: fecha (delegação de evento)
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  // Clique fora do cabeçalho: fecha
  document.addEventListener("click", (event) => {
    if (isOpen() && !header.contains(event.target)) {
      setMenu(false);
    }
  });

  // Tecla Esc: fecha e devolve o foco ao botão
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Se a tela virar "desktop", fecha o painel para não ficar preso aberto
  window.matchMedia("(min-width: 768px)").addEventListener("change", (event) => {
    if (event.matches) {
      setMenu(false);
    }
  });
}

// 4) Ano do rodapé automático
const year = document.getElementById("ano");
if (year) {
  year.textContent = new Date().getFullYear();
}
