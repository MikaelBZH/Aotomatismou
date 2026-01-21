function kemmadur(niver, lizherenn) {

    unanenn = niver % 10;
    degad = Math.floor(niver / 10);

    if (degad == 1 || degad == 7 || degad == 9) {
        return lizherenn;
    } else {
        switch (unanenn) {
            case 2:
                switch (lizherenn) {
                    case "k": return "g"; break;
                    case "m": return "v"; break;
                    case "d": return "z"; break;
                    default: return lizherenn;
                }
            case 1:
            case 3:
            case 4:
            case 9:
                if (lizherenn == "k") {
                    return "c'h";
                } else {
                    return lizherenn;
                }
                break;
            default: return lizherenn;
        }
    }
}

function embannLatex() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function diskouezRespont(latex) {
    // Kemer ar bouton ha kousket anezhañ
    const respontBtn = document.getElementById("respontBtn");
    respontBtn.style.display = "none";

    // Diskouez ar varienn "result"
    document.getElementById('respontArea').innerHTML = latex;
    respontArea.style.display = "inline-block";

    // Ma vez implijet MathJax (evit jedadennoù gant \\( \)), azgoulenn un adrannañ
    embannLatex();
}

function latexToPlain(expr) {
    return expr
        .replace(/^\\\(|\\\)$/g, '')   // retire \( et \)
        .replace(/\\\\/g, '')          // retire les doubles antislashs éventuels
        .replace(/\s+/g, '')           // retire les espaces
        .replace(/\^2/g, '²');         // uniformise les puissances
}

function cleanUserInput(input) {
    return input
        .toUpperCase()
        .replace(/\s+/g, '')           // supprime les espaces
        .replace(/\^2/g, '²');         // accepte aussi ^2 comme notation
}

function equivalentAlgebrite(userExpr, correctExpr) {
    // Nettoyage de base (enlève LaTeX, espaces, etc.)
    const plainUser = cleanUserInput(userExpr);
    const plainCorrect = latexToPlain(correctExpr);

    // Transforme AB² → _AB^2, et BA² → _AB^2 aussi (ordre alphabétique)
    const prepareForAlgebrite = expr =>
        expr
            .replace(/([A-Z])([A-Z])/g, (match, a, b) => {
                // Trie les lettres pour que AB = BA
                const letters = [a, b].sort().join('');
                return '_' + letters;
            })
            .replace(/²/g, '^2')   // remplace le symbole carré par ^2
            .replace(/\s+/g, '');  // supprime les espaces

    const u = prepareForAlgebrite(plainUser);
    const c = prepareForAlgebrite(plainCorrect);

    try {
        // Sépare gauche/droite des deux équations
        const [uLeft, uRight] = u.split('=');
        const [cLeft, cRight] = c.split('=');

        if (!uLeft || !uRight || !cLeft || !cRight) return false;

        // Met sous forme "gauche - droite"
        const userDiff = `(${uLeft}) - (${uRight})`;
        const correctDiff = `(${cLeft}) - (${cRight})`;

        // Simplifie les deux côtés
        const simplifiedUser = Algebrite.run(`simplify(${userDiff})`);
        const simplifiedCorrect = Algebrite.run(`simplify(${correctDiff})`);

        // Compare les deux (égalité symbolique)
        const diff = Algebrite.run(`simplify((${simplifiedUser}) - (${simplifiedCorrect}))`);

        // Si c’est 0, les deux équations sont équivalentes
        return diff.trim() === '0';
    } catch (err) {
        console.error("Erreur Algebrite:", err);
        return false;
    }
}

function checkAnswer() {
    const userInput = document.getElementById("userAnswer").value;
    const resultArea = document.getElementById("respontArea");

    if (equivalentAlgebrite(userInput, result)) {
        resultArea.innerHTML = "<span style='color:green'>✅ Mat eo !</span>";
    } else {
        resultArea.innerHTML = `<span style='color:red'>❌ N'eo ket reizh.</span><br>Respont reizh: ${result}`;
    }

    resultArea.style.display = "block";
    embannLatex();
}
