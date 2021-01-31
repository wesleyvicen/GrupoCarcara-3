const AuthService = {
    getIsAuth: function ()  {
        let token = localStorage.getItem('@token') || sessionStorage.getItem('@token');
        return !!token;
    },
    
    getAuthToken: function ()  {
        return localStorage.getItem("@token") || sessionStorage.getItem("@token");
    },
    
    getAuthLogin: function ()  {
        let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount")|| sessionStorage.getItem("userDataAccount"));
        return usuarioLogado.usuario.login;
    },
    
    getAuthNomeUsuario: function ()  {
        let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount") || sessionStorage.getItem("userDataAccount"));
        return usuarioLogado.usuario.nome.split(' ')[0];
    },
    
    getAuthUserData: function () {
        let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount") || sessionStorage.getItem("userDataAccount") );
        return usuarioLogado;
    },
    
    getAuthConta: function () {
        let usuarioLogado = this.getAuthUserData();
        const {conta} = usuarioLogado;
        return conta;
    },
    
    clearAuth: function ()  {
        localStorage.clear();
        sessionStorage.clear();
    }
}
export default AuthService;