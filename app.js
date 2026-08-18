/**
 * app.js
 * -----------------------------------------------------------------------
 * Wires up the station / from-platform / to-platform selects and renders
 * the transfer result. Depends on STATIONS from data.js.
 */

const els = {
  station: document.getElementById("station-select"),
  from: document.getElementById("from-select"),
  to: document.getElementById("to-select"),
  result: document.getElementById("result"),
  empty: document.getElementById("empty-state"),
};

function init() {
  populateStations();
  els.station.addEventListener("change", onStationChange);
  els.from.addEventListener("change", onFromChange);
  els.to.addEventListener("change", renderResult);
}

function populateStations() {
  const placeholder = new Option("Select a station\u2026", "", true, true);
  placeholder.disabled = true;
  els.station.appendChild(placeholder);

  STATIONS.forEach((station) => {
    els.station.appendChild(new Option(station.name, station.id));
  });
}

function currentStation() {
  const id = els.station.value;
  return STATIONS.find((s) => s.id === id) || null;
}

function onStationChange() {
  const station = currentStation();
  resetSelect(els.from, "Select a platform\u2026");
  resetSelect(els.to, "Select a destination\u2026");
  els.to.disabled = true;
  hideResult();

  if (!station) return;

  // Build the unique set of "from" endpoints for this station's transfers.
  const seen = new Set();
  station.transfers.forEach((t) => {
    if (!seen.has(t.from)) {
      seen.add(t.from);
      els.from.appendChild(new Option(t.from, t.from));
    }
    // Transfers are walkable both directions, so also list the reverse.
    if (!seen.has(t.to)) {
      seen.add(t.to);
      els.from.appendChild(new Option(t.to, t.to));
    }
  });
  els.from.disabled = false;
}

function onFromChange() {
  const station = currentStation();
  resetSelect(els.to, "Select a destination\u2026");
  hideResult();
  if (!station || !els.from.value) {
    els.to.disabled = true;
    return;
  }

  const fromVal = els.from.value;
  const options = new Set();
  station.transfers.forEach((t) => {
    if (t.from === fromVal) options.add(t.to);
    if (t.to === fromVal) options.add(t.from);
  });

  options.forEach((label) => els.to.appendChild(new Option(label, label)));
  els.to.disabled = options.size === 0;
}

function findTransfer(station, fromVal, toVal) {
  return station.transfers.find(
    (t) =>
      (t.from === fromVal && t.to === toVal) ||
      (t.from === toVal && t.to === fromVal)
  );
}

function resetSelect(select, placeholderText) {
  select.innerHTML = "";
  const placeholder = new Option(placeholderText, "", true, true);
  placeholder.disabled = true;
  select.appendChild(placeholder);
}

function hideResult() {
  els.result.hidden = true;
  els.empty.hidden = false;
}

function bulletHTML(lines) {
  return lines
    .map(
      (l) =>
        `<span class="bullet" style="background:var(--l-${l.toLowerCase()})">${l}</span>`
    )
    .join("");
}

function stairIcons(count, symbol) {
  if (count === 0) return "\u2014 none";
  return symbol.repeat(Math.min(count, 6)) + (count > 6 ? ` \u00d7${count}` : "");
}

function renderResult() {
  const station = currentStation();
  const fromVal = els.from.value;
  const toVal = els.to.value;

  if (!station || !fromVal || !toVal) {
    hideResult();
    return;
  }

  const t = findTransfer(station, fromVal, toVal);
  if (!t) {
    hideResult();
    return;
  }

  const forward = t.from === fromVal;
  const fromLines = forward ? t.fromLines : t.toLines;
  const toLines = forward ? t.toLines : t.fromLines;
  const stairsUp = forward ? t.stairsUp : t.stairsDown;
  const stairsDown = forward ? t.stairsDown : t.stairsUp;

  els.result.innerHTML = `
    <div class="result">
      <div class="result-path">
        <span class="route-label">${fromVal} \u2192 ${toVal}</span>
        <div class="bullets">${bulletHTML(fromLines)}</div>
        <div class="path-track">
          <div class="footstep" style="animation-delay:0s"></div>
          <div class="footstep" style="animation-delay:.5s"></div>
          <div class="footstep" style="animation-delay:1s"></div>
        </div>
        <div class="bullets">${bulletHTML(toLines)}</div>
      </div>
      <div class="clock">
        <div class="time">${t.walkTimeMin}<small>min walk, est.</small></div>
        <span class="ada-flag ${t.elevator ? "good" : "no"}">
          ${t.elevator ? "\u2713 ADA path" : "\u2715 no elevator"}
        </span>
      </div>
    </div>
    <div class="stat-grid">
      <div class="stat">
        <div class="value">${stairsUp}</div>
        <div class="label">Flights up</div>
        <div class="icon-row">${stairIcons(stairsUp, "\u2191")}</div>
      </div>
      <div class="stat">
        <div class="value">${stairsDown}</div>
        <div class="label">Flights down</div>
        <div class="icon-row">${stairIcons(stairsDown, "\u2193")}</div>
      </div>
      <div class="stat">
        <div class="value">${t.walkTimeMin}<span style="font-size:1rem">m</span></div>
        <div class="label">Walk time</div>
        <div class="icon-row">\u25a0\u25a0\u25a0</div>
      </div>
    </div>
    <div class="note-box">
      <strong>Route notes:</strong> ${t.distanceNote}
    </div>
  `;
  els.result.hidden = false;
  els.empty.hidden = true;
}

document.addEventListener("DOMContentLoaded", init);