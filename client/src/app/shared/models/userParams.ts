import { Params } from "./params";
import { User } from "./user";

export class UserParams extends Params {
    gender: string;
    minAge = 18;
    maxAge = 35;
    orderBy = 'lastActive';
    override pageSize = 5;

    constructor(user: User) {
        super();
        this.gender = user.gender === 'female' ? 'male' : 'female'
    }
}
