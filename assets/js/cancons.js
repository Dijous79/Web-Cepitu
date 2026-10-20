// Cançoner: carrega les lletres des de assets/songs/*.txt.
// Format dels fitxers: línies "::TITLE ..." i "::RITME ..." opcionals al principi,
// estrofes separades per línies en blanc. Una estrofa que comença per "TORNADA" o
// "x2" es marca com a tornada.
(() => {
  const SONGS = [
    { file: "colonies-2020", title: "Colònies 2020", group: "Colònies" },
    { file: "colonies-2019", title: "Colònies 2019", group: "Colònies" },
    { file: "colonies-2018", title: "Colònies 2018", group: "Colònies" },
    { file: "colonies-2017", title: "Colònies 2017", group: "Colònies" },
    { file: "colonies-2016", title: "Colònies 2016", group: "Colònies" },
    { file: "colonies-2015", title: "Colònies 2015", group: "Colònies" },
    { file: "colonies-2014", title: "Colònies 2014", group: "Colònies" },
    { file: "colonies-2013", title: "Colònies 2013", group: "Colònies" },
    { file: "esplai-2016", title: "Esplai 2016", group: "Esplai" },
    { file: "esplai-2012", title: "Esplai 2012", group: "Esplai" },
    { file: "retalls", title: "Retalls de cançons", group: "Altres" },
  ];

  const list = document.getElementById("song-list");
  const view = document.getElementById("lyrics");
  if (!list || !view) return;

  const cache = new Map();

  SONGS.forEach((song) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.file = song.file;
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = `<span></span><small></small>`;
    b.querySelector("span").textContent = song.title;
    b.querySelector("small").textContent = song.group;
    b.addEventListener("click", () => show(song));
    list.appendChild(b);
  });

  function parse(text, fallbackTitle) {
    let title = fallbackTitle;
    let rhythm = "";
    const body = [];
    text.replace(/\r/g, "").split("\n").forEach((line) => {
      const meta = line.match(/^::(TITLE|RITME)\s+(.*)$/i);
      if (meta) {
        if (meta[1].toUpperCase() === "TITLE") title = meta[2].trim();
        else rhythm = meta[2].trim();
      } else {
        body.push(line);
      }
    });
    const stanzas = body
      .join("\n")
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    return { title, rhythm, stanzas };
  }

  async function show(song) {
    list.querySelectorAll("button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.file === song.file))
    );
    history.replaceState(null, "", `#${song.file}`);

    let text = cache.get(song.file);
    if (!text) {
      view.innerHTML = `<p class="rhythm">Carregant…</p>`;
      try {
        const res = await fetch(`assets/songs/${song.file}.txt`);
        if (!res.ok) throw new Error(res.status);
        text = await res.text();
        cache.set(song.file, text);
      } catch {
        view.innerHTML = `<p>No s'ha pogut carregar la cançó. Torna-ho a provar més tard.</p>`;
        return;
      }
    }

    const { title, rhythm, stanzas } = parse(text, song.title);
    view.replaceChildren();
    const h = document.createElement("h2");
    h.textContent = title;
    view.appendChild(h);
    const r = document.createElement("p");
    r.className = "rhythm";
    r.textContent = rhythm ? `Ritme: ${rhythm}` : song.group;
    view.appendChild(r);
    stanzas.forEach((s) => {
      const p = document.createElement("p");
      p.className = "stanza";
      if (/^(tornada|x\d)/i.test(s) || /\bx\d\s*$/i.test(s)) p.classList.add("chorus");
      p.textContent = s;
      view.appendChild(p);
    });
  }

  const initial = SONGS.find((s) => `#${s.file}` === location.hash) || SONGS[0];
  show(initial);
})();
