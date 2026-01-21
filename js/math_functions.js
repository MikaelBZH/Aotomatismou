// ---------- Lizherennoù implijet --------------
//const lizherenn = ["A", "B", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "W", "Y", "Z"];

let l1, l2, l3;
let triangle, triangle_skrid, skouer, poentSkouer;

function randomFromInterval(min, max) {
    const randomNumberInterval = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumberInterval;
}

function randomEntireFromInterval(min, max, digit) {
    // Ensure 'digit' is a non-negative integer
    digit = Math.max(0, Math.floor(digit));

    // Generate random number
    const random = Math.random() * (max - min) + min;

    // Round to the desired number of decimal digits
    const rounded = Number(random.toFixed(digit));

    // If the result is a whole number, return it as an integer
    return Number.isInteger(rounded) ? Math.trunc(rounded) : rounded;
}




// ------------------ Fractions ------------------------------------

function kevrenn(bevenn_niv, bevenn_anv) {
    let niv = randomFromInterval(bevenn_niv, 12);
    while (niv === 0) { niv = randomFromInterval(bevenn_niv, 12); }
    let anv;
    while (niv % anv === 0 || anv === undefined || anv === 0) { anv = randomFromInterval(2, bevenn_anv); }
    return [niv, anv];
}

function BRB(a, b) {

    a = Math.abs(a);
    b = Math.abs(b);
    r = a % b;
    while (r > 0) {
        a = b;
        b = r;
        r = a % b;
    }
    return b;

}

function BLB(a, b) {

    return Math.abs(a * b) / BRB(a, b);

}



// -------------------- Trigonometric functions ----------------------

function kostezioùTrigo(triangle, poentSkouerIndex, kornIndex) {

    let poentAll = triangle.filter((index) => index != poentSkouerIndex);
    let k_hip = poentAll.join('');
    let t_enep = triangle.filter((index) => index != kornIndex);
    let k_enep = t_enep.join('');
    let k_sko;
    let y = randomFromInterval(0, 1);
    if (y === 0) {
        k_sko = poentSkouerIndex + kornIndex;
    } else {
        k_sko = kornIndex + poentSkouerIndex;
    }

    return [k_hip, k_sko, k_enep];
}

function Trigo() {

    const respontArea = document.getElementById("respontArea");
    respontArea.textContent = "";
    respontArea.style.display = "none";

    document.getElementById("respontBtn").style.display = "inline-block";

    trichornSkouer();

    let x;
    while (x === skouer || x === undefined) {
        x = randomFromInterval(0, 2);
    }
    korn = triangle[x];

    kostez = kostezioùTrigo(triangle, poentSkouer, korn);
    kostezDaJediñ = kostez[randomFromInterval(0, 2)];
    let kostezAnavezet;
    while (kostezAnavezet === kostezDaJediñ || kostezAnavezet === undefined) {
        kostezAnavezet = kostez[randomFromInterval(0, 2)];
    }

    goulenn = `\\[
            \\begin{aligned}
            &${triangle_skrid} \\text{ a zo un tric'horn skouer e } ${poentSkouer}. \\\\
            &\\text{Anavezout a reer muzul } \\widehat{${korn}} \\text{ ha } ${kostezAnavezet}. \\\\
            &\\text{Klask a reer } ${kostezDaJediñ}. \\\\
            &\\text{Peseurt formulenn drigonometriezh 'vo da implijout ?}
            \\end{aligned}
            \\]`;

    let hip = kostez[0];
    let sko = kostez[1];
    let enep = kostez[2];

    if (kostezAnavezet === hip && kostezDaJediñ === sko) {
        result = `\\[
                \\begin{aligned}
                &\\cos{\\widehat{${korn}}} = \\frac{${sko}}{${hip}} \\\\
                &${sko} = ${hip} \\times \\cos{\\widehat{${korn}}}
                \\end{aligned}
                \\]`;
    } else if (kostezAnavezet === sko && kostezDaJediñ === hip) {
        result = `\\[
                \\begin{aligned}
                &\\cos{\\widehat{${korn}}} = \\frac{${sko}}{${hip}} \\\\
                &${hip} = \\frac{${sko}}{\\cos{\\widehat{${korn}}}} 
                \\end{aligned}
                \\]`;
    } else if (kostezAnavezet === enep && kostezDaJediñ === hip) {
        result = `\\[
                \\begin{aligned}
                &\\sin{\\widehat{${korn}}} = \\frac{${enep}}{${hip}} \\\\
                &${hip} = \\frac{${enep}}{\\sin{\\widehat{${korn}}}} 
                \\end{aligned}
                \\]`;
    } else if (kostezAnavezet === hip && kostezDaJediñ === enep) {
        result = `\\[
                \\begin{aligned}
                &\\sin{\\widehat{${korn}}} = \\frac{${enep}}{${hip}} \\\\
                &${enep} = ${hip} \\times \\sin{\\widehat{${korn}}}
                \\end{aligned}
                \\]`;
    } else if (kostezAnavezet === enep && kostezDaJediñ === sko) {
        result = `\\[
                \\begin{aligned}
                &\\tan{\\widehat{${korn}}} = \\frac{${enep}}{${sko}} \\\\
                &${sko} = \\frac{${enep}}{\\tan{\\widehat{${korn}}}} 
                \\end{aligned}
                \\]`;
    } else {
        result = `\\[
                \\begin{aligned}
                &\\tan{\\widehat{${korn}}} = \\frac{${enep}}{${sko}} \\\\
                &${enep} = ${sko} \\times \\tan{\\widehat{${korn}}}
                \\end{aligned}
                \\]`;
    }

    document.getElementById('jedad').innerHTML = goulenn;

    embannLatex(); // Goulenn evit MathJax.typeset()
}


/**
 *  Krouiñ un tric'horn skouer
 */

function generateSquareTriangle() {

    let m, n;
    let a, b, h;

    m = randomFromInterval(2, 5);

    do {
        n = randomFromInterval(1, m - 1);
    } while (BRB(m, n) !== 1 || (m - n) % 2 === 0);

    let k_array = [0.5, 1.5, 2, 2.5];
    let i = randomFromInterval(0, k_array.length - 1);
    let k = k_array[i];

    a = m ** 2 - n ** 2;
    b = 2 * m * n;
    h = m ** 2 + n ** 2;

    return { a: k * a, b: k * b, h: k * h };

}




