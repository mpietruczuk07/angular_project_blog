export class User {
    private _id: number;
    private _name: string;
    private _username: string;
    private _email: string;
    private _password: string;
    private _role: string;

    constructor(id: number, name: string, username: string, email: string, password: string, role: string) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get username(): string {
        return this._username;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public get role(): string {
        return this._role;
    }

    public set id(id: number) {
        this._id = id;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set username(username: string) {
        this._username = username;
    }

    public set email(email: string) {
        this._email = email;
    }

    public set role(role: string) {
        this._role = role;
    }
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}