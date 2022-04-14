let nomeUsuario = "";
let mensagens = [];
let conteudo = document.querySelector(".container")
enviarNome();


function enviarNome(){
    nomeUsuario = prompt("Digite seu username")
    
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', {name:nomeUsuario});
    
    promise.then(nameAceito);
    promise.catch(tratarErro);
}    


function nameAceito(){
    alert ("Nome cadastrado com sucesso");
    carregarMensagens()
    
}
setInterval(manterLogado, 5000);


function tratarErro(){
    alert ("Este nome de usuário já existe, tente outro.");
    enviarNome();
 }

 function manterLogado(){
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', {name:nomeUsuario});
    
}

setInterval(carregarMensagens, 3000);
function carregarMensagens(){
    let promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promise.then((response) => {
        mensagens = response.data;
         conteudo.innerHTML = "";

        for(i=0; i < mensagens.length; i++){
      
            if (mensagens[i].type === "status"){
                conteudo.innerHTML += `
                <div class="status">
                <span>${mensagens[i].time}</span>
                <span>${mensagens[i].from}</span> 
                <span>${mensagens[i].text}</span>         
                </div>
                `
            }else if(mensagens[i].type === "message"){
                conteudo.innerHTML += `
                <div class="message">
                    <span>${mensagens[i].time}</span>
                    <span>${mensagens[i].from} </span> 
                    <span> para ${mensagens[i].to} : </span>
                    <span>${mensagens[i].text}</span>         
                </div>
                `
            }else if (mensagens[i].to === nomeUsuario){
                conteudo.innerHTML += `
                <div class="private">
                    <span>${mensagens[i].time}</span>
                    <span>${mensagens[i].from} </span> 
                    <span> reservadamente para ${mensagens[i].to} : </span>
                    <span>${mensagens[i].text}</span>         
                </div>
                `
            }
        }
        //let lastMessage = conteudo.children[mensagens.length-1];

        console.log(conteudo.children[mensagens.length -1])
    })
}

function sendMessage(){
    let sendText = document.querySelector("input")
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', 
    {
        from: nomeUsuario,
        to: "Todos",
        text: sendText.value,
        type: "message" 
    })
    sendText.value = ""
    promise.then((response) => carregarMensagens())
    promise.catch((error) => window.location.reload())
}






