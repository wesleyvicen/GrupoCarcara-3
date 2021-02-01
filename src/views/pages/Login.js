import baseURL from '../../service/baseURL.js';
import auth from '../../service/IsAuth.js';
import Utils from '../../service/Utils.js';

let Login = {
    render : async () => {
        let IsAuth = await auth(true, 'dashboard');
        let view = `
        <div class="container">
            <div class="row mt-5 mb-5">
                <div class="col-md-6">
                    <img class="img-fluid m-auto d-none d-md-block" width="100%" alt="Imagem resposiva" src="./img/login.png" />
                </div>
                <div class="col-md-6 mx-auto">
                    <div class="card signup-card pt-xl-4 pb-xl-5">
                        <h2 class="mt-5 mt-md-3 mt-lg-5 mb-lg-4 text-center">Faça seu login</h2>
                        <form class="px-5 pb-5 py-xl-5 pb-md-5 pt-lg-4 pb-lg-5">
                            <div class="form-group">
                                <label for="usuario">Usuário</label>
                                <input type="text" id="usuario" class="form-control mb-lg-4">
                            </div>
                            <div class="form-group">
                                <label for="senha">Senha</label>
                                <input type="password" id="senha" class="form-control mb-lg-4">
                            </div>
                            <div class="form-group form-check">
                                <input type="checkbox" id="manterConectado" class="form-check-input">
                                <label class="form-check-label" for="manter">Me mantenha conectado</label>
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-lg-6">
                                    <input type="button" value="Entrar" id="submit_login" class="btn btn-warning w-100 my-1">
                                </div>
                                <div class="col-md-12 col-lg-6">
                                    <a href="#/signup" id="new_register" class="btn btn-warning w-100 my-1">Cadastrar</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;

        return view;
    },
    after_render :async () => { 
        document.getElementById('submit_login').addEventListener('click', () => {
            let usuario = document.getElementById('usuario').value,
            senha = document.getElementById('senha').value
            
            if( usuario.length >= 4 && senha.length >= 4 ){
                  Utils.loader(true);
                  axios.post(`${baseURL}login`, {
                        usuario: usuario,
                        senha: senha
                  }).then( res => {
                        if (res.status == 200 ){
                            Utils.loader(false);
                              /*
                              Por falta de recursos da API, não é possível realmente implementar a funcionalidade
                              de manter a conexão, pois o token possui uma validade limitada e não há como 
                              reautenticar o usuário sem manter a senha salva, o que seria uma grave falha de segurança
                              */
                            //  if(flagKeepCon.checked){
                            //        localStorage.setItem('@token', res.data.token)
                            //        localStorage.setItem('userDataAccount', JSON.stringify(res.data))
                            //   }else{
                                //         sessionStorage.setItem('@token', res.data.token)
                                //         sessionStorage.setItem('userDataAccount', JSON.stringify(res.data))
                                //   }
                            localStorage.setItem('@token', res.data.token)
                            localStorage.setItem('userDataAccount', JSON.stringify(res.data))
                            window.location.replace('#/dashboard')
                        }
                        
                        
                  }).catch( function(err){
                        let res = err.response
                        console.log('res', err)
                        let message = res.data.error
                        console.log('Erro: ', err)
                        console.log('Response: ', res)
                        console.log('Response.data: ', res.data)
                        alert(`
                        Não foi possível realizar o login:
                        -> ${message}
                        
                        Verifique os dados e tente novamente.`)
                        Utils.loader(false);
                  })
                  
                  
            } else {
                  alert('Confira sua senha!')
            }
      });
    }
}

export default Login;