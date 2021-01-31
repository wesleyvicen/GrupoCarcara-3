import baseURL from "./baseURL.js";
import Auth from "./Auth.js";

const DashBoardService = {
    options: {
        headers:{
            Authorization: Auth.getAuthToken()
        },          
    },
    realizarLancamento: (body) => {
        return axios.post(baseURL + "lancamentos", body, this.options)            
    },
    recuperarDadosDashboard: (params) => {
        let dataInicio = "?inicio=" + params.dataInicio,
        dataFim = "&fim=" + params.dataFim,
        login = "&login=" + params.login;
        return axios.get(baseURL + "dashboard" + dataInicio + dataFim + login, {
            headers:{
                Authorization: params.token
            }
        })
    }
}
export default DashBoardService;