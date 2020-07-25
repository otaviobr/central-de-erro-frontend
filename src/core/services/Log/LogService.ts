import {http, header} from '../Service';

export default class LogService{
    static Get(item: any){
        return http.post('log/Get', item, header);
    }

    static GetAll(){
        return http.get('log/GetAll', header);
    }

    static ToArchive(logs: any[]){
        return http.put('log/ToArchive', logs, header);
    }

    static ToPrimaryAll(){
        return http.post('log/ToPrimaryAll', header);
    }

    static Delete(logs: any[]){
        return http.post('log/Delete', JSON.stringify(logs), header);
    }

    static SearchFor(env: string, order: string, search: string){
        return http.post(`log/SearchFor?env=${env}&order=${order}&search=${search}`, header);
    }
}