export interface User {
    email: string;
    displayName: string;
    token: string;
    photoUrl: string;
    gender: string;
    roles: string[];
    username: string;
}

export interface Address {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;

}
