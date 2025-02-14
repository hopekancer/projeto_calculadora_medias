const form = document.getElementById("form-atividade") //atribui a constante form o direito sobre o elemento com o id "form-atividade" 
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"/>'//variavel que carrega as informacoes que sao referentes a localizacao dos emojis no html
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>'//essas variaveis vao ser usadas para retornrar na funcao abaixo

const atividades = []//arrays qua vao armazenar os nomes e as notas das atividades
const notas = []

const spanAprovado = `<span class="resultado aprovado">Aprovado</span>` //substituem o conteudo hardcoded no html
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`

const notaMinima = parseFloat(prompt(`Digite a nota minima:`)) //pergunta a nota minima ao iniciar o carregamento da pagina

let linhas = ""//variavel global que vai ser usada pelas funcoes abaixo para conter o numero de linhas adicionais que forem necessarias - ela precisa estar no global pq se ela estiver dentro da funcao ela vai perder o conteudo que armazenou e esta concatenando toda vez q a funcao iniciar novamente a cada submit que o event listener ouvir
form.addEventListener('submit', function(e) {//adiciona ao elemento selecionado um listener que é acionado quando o valor "submit for acionado"
                                            //como um parametro de dessa funcao addEventListener foi criada uma funcao function() com parametro e
    e.preventDefault()//e quando acionado pelo event listener, previne o comportamento nativo do "submit"
    //depois de pronto, a logica foi refatorada em funcoes diferentes para cada acao
    adicionaLinha()//chama a funcao que adiciona uma linha
    atualizaTabela()//chama a funcao que atualiza a tabela
    atualizaMediaFinal()//chama a funcao que atualiza a media
})

function adicionaLinha() {//cria uma funcao para adicionar uma linha
    const inputNomeAtividade = document.getElementById("nome-atividade")//atribui a constante inputNomeAtividade o controle sobre o elemento de id "nome-atividade"
    const inputNotaAtividade = document.getElementById("nota-atividade")//atribui a constante inputNotaAtividade o controle sobre o elemento de id "nota-atividade"

    if (atividades.includes(inputNomeAtividade.value)) {//se a array atividades ja incluir o valor do input nome da atividade
        alert(`a atvidade ${inputNomeAtividade.value} ja foi inserida`)//dispara o alerta
    } else { //senao roda a logica de adicionar linha
        atividades.push(inputNomeAtividade.value)//adiciona o novo valor do nome da atividade a linha a array dos nomes das atividades
        notas.push(parseFloat(inputNotaAtividade.value))//adiciona o novo valor da nota a nova linha

        let linha = `<tr>` //nova variavel linha com o valor de uma string q remete a uma possivel table row, uma nova linha que pode ser posteriormente adicionada ao html
        linha += `<td>${inputNomeAtividade.value}</td>`//concatena este e os outros valores abaixo para posteriormente adicionar no HTML
        linha += `<td>${inputNotaAtividade.value}</td>`
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`//um if else ternario que compara o valor da variavel inputNotaAtividade se for maior que 7, retorna a string "Aprovado", senao retorna a string "reprovado" como conteudo dessa celula, dessa tag <td>
        linha += `</tr>`//fecha a linha

        linhas += linha//concatena o valor da nova linha a variavel global linhas que esta armazenando todas as linhas
    }
    inputNomeAtividade.value = ''//reseta os campo input nome atividade
    inputNotaAtividade.value = ''//reseta os campo input nota atividade
}

function atualizaTabela() {//cria a funcao que atualiza a tabela
    const corpoTabela = document.querySelector('tbody')//cria a variavel corpoTabela que controla o elemento tbody
    corpoTabela.innerHTML = linhas//atribui o valor da variavel linha (que eh aquela sessaod e tabela, um <tr> com tres <td> dentro ali em cima, ja com a verificacao e os valores atualizados) ao elemento controlado pela constante corpoTabela
}

function atualizaMediaFinal() {//cria a funcao que atualiza a media
    const mediaFinal = calculaMediaFinal() //a varaivael media final recebe o valor o retorno da funcao calculaMediaFinal()
    
    document.getElementById('media-final-valor').innerHTML = mediaFinal //insere o valor da media final no elemento controlado pela id
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado //compara o valor da media final no elemento controlado pela id e decide por um ou outra variavel de resuiltado
}

function calculaMediaFinal() {
    let somaDasNotas = 0//variavel que vai armazenar a soma das nodas, com o valor 0

    for (let i = 0; i < notas.length; i++) {//laco que vai percorrer a array notas 
        somaDasNotas += notas[i]//adiciona o valor da nota a somaDasNotas
    }

    return somaDasNotas / notas.length //retorna a media entre a somaDasNotas e o numero de elementos em notas[]
}