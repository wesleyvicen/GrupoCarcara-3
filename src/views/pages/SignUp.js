import baseURL from '../../service/baseURL.js';

function loader(mostrar){
    if(mostrar){
        if(!document.getElementById("modalLoader")){
            let corpo = document.getElementsByTagName("body")[0];
            let modalLoader = `
                <div class="modal fade" id="modalLoader" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-sm ">
                        <div class="modal-content">
                            <div class="modal-header modalLoaderHeader">
                                <h5 class="modal-title" id="exampleModalLongTitle">Carregando...</h5>                                                               
                            </div>
                            <div class="modal-body centralizado">
                                <div class="spinner-border" role="status">                            
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>`;
            corpo.innerHTML += modalLoader;
        }        
        $("#modalLoader").modal("show");
    }    
    else{
        setTimeout(()=>{
            $("#modalLoader").modal("hide");        
        },200)        
    }
}

// função para chamar toda vez que um tecla é pressionada do teclado
function fMasc (objeto,mascara) {
    obj = objeto;
    masc = mascara;
    // configura time out para chamar a função 
    // que determina o tipo de máscara de acordo com o objeto passado
    setTimeout("fMascEx()",1);
}

// função que trata a máscara de acordo com o tipo de entrada
function fMascEx () {
    obj.value = masc(obj.value);
}

// função que mascara o cpf através de RegEx
function mCPF (cpf) {
    cpf = cpf.replace(/\D/g,"");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return cpf;
}


let SignUp = {
    render :async () => {
        let view = `
        <div class="container">
            <div class="content bg-color--yellow content-border--rounded">
                <div class="row mt-5 mb-5">
                    <div class="col-md-6 mt-2">
                        <div class="fluid text-center pt-5">
                            <h2 class="display-6">Tudo digital e de graça</h2>
                            <p class="text-center">A Conta Digital do Banco Carcará é a primeira conta corrente totalmente
                                voltada as pessoas do campo. Com
                                ela, seu banco está na palma da mão 24h, pelo App ou Internet Banking. Sem filas, sem
                                burocracia e sem tarifas.
                            </p>
                        </div>
                        <img class="img-fluid m-auto" width="100%" alt="Imagem resposiva"
                            src="img/signup.png" />
                    </div>
                    <div class="col-md-6 m-auto">
                        <div class="card signup-card">
                            <h2 class="mt-5 mb-4 text-center">Abra agora a sua Conta Digital!</h2>
                            <form class="p-5">
                                <div class="form-group">
                                    <label for="username">Nome</label>
                                    <input type="text" id="username" class="form-control  mb-4">
                                </div>
                                <div class="form-group">
                                    <label for="cpf">CPF</label>
                                    <input type="text" id="cpf" class="form-control  mb-4"
                                        onkeydown="javascript: fMasc( this, mCPF );">
                                </div>
                                <div class=" form-group">
                                    <label for="email">E-mail</label>
                                    <input type="email" id="email" class="form-control  mb-4">
                                </div>
                                <div class="form-group">
                                    <label for="password">Senha</label>
                                    <input type="password" id="password" class="form-control  mb-4">
                                </div>
                                <div class="form-group">
                                    <label for="re_password">Repita a senha</label>
                                    <input type="password" id="re_password" class="form-control  mb-4">
                                </div>
                                <button id="submit_new_register" class="btn btn-warning">Cadastrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        return view;
    },
    after_render :async () => {
        
        // configura um listener para ouvir o clique do boão 'cadastrar' da página
        document.getElementById('submit_new_register').addEventListener('click', () => {
            // carrega os valores dos campos do formulário para dentro do script
            let userName = document.getElementById('username').value,
                userCpf = document.getElementById('cpf').value.replace(/[^\d]/g, ""),
                userEmail = document.getElementById('email').value,
                userPassword = document.getElementById('password').value,
                userRepassword = document.getElementById('re_password').value;
            
            // se os dois campos para senha são iguais, continuar com o envio dos
            // dados para o backend
            if (userPassword === userRepassword) {
                // carrega o loader para dentro da página
                loader(true);
                // realiza um post através do axios passando os dados de cadastro
                axios.post(`${baseURL}usuarios`, {
                    cpf: userCpf,
                    login: userEmail,
                    nome: userName,
                    senha: userPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    // caro a resposta seja OK (200)
                    if (res.status === 200) {
                        // finaliza o loader
                        loader(false);
                        console.log('Status: ', res.status);
                        // redireciona o usuário para a página de login
                        window.location.replace('#/login');
                    }
                }).catch(function (err) {
                    let resp = err.response;
                    let msg = resp.data.error;
                    console.log('Erro: ', err);
                    console.log('Response: ', res);
                    console.log('Response.data: ', res.data);
                    alert(`Não foi possível finalizar cadastro: ${msg}. `);
                    loader(false);
                });
            } else {
                alert('As senhas não correspondem. Confira os dados digitados!');
                // console.log('As senhas não correspondem! Confira os dados digitados');
            }
        });
    }
}

export default SignUp;