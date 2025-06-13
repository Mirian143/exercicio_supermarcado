const { createReadStream } = require("fs");
const { join } = require("path");
const { createInterface } = require("readline");

const caminho = join(__dirname, "data", "itens_supermercado.csv");
const interface = createInterface({
    input: createReadStream(caminho),
});

let contador = 1;
let somaAcougue = 0;
const valoresAcougue = [];
let somaHigienePessoal = 0;
const valoresHigienePessoal = [];
let somaLimpezaDomiciliar = 0;
const valoresLimpezaDomiciliar = [];
let somaVegetais = 0;
const valoresVegetais = [];
let somaAlimentosIndustralizados = 0;
const valoresAlimentosIndustrializados = [];
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
            valoresAcougue.push(precoTotaItens);
        }
        if(item.categoria === "higiene pessoal") {
            somaHigienePessoal = somaHigienePessoal + precoTotaItens;
            valoresHigienePessoal.push(precoTotaItens);
        }
        if(item.categoria === "limpeza domiciliar"){
            somaLimpezaDomiciliar = somaLimpezaDomiciliar + precoTotaItens;
            valoresLimpezaDomiciliar.push(precoTotaItens);
        }
        if(item.categoria === "vegetais") {
            somaVegetais = somaVegetais + precoTotaItens;
            valoresVegetais.push(precoTotaItens)
        }
        if (item.categoria === "alimentos industrializados"){
            somaAlimentosIndustralizados = somaAlimentosIndustralizados + precoTotaItens;
            valoresAlimentosIndustrializados.push(precoTotaItens)
        }
    }
    contador++;
});

function media (numeros) {
    let soma = 0;
    for(let i = 0; i < numeros.length; i++) {
        soma += numeros[i];
    }
    return soma / numeros.length;
}

function variancia (numeros) {
    let soma = 0;
    const mediaNumeros = media(numeros);
    for(let i = 0; i < numeros.length; i++){
        const n = numeros[i];
        soma += Math.pow(n- mediaNumeros, 2);
    }
    return soma / (numeros.length -1);
}


function desvioPadrao(numeros) {
    return Math.sqrt(variancia(numeros));
}

// Executa após processar todo o arquivo
interface.on("close", function () {
    // Imprima aqui os resultados
    console.log(` Total/ Açougue; ${somaAcougue}`)
    console.log(` Total/ Higiene Pessoal; ${somaHigienePessoal}`)
    console.log(` Total/ Limpeza Domiciliar; ${somaLimpezaDomiciliar}`)
    console.log(` Total/ Vegetais; ${somaVegetais}`)
    console.log(`Total/ Alimentos Industrializados; ${somaAlimentosIndustralizados}`);
    
    const desvioPadraoAcougue = desvioPadrao(valoresAcougue);
    console.log("Desvio Padrão do Açougue: " + desvioPadraoAcougue)

    const desvioPadraoHigiene = desvioPadrao(valoresHigienePessoal);
    console.log("Desvio Padrão da Higiene Pessoal: " + desvioPadraoHigiene);

    const desvioPadraoLimpezaPessoal = desvioPadrao(valoresLimpezaDomiciliar);
    console.log("Desvio Padrão da Limpeza Pessoal: " + desvioPadraoLimpezaPessoal);

    const desvioPadraoVegetais = desvioPadrao(valoresVegetais);
    console.log("Desvio Padrão dos vegetais: " + desvioPadraoVegetais);

    const desvioPadraoAlimentosIndustrializados = desvioPadrao(valoresAlimentosIndustrializados);
    console.log("Desvio Padrão dos Alimentos Industrializados: " + desvioPadraoAlimentosIndustrializados);

    
    
});



