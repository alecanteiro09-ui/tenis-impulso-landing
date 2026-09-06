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

  /* ---------- kit selector ---------- */
  var kitButtons = document.querySelectorAll(".kit");
  var selQty = document.getElementById("sel-qty");
  var selUnitTotal = document.getElementById("sel-unit-total");
  var selTotal = document.getElementById("sel-total");
  var selParcel = document.getElementById("sel-parcel");
  var PARCELAS = 5;

  function formatBRL(value) {
    return "R$ " + value.toFixed(2).replace(".", ",");
  }

  function selectKit(btn) {
    kitButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");

    var qty = btn.getAttribute("data-qty");
    var unit = parseFloat(btn.getAttribute("data-unit"));
    var total = parseFloat(btn.getAttribute("data-total"));

    if (selQty) selQty.textContent = qty;
    if (selUnitTotal) selUnitTotal.textContent = formatBRL(unit * parseInt(qty, 10));
    if (selTotal) selTotal.textContent = formatBRL(total);
    if (selParcel) selParcel.textContent = PARCELAS + "x de " + formatBRL(total / PARCELAS);
  }

  kitButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { selectKit(btn); });
  });

  var featured = document.querySelector(".kit.featured");
  if (featured) selectKit(featured);

  /* ---------- galeria de fotos ---------- */
  var thumbs = document.querySelectorAll(".thumb");
  var mainImg = document.getElementById("gallery-main-img");

  function setGalleryImage(src) {
    if (mainImg && src) mainImg.src = src;
  }

  thumbs.forEach(function (t) {
    t.addEventListener("click", function () {
      thumbs.forEach(function (x) { x.classList.remove("active"); });
      t.classList.add("active");
      setGalleryImage(t.getAttribute("data-img"));
      selectColorByName(t.getAttribute("data-color"));
    });
  });

  /* ---------- color swatches ---------- */
  var swatches = document.querySelectorAll(".swatch");
  var selColor = document.getElementById("sel-color");

  function selectColorByName(name) {
    if (!name) return;
    swatches.forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("data-color") === name);
    });
    if (selColor) selColor.textContent = name;
  }

  swatches.forEach(function (sw) {
    sw.addEventListener("click", function () {
      swatches.forEach(function (s) { s.classList.remove("active"); });
      sw.classList.add("active");
      if (selColor) selColor.textContent = sw.getAttribute("data-color");
      var img = sw.getAttribute("data-img");
      if (img) setGalleryImage(img);
    });
  });

  /* ---------- size picker ---------- */
  var sizes = document.querySelectorAll(".size");
  var selSize = document.getElementById("sel-size");

  sizes.forEach(function (sz) {
    sz.addEventListener("click", function () {
      sizes.forEach(function (s) { s.classList.remove("active"); });
      sz.classList.add("active");
      if (selSize) selSize.textContent = sz.getAttribute("data-size");
      // data-factory guarda o tamanho real do fornecedor (SIHI) pra mandar no pedido depois
    });
  });

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
