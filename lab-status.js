/* Estado do laboratório — partilhado por todo o site.
   Aberto: terça a sábado, 09h00–19h00. Fora disso: "lab inativo".
   Atua em qualquer .status que contenha "lab" (ponto + etiqueta),
   reavalia a cada minuto e injeta o seu próprio CSS do estado fechado
   para não depender do CSS de cada página. */
(function () {
  "use strict";

  function isOpen(d) {
    var dow = d.getDay(); // 0=dom, 1=seg, … 6=sáb
    var h = d.getHours();
    return dow >= 2 && dow <= 6 && h >= 9 && h < 19;
  }

  function apply() {
    var open = isOpen(new Date());
    var list = document.querySelectorAll(".status");
    for (var i = 0; i < list.length; i++) {
      var s = list[i];
      if (!/lab/i.test(s.textContent)) continue;
      s.classList.toggle("lab-closed", !open);
      var label = s.querySelector("span:last-child");
      if (label) label.innerHTML = open ? "lab&nbsp;ativo" : "lab&nbsp;inativo";
    }
  }

  var style = document.createElement("style");
  style.textContent =
    ".status.lab-closed .pulse{background:#b5563f!important;" +
    "animation:none!important;opacity:1!important}" +
    ".status.lab-closed{color:#c98a78!important}";
  (document.head || document.documentElement).appendChild(style);

  function start() {
    apply();
    setInterval(apply, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
