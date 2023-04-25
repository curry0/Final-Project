

import { Photo } from "./photo";
import { Address } from "./user";

export interface Member {
    email: string;
    displayName: string;
    age: number;
    knownAs: string;
    created: string;
    lastActive: string;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    photoUrl: string;
    address: Address;
    photos: Photo[];
}
