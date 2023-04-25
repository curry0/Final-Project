import { Params } from "./params";
import { User } from "./user";

export class UserParams extends Params {
    gender: string;
    minAge = 14;
    maxAge = 99;
    orderBy = 'lastActive';
    override pageSize = 5;

    constructor(user: User) {
        super();
        this.gender = user.gender === 'female' ? 'male' : 'female'
    }
}
