import AuthService from "../../service/Auth.js";
import Utils from "../../service/Utils.js";

let Nav = {
      render : async () => {
            let IsAuth = AuthService.getIsAuth();
            let conta = undefined;
            if(IsAuth){
                  conta = AuthService.getAuthConta();
            }
            let view = `
                  <header class="align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                        <nav class="navbar navbar-expand-lg navbar-light">
                              <div class="container m-auto" width="100%">
                                    <a class="navbar-brand" href="#">
                                          <img src="img/logo.png" class="img-fluid" width="200px" alt="">
                                    </a>
                                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                                          <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarNav">
                                          <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                                                <li class="nav-item">
                                                      <a class="nav-link" aria-current="page" href="#/">Home</a>
                                                </li>
                                                ${!IsAuth?(`
                                                      <li class="nav-item">
                                                            <a class="nav-link" href="#/Login">Login</a>
                                                      </li>
                                                      <li class="nav-item">
                                                            <a class="nav-link" href="#/Signup">SignUp</a>
                                                      </li>
                                                </ul>
                                                <div class="d-flex flex-row-reverse bd-highlight">
                                                      <div class="p-2 bd-highlight">
                                                            <a href="#/LogIn" class="linkSair">
                                                                  <button id="start_session" class="btn btn-secondary">
                                                                        Login
                                                                  </button>
                                                            </a>
                                                      </div>
                                                </div>
                                                `):''}
                                                ${IsAuth?(`
                                                <li class="nav-item">
                                                      <a class="nav-link" href="#/Dashboard">Dashboard</a>
                                                </li>
                                          </ul>
                                    <div class="d-flex flex-row-reverse bd-highlight">
                                          <div class="p-2 bd-highlight">
                                                <button id="destroy_session" onclick="" type="button" class="btn btn-secondary" >
                                                      Sair
                                                </button>
                                          </div>                                
                                    </div>
                                          `):''}
                                    </div>
                              </div>
                        </nav>
                  </header>
            `;

            return view;
      },

      after_render : async () => {                  
            if(document.getElementById('destroy_session')){
                  document.getElementById('destroy_session').addEventListener('click', function(){
                        Utils.fazerLogout();
                  })
            }                  
      }
}

export default Nav;