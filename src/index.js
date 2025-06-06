const { createReadStream } = require("fs");
const { join } = require("path");
const { createInterface } = require("readline");

const caminho = join(__dirname, "data", "itens_supermercado.csv");
const interface = createInterface({
    input: createReadStream(caminho),
});

let contador = 1;
let somaAcougue = 0;
interface.on("line", function (linha) {
    if (contador > 1) {
        const partes = linha.split(";");
        const item = {
            descricao: partes[1],
            quantidadeEmEstoque: Number(partes[2]),
            precoUnitario: Number(partes[3]),
            categoria: partes[4],
        };
        const precoTotaItens = item.quantidadeEmEstoque * item.precoUnitario;
        if (item.categoria === "açougue") {
            somaAcougue = somaAcougue + precoTotaItens;
        }
    }
    contador++;
});

// Executa após processar todo o arquivo
interface.on("close", function () {
    // Imprima aqui os resultados
    console.log(` Total/ Açougue; ${somaAcougue}`)
});



