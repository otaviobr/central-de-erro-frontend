import {http, header} from '../Service';

export default class LogService{
    static ListarTodos(){
        return http.get('log/GetAll', header);
    }

    static Arquivar(logs: any[]){
        return http.put('log/ToArchive', logs, header);
    }

    static DesarquivarTodos(){
        return http.post('log/ToPrimaryAll', header);
    }

    static Deletar(logs: any[]){
        return http.post('log', logs, header);
    }
}