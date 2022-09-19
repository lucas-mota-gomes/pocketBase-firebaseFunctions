// import { IAuthUser } from "./session.model";
import env from '../../../environment';
import { IAuthUser, ILoginUser, IUser } from './session.model';
import axios from 'axios';

export default class SessionService {

    public async getUser(): Promise<any>{
        const records = await env.client.records.getFullList('user', 200 /* batch size */, {
            sort: '-created'
        });
        return records;
    }

    public async loginUser(user: ILoginUser): Promise<any>{
        const authData = await env.client.users.authViaEmail(user.email, user.password);
        return authData;
    }

    public async createAuthUser(userData: IAuthUser): Promise<any>{
        const user = await env.client.users.create({
            email: userData.email,
            password: userData.password,
            passwordConfirm: userData.passwordConfirm ? userData.passwordConfirm : userData.password
        });
        
        return user;
    }

    public async updateUser(userData: any): Promise<any>{
        const updatedProfile = await env.client.records.update('profiles', userData.profile.id, {
            userData
        });
        
        return updatedProfile;
    }

    public async sendVerificationEmail(email:string): Promise<any>{
        const verificationEmail = await env.client.users.requestVerification(email);
        
        return verificationEmail;
    }
    

    public async createUser(user: IUser): Promise<any>{
        const record = await env.client.records.create('user', user);
        return record;
    }

    public async deleteUser(person: any): Promise<any>{
        const created = await env.client;
        return created;
    }

    public async verifyIdToken(token: string) {
        const newAuthData = await axios.post(env.pocketBasteUrl + '/api/users/refresh', {}, {headers: { 
            'Authorization': `User ${token}`, 
            'Content-Type': 'application/json'
          }
        })
        return newAuthData.data;
    }

}