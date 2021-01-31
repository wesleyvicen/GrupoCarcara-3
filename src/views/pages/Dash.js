import Utils from "../../service/Utils.js";
import Auth from "../../service/Auth.js";
import DashBoardService from "../../service/DashboardService.js";

var dataInicio = "";
var dataFim = "";
var tipoMovimentacao = "3";

let Dash = {
  render: async () => {
    let view = `
      <div class="titulo">
          <h2 id="mensagemTitulo">
              Bem-vindo 
          </h2>   
          <div class="acoes">
              <div class="btn-acao" onclick="onClickAutalizarDados()">
                  <i title="Recarregar Dados" class="bi bi-arrow-repeat"></i>
              </div>                
              <div class="btn-acao" onclick="onClickAbrirModalFiltro()">
                  <i title="Filtrar Movimentações" class="bi bi-funnel"></i>
              </div>      
              <div class="btn-acao" onclick="onClickAbrirModalOperacao()">
                  <i title="Movimentar conta" class="bi bi-upc"></i>
              </div>          
              <div class="btn-acao" onclick="onClickAbrirModalTransferencia()">
                  <i title="Realizar Transferência Usuário" class="bi bi-box-arrow-up"></i>
              </div>          
          </div>                
      </div>    
      <div class="contas">
          <div class="row">
              <div class="col-md-6">  
                  <div class="card" style="width: 100%;">
                      <div class="card-body">
                          <h5 class="card-title"><strong>Conta Débito</strong></h5>
                          <h6 class="card-subtitle mb-2 text-muted" id="saldoContaDebito">Saldo: R$&nbsp;0,00</h6>                                                                        
                      </div>
                  </div>
              </div>                
              <div class="col-md-6">  
                  <div class="card" style="width: 100%;">
                      <div class="card-body">
                          <h5 class="card-title"><strong>Conta Crédito</strong></h5>
                          <h6 class="card-subtitle mb-2 text-muted" id="saldoContaCredito">Saldo: R$&nbsp;0,00</h6>                                                                        
                      </div>
                  </div>
              </div>
          </div>                            
      </div>
      <div class="movimentacoes">
          <div class="row">
              <div class="col-md-12">  
                  <div class="card" style="width: 100%;">
                      <div class="card-body">
                          <h5 class="card-title"><strong>Movimentações</strong></h5>
                          <h6 class="card-subtitle mb-2 text-muted" id="lblTipoConta">                                
                          </h6> 
                          <h6 class="card-subtitle mb-2 text-muted" id="Data">                                
                          </h6> 
                          <div class="corpoMovimentacoes" id="corpoMovimentacoes">                                
                          </div>                                
                      </div>
                  </div>
              </div>       
          </div>
      </div>
    `;
    let modais = `
        <div class="modal fade bd-example-modal-lg" id="modalOperacao" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header modalLoaderHeader">
                        <h5 class="modal-title" id="exampleModalLongTitle">Movimentar conta</h5>                                                               
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>
                                    Descrição
                                </label>
                                <input type="text" class="form-control" id="descricaoOperacao">                            
                            </div>    
                            <div class="form-group">
                                <label>
                                    Valor
                                </label>
                                <input type="number" class="form-control" id="valorOperacao">                            
                            </div>    
                            <div class="form-group">
                                <label>
                                    Data Operação
                                </label>
                                <input type="date" class="form-control" id="dataOperacao">                            
                            </div>                        
                            <div class="form-group">
                                <label>
                                    Tipo da Operação
                                </label>
                                <select id="tipoOperacao" class="form-control">
                                    <option value="25">
                                        Recebimento
                                    </option>
                                    <option value="26">
                                        Despesa
                                    </option>
                                    <option value="27">
                                        Transferência de conta débito para crédito
                                    </option>                                
                                </select>
                            </div>
                            <div class="form-group" id="groupTipoContaOperacao">
                                <label>
                                    Conta
                                </label>
                                <select id="tipoContaOperacao" class="form-control">
                                    <option value="Debito">
                                        Débito
                                    </option>
                                    <option value="Credito">
                                        Crédito
                                    </option>                                
                                </select>
                            </div>
                        </form>
                        <h4 class="aviso escondido" id="avisoData">
                            A data inicial precisa ser anterior que a data final
                        </h4>
                    </div>  
                    <div class="modal-footer">                    
                        <button type="button" class="btn btn-primary" onclick="realizarOperacao()">Realizar Operação</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg" id="modalFiltro" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header modalLoaderHeader">
                        <h5 class="modal-title" id="exampleModalLongTitle">Filtro</h5>                                                               
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>
                                    Data Inicial
                                </label>
                                <input type="date" class="form-control" id="dataInicio">                            
                            </div>
                            <div class="form-group">
                                <label>
                                    Data Final
                                </label>
                                <input type="date" class="form-control" id="dataFim">                            
                            </div>
                            <div class="form-group">
                                <label>
                                    Tipo de Conta
                                </label>
                                <select id="tipoConta" class="form-control">
                                    <option value="3">
                                        Todas
                                    </option>
                                    <option value="2">
                                        Débito
                                    </option>
                                    <option value="1">
                                        Crédito
                                    </option>
                                </select>
                            </div>
                        </form>                    
                    </div>  
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="salvarFiltro()">Salvar Filtro</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bd-example-modal-lg" id="modalTransferencia" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header modalLoaderHeader">
                        <h5 class="modal-title" id="exampleModalLongTitle">Transfência entre contas</h5>                                                               
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label>
                                    Descrição
                                </label>
                                <input type="text" class="form-control" id="descricaoTransferencia">                            
                            </div>    
                            <div class="form-group">
                                <label>
                                    Valor
                                </label>
                                <input type="number" class="form-control" id="valorTransferencia">                            
                            </div>    
                            <div class="form-group">
                                <label>
                                    Data Operação
                                </label>
                                <input type="date" class="form-control" id="dataTransferencia">                            
                            </div>   
                            <div class="form-group">
                                <label>
                                    Login da conta para transferir
                                </label>
                                <input type="text" class="form-control" id="loginTransferencia">                            
                            </div>                                                                             
                        </form>
                        <h4 class="aviso escondido" id="avisoData">
                            A data inicial precisa ser anterior que a data final
                        </h4>
                    </div>  
                    <div class="modal-footer">                    
                        <button type="button" class="btn btn-primary" onclick="realizarTransferencia()">Realizar Transferência</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    view += modais;
    return view
  },
  after_render: async () => {
    $(document).ready(function () {
      $("#tipoOperacao").change(function (){
        mudouTipoOperacao();
      });
    })    
    
    let dataAtual = new Date(),
    dataAux = dataAtual.getFullYear().toString() + "-" + ((dataAtual.getMonth() + 1).toString().length == 1 ? "0" + (dataAtual.getMonth() + 1).toString() : (dataAtual.getMonth() + 1).toString()) + "-" + (dataAtual.getDate().toString().length == 1 ? "0" + dataAtual.getDate().toString() : dataAtual.getDate().toString());
    dataInicio = dataAux;
    dataFim = dataAux;
    
    let params = {

      dataInicio: dataAux,
      dataFim: dataAux,
      login: Auth.getAuthLogin(),
      token: Auth.getAuthToken()
    }
    atualizarDados(params);
    
    let nomeUsuario = Auth.getAuthNomeUsuario();
    document.getElementById("mensagemTitulo").innerHTML = "Bem-vindo, " + nomeUsuario + "!";
  }
}

window.mudouTipoOperacao =  () =>{
  let valor = $("#tipoOperacao").val();
  if(valor == "27"){
      $("#groupTipoContaOperacao").toggleClass("escondido", true);
      $("#tipoContaOperacao").val("Debito");
  }
  else{
      $("#tipoContaOperacao").toggleClass("escondido", false);
  }
}

window.onClickAutalizarDados = () =>{
  let params = {
      dataInicio: dataInicio,
      dataFim: dataFim,
      login: Auth.getAuthLogin(),
      token: Auth.getAuthToken()
  };
  atualizarDados(params);
}

window.onClickAbrirModalFiltro= () =>{
  $("#dataInicio").val(dataInicio);
  $("#dataFim").val(dataFim);
  $("#tipoConta").val(tipoMovimentacao);
  $("#modalFiltro").modal("show");
}

window.onClickAbrirModalOperacao = () =>{
  $("#modalOperacao").modal("show");
}

window.onClickAbrirModalTransferencia = () =>{
  $("#modalTransferencia").modal("show");
}

window.realizarOperacao = () =>{
  let descricao = document.getElementById("descricaoOperacao").value,
      valor = document.getElementById("valorOperacao").value,
      data = document.getElementById("dataOperacao").value,
      tipoOperacao = document.getElementById("tipoOperacao").value,
      tipoConta = document.getElementById("tipoContaOperacao").value;
  
  if(!descricao){
      alert("Descrição não pode ficar vazia");
  }
  else if(!valor){
      alert("Valor não pode ficar vazio");
  }
  else if(!data){
      alert("Data não pode ficar vazia");
  }else if(!tipoOperacao){
      alert("Tipo da Operação não pode ficar vazio");
  }
  else if(!tipoConta && tipoOperacao != "27"){
      alert("Tipo de conta não pode ficar vazio");
  }
  else{
      Utils.loader(true);
      //Aqui podemos continuar com a operação
      let userData = Auth.getAuthUserData();      
      let idConta = 0;
      if(tipoConta == "Credito"){
          idConta = userData.conta.id;
      }
      else{
          idConta = userData.contaCredito.id;
      }
      let body = {
        "conta": idConta,
        "contaDestino": "",
        "data": data,
        "descricao": descricao,
        "login": userData.usuario.login,
        "planoConta": Number(tipoOperacao),
        "valor": Number(valor)
      };
        DashBoardService.realizarLancamento(body)
          .then((res) => {
              document.getElementById("descricaoOperacao").value = "";
              document.getElementById("valorOperacao").value = "";
              document.getElementById("dataOperacao").value = "";
              document.getElementById("tipoOperacao").value = "";
              document.getElementById("tipoContaOperacao").value = "";
              $("#modalOperacao").modal("hide");
              onClickAutalizarDados();
          })
          .catch((Err) => {
              console.log(Err);
              Utils.loader(false);
              alert("Ops, algo deu errado");            
          })
  }
  
}

window.realizarTransferencia = () =>{
  let descricao = document.getElementById("descricaoTransferencia").value,
      valor = document.getElementById("valorTransferencia").value,
      data = document.getElementById("dataTransferencia").value,
      loginTransferencia = document.getElementById("loginTransferencia").value;
      
  
  if(!descricao){
      alert("Descrição não pode ficar vazia");
  }
  else if(!valor){
      alert("Valor não pode ficar vazio");
  }
  else if(!data){
      alert("Data não pode ficar vazia");
  }else if(!loginTransferencia){
      alert("Login da conta para transferir não pode ficar vazio");
  }    
  else{
      Utils.loader(true);
      //Aqui podemos continuar com a operação
      let userData = getAuthUserData();
      let token = getAuthToken();
      let idConta = 0;
      if(tipoConta == "Credito"){
          idConta = userData.conta.id;
      }
      else{
          idConta = userData.contaCredito.id;
      }
      let body = {
        "conta": userData.contaCredito.id,
        "contaDestino": loginTransferencia,
        "data": data,
        "descricao": descricao,
        "login": userData.usuario.login,
        "planoConta": 28,
        "valor": Number(valor)
      };
      DashBoardService.realizarLancamento(body)
          .then((res) => {                
              document.getElementById("descricaoTransferencia").value = "";
              document.getElementById("valorTransferencia").value = "";
              document.getElementById("dataTransferencia").value = "";
              document.getElementById("loginTransferencia").value = "";
              $("#modalTransferencia").modal("hide");
              onClickAutalizarDados();
          })
          .catch((Err) => {
              console.log(Err);
              Utils.loader(false);
              alert("Ops, algo deu errado");            
          })
  }
  
}

window.salvarFiltro = () =>{
  let dataInicioInput = $("#dataInicio").val(),
      dataFimInput = $("#dataFim").val(),
      tipoConta = $("#tipoConta").val();
  let dataInicioAux = new Date(dataInicioInput + "T00:00:00"),
      dataFimAux = new Date(dataFimInput + "T00:00:00");
  if(dataInicioAux <= dataFimAux){
      //Aqui está certo
      $("#avisoData").toggleClass("escondido", true);
      dataInicio = dataInicioInput;
      dataFim = dataFimInput;
      tipoMovimentacao = tipoConta;
      $("#modalFiltro").modal("hide");
      onClickAutalizarDados();
  }
  else{
      //Aqui devemos informar que há um erro
      $("#avisoData").toggleClass("escondido", false);
  }
}


window.atualizarDados = (params) =>{
  Utils.loader(true);
  DashBoardService.recuperarDadosDashboard(params)
    .then((res) => {
        montarPagina(res.data);            
    })
    .catch((Err) => {
        console.log(Err);
        Utils.loader(false);
        alert("Ops, algo deu errado");            
    })
}

window.montarPagina = (data) =>{
  //Preencher saldo das contas
  document.getElementById("saldoContaDebito").innerHTML = "Saldo: " + Utils.formatarDinheiro(data.contaBanco.saldo);
  document.getElementById("saldoContaCredito").innerHTML = "Saldo: " + Utils.formatarDinheiro(data.contaCredito.saldo);    

  //Preencher tipoMovimentacao
  let textoMovimentacao = "";
  switch (tipoMovimentacao){
      case "1":
          textoMovimentacao = "Crédito"
          break;
      case "2":
          textoMovimentacao = "Débito"
          break;
      case "3":
          textoMovimentacao = "Todas"
          break;
  }
  document.getElementById("lblTipoConta").innerHTML = "Tipo: " + textoMovimentacao;

  //Preencher as datas filtradas
  let dataInicioFormatada = Utils.formataData(dataInicio),
      dataFimFormatada = Utils.formataData(dataFim),
      textoData = "";
  if(dataInicio == dataFim){
      textoData = "Data: " + dataInicioFormatada;
  }
  else{
      textoData = "Data Inicio: " + dataInicioFormatada + "<br>" + "Data Fim: " + dataFimFormatada;
  }
  document.getElementById("Data").innerHTML = textoData;


  //Prencher as movimentações
  data = prepararMovimentacoes(data);
  let aMovimentacao;    
  if(tipoMovimentacao == "3"){
      aMovimentacao = data.contaBanco.lancamentos.concat(data.contaCredito.lancamentos);
  }
  else if(tipoMovimentacao == "2"){
      aMovimentacao = data.contaBanco.lancamentos;
  }
  else{
      aMovimentacao = data.contaCredito.lancamentos
  }

  //Ordenando os lançamentos em ordem decrescente, do mais novo para o mais antigo
  aMovimentacao = aMovimentacao.sort((a,b) => {
    let dataAAux = new Date(a.data + "T00:00:00"),
        dataBAux = new Date(a.data + "T00:00:00");
    if(dataAAux < dataBAux){
      return 1;
    }    
    else if(dataAAux == dataBAux){
      if(a.id < b.id ){
          return 1;
      }
      else if(a.id == b.id){
          return 0;
      }
      else{
          return -1;
      }
    }
    else{
        return -1;
    }
  })

  let corpoMovimentacoes = document.getElementById("corpoMovimentacoes");  
  corpoMovimentacoes.innerHTML = "";  
  let i = 1;
  for (let movimentacao of aMovimentacao) {
      let strMovimentacao = `
          <div class="movimentacao">
              <h5 class="card-subtitle mb-3 tipoConta">
                  <strong>${movimentacao.tipoConta}</strong>
              </h5>                                                                                       
              <h6 class="card-subtitle mb-2">
                  Valor: ${Utils.formatarDinheiro(movimentacao.valor)}
              </h6>               
              <h6 class="card-subtitle mb-2">
                  Descrição: ${movimentacao.descricao}
              </h6>               
              <h6 class="card-subtitle mb-2 ">
                  Tipo de Movimentação: ${movimentacao.tipo}
              </h6>                                                                                                                                 
              <h6 class="card-subtitle mb-2 ">
                  Data: ${Utils.formataData(movimentacao.data)}
              </h6>   
          </div>
      `;
      corpoMovimentacoes.innerHTML += strMovimentacao;
      if(i < aMovimentacao.length){
          corpoMovimentacoes.innerHTML += `
              <div class="separador">
              </div>
          `;
      }
      i++;
  }
  //Se não tiver nenhuma movimentação na range de data informada.
  if(!corpoMovimentacoes.innerHTML.length){
      let strMovimentacaoFake = `
          <div class="movimentacao">
              <h5 class="card-subtitle tipoConta">
                  <strong>Não há movimentações com os filtros informados</strong>
              </h5>                                                                                                         
          </div>
      `;
      corpoMovimentacoes.innerHTML += strMovimentacaoFake;
  }
  Utils.loader(false);
}

window.prepararMovimentacoes = (data) =>{
  for (let movimentacao of data.contaBanco.lancamentos) {
      movimentacao.tipoConta = "Débito";
  }
  for (let movimentacao of data.contaCredito.lancamentos) {
      movimentacao.tipoConta = "Crédito";
  }
  return data;
}

// let body = {
//   "conta": idConta,
//   "contaDestino": "",
//   "data": data,
//   "descricao": descricao,
//   "login": userData.usuario.login,
//   "planoConta": Number(tipoOperacao),
//   "valor": Number(valor)
// };

export default Dash;