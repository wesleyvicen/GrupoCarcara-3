const AuthService = {
    getIsAuth: () => {
        let token = localStorage.getItem('@token') || sessionStorage.getItem('@token');
        return !!token;
    },
    
    getAuthToken: () => {
        return localStorage.getItem("@token") || sessionStorage.getItem("@token");
    },
    
    getAuthLogin: () => {
        let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount")|| sessionStorage.getItem("userDataAccount"));
        return usuarioLogado.usuario.login;
    },
    
    getAuthNomeUsuario: () => {
        let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount") || sessionStorage.getItem("userDataAccount"));
        return usuarioLogado.usuario.nome.split(' ')[0];
    },
    
    getAuthUserData: () => {
        let usuarioLogado = JSON.parse(localStorage.getItem("userDataAccount") || sessionStorage.getItem("userDataAccount") );
        return usuarioLogado;
    },
    
    getAuthConta: () => {
        let usuarioLogado = getAuthUserData();
        const {conta} = usuarioLogado;
        return conta;
    },
    
    clearAuth: () => {
        localStorage.clear();
        sessionStorage.clear();
    }
}
export default AuthService;