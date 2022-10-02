var palavras = ["monza", "damasco", "onepiece", "vovozona", "vasco_da_gama","napoli"];
var dicas = ["Automovél", "Fruta", "Desenho", "Filme", "Time","Lugar"];
var palavra = [];
var mostra = [];
var tentativas = 6;
var quantidadeDeLetras = 0;
var letrasDigitadas = [];

//aqui vamos conferir se a tecla presionada contra na palavra ou frase sorteada.
function jogar(entrada){


    saida = document.querySelector("#saida");
    

    //aqui informa se o jogador ganhou.
    if(quantidadeDeLetras == 0){
        document.getElementById("mensagem").style.display = "block";
        document.getElementById("alerta").innerHTML = "parabéns, você acertou!";
    }
    //aqui informa se o jogador perdeu.
    else if(tentativas == 0){
        document.getElementById("mensagem").style.display = "block";
        document.getElementById("alerta").innerHTML = "VOCÊ PERDEU:\n A palavra era: "+palavra.join("");
    }
    else{

        let verificar = true;
        for (let l = 0; l < letrasDigitadas.length; l++) {
            if(letrasDigitadas[l] == entrada){
                verificar = false;
                break;
            }
        }

        if(verificar == true){
            saida.innerHTML = "";

            //aqui capturamos as imagens a serem tratadas no jogo.
            let chances = [];
            for(let i = 1; i <= 6; i++){
                chances.push(document.getElementById("i"+i));
            }

            //aqui verificamos se a tecla presionada conta na palavra ou frase sorteada
            let encontrada = false;
            for (let i = 0; i < palavra.length; i++) {
                if(palavra[i] == entrada){
                    mostra[i] = entrada;
                    quantidadeDeLetras--;
                    encontrada = true;
                }
            }

            //aqui remontamos a palavra que será exibida para o jogador com o resultado.
            for(let a = 0; a < mostra.length; a++){
                if(mostra[a] == " "){
                    saida.innerHTML += "&nbsp;&nbsp;";
                }
                else if(mostra != "_"){
                    saida.innerHTML += mostra[a]+" ";
                }
                else{
                    saida.innerHTML += "_&nbsp;"; }
            }

            //aqui se a letra não foi encontrada, penaliza o jogador mostrando formando mais um pedaço do desenho da forca.
            if(encontrada == false){
                chances[tentativas - 1].style.display = "block";
                tentativas--;
            }

            //aqui adicionamos a letra digitada.
            letrasDigitadas.push(entrada);
            let motrasgem = letrasDigitadas.join(' ');
            document.querySelector("#letras").innerHTML = motrasgem;
        }
    }
}

//aqui vamos sortear uma nova palavra ou frase.
function seletor(){
    var saida = document.getElementById("saida");
    saida.innerHTML = "";
    let numero = Math.round(Math.random() * palavras.length - 1);
    let negativo = 0;
    if(numero == -1){ numero = 0; }
    palavra = palavras[numero].split("");
    for(let i = 0; i < palavra.length; i++){
        if(palavra[i] == "_"){
            mostra.push(" ");
            saida.innerHTML += "&nbsp;&nbsp;";
            negativo++;
        }
        else{
            mostra.push("_");
            saida.innerHTML += "_&nbsp;"; }
    }
    quantidadeDeLetras = palavra.length - negativo;

    document.querySelector("#dicas").innerHTML = "Dica: "+dicas[numero];
    
    //aqui é apenas um debug :)
    console.log(palavra);
    console.log(quantidadeDeLetras);

}

//aqui vamos capturar a tecla presionada.
function tecla(evt){
    evt = evt || window.event;
    var key = evt.keyCode || evt.which;
    return String.fromCharCode(key); 
}

//aqui aciona a função jogar assim que uma tecla for acionada.
document.onkeypress = function(evt) {
    var str = tecla(evt);
    jogar(str);
};

function add(){
    let input1 = document.getElementById("palavra");
    let input2 = document.getElementById("dicaPalavra");
    if(input1.value == ""){
        document.getElementById("men").innerHTML = "o campo palavra não pode estar em branco";
    }
    else if(input2.value == ""){ 
        document.getElementById("men").innerHTML = "o campo dica não pode estar em branco";
    }
    else{
        palavras = palavras.push(input1.value); 
        dicas = dicas.push(input2.value);
        document.getElementById("men").innerHTML = "palavra adicionada com sucesso!";
    }
}

function pgadd(){
    document.getElementById("add").style.display = "";
    document.getElementById("mensagem").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("palavra").focus();
}

function pgstart(){
    document.getElementById("add").style.display = "none";
    document.getElementById("mensagem").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("start").style.display = "";
}

function pggame(){
    document.getElementById("add").style.display = "none";
    document.getElementById("mensagem").style.display = "none";
    document.getElementById("game").style.display = "";
    document.getElementById("start").style.display = "none";
    palavra.length = 0;
    mostra.length = 0
    letrasDigitadas.length = 0;
    tentativas = 6;
    seletor();
}