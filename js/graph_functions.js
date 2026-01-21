/**
 * Version universelle de setupHiDPICanvas pour corriger le flou
 */
function setupUniversalHiDPI(canvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvasElement.getBoundingClientRect();
    const ctx = canvasElement.getContext('2d');

    canvasElement.width = rect.width * dpr;
    canvasElement.height = rect.height * dpr;
    canvasElement.style.width = rect.width + 'px';
    canvasElement.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    return { ctx, width: rect.width, height: rect.height };
}

// ---------- Lizherennoù implijet --------------
const lizherenn = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "Y", "Z"];

function randomFromInterval(min, max) {
    const randomNumberInterval = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumberInterval;
}

// ---------- Outils Graphiques de Base ----------

function line(x1, y1, x2, y2, color, width) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

/**
 * Convertit des coordonnées mathématiques en pixels canvas
 */
function toPx(x, y) {
    return { px: O.x + x * unit, py: O.y - y * unit };
}

/**
 * Convertit des pixels canvas en coordonnées mathématiques
 */
function toMath(px, py) {
    return { x: (px - O.x) / unit, y: -(py - O.y) / unit };
}

// ---------- Fonctions de Dessin ----------

function drawGrid() {
    const xMax = Math.ceil(w / (2 * unit));
    const yMax = Math.ceil(h / (2 * unit));
    for (let x = -xMax; x <= xMax; x++) {
        let posX = O.x + x * unit;
        line(posX, 0, posX, h, "#e0e0e0", 0.5);
    }
    for (let y = -yMax; y <= yMax; y++) {
        let posY = O.y - y * unit;
        line(0, posY, w, posY, "#e0e0e0", 0.5);
    }
}

function drawAxes() {
    line(0, O.y, w, O.y, "#cce3f5ff", 2);
    line(O.x, 0, O.x, h, "#cce3f5ff", 2);
    ctx.font = "14px Arial";
    ctx.fillStyle = "#cce3f5ff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const xMax = Math.floor(w / (2 * unit));
    const yMax = Math.floor(h / (2 * unit));

    for (let i = -xMax; i <= xMax; i++) {
        if (i === 0) continue;
        let posX = O.x + i * unit;
        line(posX, O.y - 5, posX, O.y + 5, "#cce3f5ff", 1);
        ctx.fillText(i, posX, O.y + 20);
    }
    for (let i = -yMax; i <= yMax; i++) {
        if (i === 0) continue;
        let posY = O.y - i * unit;
        line(O.x - 5, posY, O.x + 5, posY, "#cce3f5ff", 1);
        ctx.fillText(i, O.x + 15, posY);
    }
    ctx.fillText("O", O.x - 10, O.y + 10);
}

function drawPoint(x, y, color) {
    const { px, py } = toPx(x, y);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(px, py, 5, 0, 2 * Math.PI);
    ctx.fill();
}

/**
 * Nettoie et redessine la base (grille + axes)
 */
function clearAndDrawBase() {
    ctx.clearRect(0, 0, w, h);
    drawGrid();
    drawAxes();
}

