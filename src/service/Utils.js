const Utils = {
    parseRequestURL: () => {
        let url = location.hash.slice(1).toLocaleLowerCase() || '/';
        let r = url.split('/')
        let request = {
            resource: null,
            id: null,
            verb: null
        }

        request.resource = r[1]
        request.id = r[2]
        request.verb = r[3]

        return request 
    },

    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    },

    loader: (mostrar) => {
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
    },

    formataData: (strData) => {
        let aData = strData.split('-');
        return aData[2] + "/" + aData[1] + "/" + aData[0];
    },
    
    formatarDinheiro: (dinheiro) =>{
        dinheiro = dinheiro.toLocaleString ('pt-br', {style:'currency', currency:'BRL'});
        return dinheiro;
    },
    
    fazerLogout: () => {
        clearAuth();
        window.location.replace("#/Login")
    },

    // função para chamar toda vez que um tecla é pressionada do teclado
    fMasc: function (objeto) {
        let obj = objeto;
        let masc = this.mCPF(obj.value);
        objeto.value = masc;
        
    },

    // função que mascara o cpf através de RegEx
    mCPF: function (cpf) {
        cpf = cpf.replace(/\D/g,"");
        cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/,"$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
        return cpf;
    }

}
export default Utils;
