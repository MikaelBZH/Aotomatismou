document.addEventListener("DOMContentLoaded", function () {
    const menuHTML = `
        <nav id="sidebar">
            <a href="index.html">🏠 Degemer</a>

            <div class="menu-group">
                <button class="menu-header">➗ Niveroù ha jedadennoù</button>
                <div class="submenu">
                    <a href="Daveañ war un eeunenn.html">🎲 Daveañ war un eeunenn</a>
                    <a href="Dispakañ.html">🎲 Dispakañ ha reduiñ</a>
                    <a href="Galloudoù.html">🎲 Galloudoù</a>    
                    <a href="Jedadennoù.html">🎲 Jedadennoù</a>
                    <a href="Karrezioù.html">🎲 Karrezioù peurvad</a>
                    <a href="Kevatalennoù.html">🎲 Kevatalennoù</a>
                    <a href="Kevrennoù.html">🎲 Kevrennoù</a>
                    <a href="Kriterioù rannuster.html">🎲 Kriterioù rannuster</a>
                    <a href="Skrivad skiantel.html">🎲 Skrivad skiantel</a>
                    <a href="Talvoud un eztaol.html">🎲 Talvoud un eztaol</a>
                </div>
            </div>

            <div class="menu-group">
                <button class="menu-header">🎲 Merañ roadennoù</button>
                <div class="submenu">
                    <a href="Dregantadoù.html">🎲 Dregantadoù</a>
                </div>
            </div>

            <div class="menu-group">
                <button class="menu-header">📏 Mentadoù ha muzulioù</button>
                <div class="submenu">
                    <a href="Gorreadoù.html">🎲 Gorreadoù</a>
                    <a href="Troidigezhioù.html">🎲 Troidigezhioù</a>
                </div>
            </div>

            <div class="menu-group">
                <button class="menu-header">&#128208; Spas ha mentoniezh</button>
                <div class="submenu">
                    <a href="Daveañ war ar plaen.html">🎲 Daveañ war ar plaen</a>
                    <a href="Liammadur Pitagoras.html">🎲 Liammadur Pitagoras</a>
                    <a href="Perzh Thales.html">🎲 Perzh Thales</a>
                    <a href="Trigonometriezh.html">🎲 Trigonometriezh</a>
                    
                </div>
            </div>
        </nav>
    `;

    const container = document.getElementById("menu-container");
    container.innerHTML = menuHTML;

    // Add ☰ toggle button
    const btn = document.createElement("button");
    btn.className = "toggle-btn";
    btn.innerHTML = "☰";
    btn.onclick = toggleMenu;
    document.body.appendChild(btn);

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "overlay";
    document.body.appendChild(overlay);
    overlay.addEventListener("click", toggleMenu);

    // Accordion
    document.querySelectorAll('.menu-header').forEach(header => {
        header.addEventListener('click', () => {
            const submenu = header.nextElementSibling;

            // Toggle open class
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
                document.querySelectorAll('.submenu').forEach(other => {
                    if (other !== submenu) other.classList.remove('open');
                });
            }
        });
    });

});


function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content") || document.querySelector(".main");

    sidebar.classList.toggle("closed");
    sidebar.classList.toggle("open");

    if (content) {
        content.classList.toggle("full");
    }
}