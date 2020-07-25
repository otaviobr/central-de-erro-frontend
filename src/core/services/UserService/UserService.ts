import {http, header} from '../Service';

export default class UserService{
    static FirstStepRecover(email: any){
        return http.post('user/FirstStepRecover', JSON.stringify(email), header);
    }

    static SecondStepRecover(id: number, password: any){
        +id;
        const rec = {id, password};
        return http.post('user/SecondStepRecover', JSON.stringify(rec), header);
    }
}