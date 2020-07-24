import {http, header} from '@/core/services/Service';

export default class AuthenticateService{
    public Login(email: string, password: string){
        return http.post('authentication/login', {email, password}, header);
    }
}