"use strict";
const filter = document.querySelector(".filter");
const status = document.querySelector("#release-status");
const cards = [...document.querySelectorAll("[data-platform]")];
filter.hidden = false;
filter.addEventListener("click", (event) => {
  const selected = event.target.closest("button[data-filter]");
  if (!selected) return;
  for (const button of filter.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button === selected));
  }
  for (const card of cards) {
    card.hidden = selected.dataset.filter !== "all" && selected.dataset.filter !== card.dataset.platform;
  }
});

async function installLinks() {
  try {
    const response = await fetch("release.json");
    if (!response.ok) throw new Error("Release inventory unavailable");
    const release = await response.json();
    if (!release.version || !Object.keys(release.assets ?? {}).length) {
      status.textContent = "Installers are being prepared. Check GitHub Releases for updates.";
      return;
    }
    if (!/^v\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(release.version)) {
      throw new Error("Invalid release version");
    }
    let count = 0;
    for (const slot of document.querySelectorAll("[data-asset]")) {
      const file = `RAVEN-Disassembler-${slot.dataset.asset}`;
      if (!Object.prototype.hasOwnProperty.call(release.assets, file)) continue;
      const link = document.createElement("a");
      link.className = "asset";
      link.href = `https://github.com/TanTrieuNguyen/raven-disassembler-site/releases/download/${release.version}/${file}`;
      link.textContent = file.endsWith(".exe") ? "Setup" :
        file.endsWith(".tar.gz") ? "tar.gz" : file.slice(file.lastIndexOf(".") + 1).toUpperCase();
      const platform = slot.closest("article").querySelector("h3").textContent;
      const cpu = slot.closest("li").querySelector("strong").textContent;
      link.setAttribute("aria-label", `Download ${platform} ${cpu} ${link.textContent}`);
      slot.replaceChildren(link);
      count++;
    }
    status.textContent = `${release.version} · ${count} download options`;
  } catch {
    status.textContent = "Download availability could not be loaded. See GitHub Releases below.";
  }
}
installLinks();
