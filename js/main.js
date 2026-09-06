(function () {
  "use strict";

  /* ---------- countdown ---------- */
  var target = Date.now() + (2 * 3600 + 14 * 60 + 57) * 1000;

  function pad(n) { return String(n).padStart(2, "0"); }

  function tickCountdown() {
    var diff = Math.max(0, target - Date.now());
    var h = pad(Math.floor(diff / 3600000));
    var m = pad(Math.floor((diff % 3600000) / 60000));
    var s = pad(Math.floor((diff % 60000) / 1000));

    var topbarClock = document.getElementById("topbar-clock");
    if (topbarClock) topbarClock.textContent = h + ":" + m + ":" + s;

    var cdH = document.getElementById("cd-h");
    var cdM = document.getElementById("cd-m");
    var cdS = document.getElementById("cd-s");
    if (cdH) cdH.textContent = h;
    if (cdM) cdM.textContent = m;
    if (cdS) cdS.textContent = s;

    document.querySelectorAll("#hero-clock, .offer-clock").forEach(function (el) {
      el.textContent = h + ":" + m + ":" + s;
    });
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- cores e tamanhos disponíveis (todas as variantes reais do AliExpress/SIHI) ---------- */
  var COLORS = [
    { name: "Roxo", hex: "#8B5CF6", img: "img/lifestyle-pista.avif" },
    { name: "Azul", hex: "#5C9CE6", img: "img/produto-azul.avif" },
    { name: "Preto", hex: "#101317", img: "img/produto-preto.avif" },
    { name: "Verde-água", hex: "#7FD9C4", img: "img/produto-verde.avif" },
    { name: "Branco/Roxo", hex: "#B98BF0", img: "img/lifestyle-roxo-tornozelo.avif" },
    { name: "Branco/Azul", hex: "#4C6FE0", img: "img/produto-branco-azul.avif" },
    { name: "Preto Fosco", hex: "#2B2F33", img: "img/produto-preto-fosco.avif" },
    { name: "Branco/Laranja", hex: "#FF8A3D", img: "img/produto-branco-laranja.avif" },
    { name: "Turquesa", hex: "#3DD9C7", img: "img/produto-turquesa.avif" },
    { name: "Coral", hex: "#FF6B5B", img: "img/produto-coral.avif" },
    { name: "Bege/Verde", hex: "#B7C79A", img: "img/produto-bege-verde.avif" },
    { name: "Branco", hex: "#DADFE6", img: "img/produto-branco.avif" },
    { name: "Verde Neon", hex: "#7ED321", img: "img/lifestyle-verde-neon.avif" }
  ];
  var SIZES = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43]; // tamanho real do fornecedor (SIHI) = BR + 2

  /* ---------- galeria de fotos ---------- */
  var mainImg = document.getElementById("gallery-main-img");
  var galleryThumbsEl = document.getElementById("gallery-thumbs");

  function setGalleryImage(src) {
    if (mainImg && src) mainImg.src = src;
  }

  if (galleryThumbsEl) {
    galleryThumbsEl.innerHTML = COLORS.map(function (c, i) {
      return '<button class="thumb' + (i === 0 ? " active" : "") + '" data-img="' + c.img + '" data-color="' + c.name + '"><img src="' + c.img + '" alt="Impulso Carbon Pro ' + c.name + '"></button>';
    }).join("");

    galleryThumbsEl.addEventListener("click", function (e) {
      var t = e.target.closest(".thumb");
      if (!t) return;
      galleryThumbsEl.querySelectorAll(".thumb").forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      setGalleryImage(t.getAttribute("data-img"));
    });
  }

  function formatBRL(value) {
    return "R$ " + value.toFixed(2).replace(".", ",");
  }

  /* ---------- kit + seleção por par ---------- */
  var kitButtons = document.querySelectorAll(".kit");
  var pairSelectorsEl = document.getElementById("pair-selectors");
  var stackListEl = document.getElementById("stack-list");
  var selParcel = document.getElementById("sel-parcel");
  var PARCELAS = 5;

  var currentKit = { qty: 1, unit: 219.90, total: 219.90 };
  var pairs = [{ color: COLORS[0].name, size: 35 }];

  function syncPairsLength() {
    var qty = currentKit.qty;
    while (pairs.length < qty) pairs.push({ color: COLORS[0].name, size: 35 });
    if (pairs.length > qty) pairs = pairs.slice(0, qty);
  }

  function renderPairSelectors() {
    var showLabel = pairs.length > 1;
    var html = pairs.map(function (pair, i) {
      var swatches = COLORS.map(function (c) {
        var active = c.name === pair.color ? " active" : "";
        return '<button class="swatch' + active + '" style="--c:' + c.hex + '" data-role="color" data-value="' + c.name + '" data-img="' + c.img + '" aria-label="' + c.name + '"></button>';
      }).join("");
      var sizes = SIZES.map(function (s) {
        var active = s === pair.size ? " active" : "";
        return '<button class="size-mini' + active + '" data-role="size" data-value="' + s + '">' + s + '</button>';
      }).join("");
      return (
        '<div class="pair-card" data-pair="' + i + '">' +
          (showLabel ? '<div class="pair-head">Par ' + (i + 1) + '</div>' : '') +
          '<div class="pair-row"><span class="cp-label">Cor</span><div class="swatches">' + swatches + '</div></div>' +
          '<div class="pair-row"><span class="cp-label">Tamanho (BR)</span><div class="sizes-mini">' + sizes + '</div></div>' +
        '</div>'
      );
    }).join("");
    if (pairSelectorsEl) pairSelectorsEl.innerHTML = html;
  }

  function renderStack() {
    if (!stackListEl) return;
    var lines = pairs.map(function (pair, i) {
      var label = "Impulso Carbon Pro" + (pairs.length > 1 ? " — Par " + (i + 1) : "") + " — " + pair.color + " — Tam. " + pair.size;
      return "<li><span>" + label + "</span><b>" + formatBRL(currentKit.unit) + "</b></li>";
    }).join("");
    lines += "<li><span>Frete expresso</span><b>Grátis</b></li>";
    lines += "<li><span>Bônus: par de meias esportivas</span><b>Grátis</b></li>";
    lines += '<li class="total"><span>Total hoje</span><b>' + formatBRL(currentKit.total) + "</b></li>";
    stackListEl.innerHTML = lines;
    if (selParcel) selParcel.textContent = PARCELAS + "x de " + formatBRL(currentKit.total / PARCELAS);
  }

  function refreshOffer() {
    syncPairsLength();
    renderPairSelectors();
    renderStack();
  }

  function selectKit(btn) {
    kitButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentKit = {
      qty: parseInt(btn.getAttribute("data-qty"), 10),
      unit: parseFloat(btn.getAttribute("data-unit")),
      total: parseFloat(btn.getAttribute("data-total"))
    };
    refreshOffer();
  }

  kitButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { selectKit(btn); });
  });

  if (pairSelectorsEl) {
    pairSelectorsEl.addEventListener("click", function (e) {
      var el = e.target.closest("[data-role]");
      if (!el) return;
      var card = e.target.closest(".pair-card");
      var idx = parseInt(card.getAttribute("data-pair"), 10);
      if (el.getAttribute("data-role") === "color") {
        pairs[idx].color = el.getAttribute("data-value");
        setGalleryImage(el.getAttribute("data-img"));
      } else if (el.getAttribute("data-role") === "size") {
        pairs[idx].size = parseInt(el.getAttribute("data-value"), 10);
      }
      renderPairSelectors();
      renderStack();
    });
  }

  var featured = document.querySelector(".kit.featured");
  if (featured) {
    selectKit(featured);
  } else {
    refreshOffer();
  }

  var sizeGuideBtn = document.getElementById("btn-size-guide");
  var sizeGuideNote = document.getElementById("size-guide");
  if (sizeGuideBtn && sizeGuideNote) {
    sizeGuideBtn.addEventListener("click", function () {
      sizeGuideNote.hidden = !sizeGuideNote.hidden;
    });
  }

  /* ---------- mobile sticky CTA ---------- */
  var mobileCta = document.querySelector(".mobile-cta");
  var hero = document.querySelector(".hero");

  if (mobileCta && hero) {
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    window.addEventListener("scroll", function () {
      if (window.scrollY > heroBottom) {
        mobileCta.classList.add("show");
      } else {
        mobileCta.classList.remove("show");
      }
    });
  }

  /* ---------- smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ---------- botão de compra (placeholder) ---------- */
  var btnComprar = document.getElementById("btn-comprar");
  if (btnComprar) {
    btnComprar.addEventListener("click", function (e) {
      e.preventDefault();
      // TODO: próxima etapa — chamar checkout próprio / API da Yampi + Appmax aqui,
      // enviando qty, cor e total selecionados acima.
      alert("Checkout ainda não conectado. Próxima etapa: integrar Appmax + Yampi.");
    });
  }
})();
