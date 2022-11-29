export class Profile {
    private _id: number;
    private _photo_url: string;
    private _description: string;

    constructor(id: number, photo_url: string, description: string) {
        this._id = id;
        this._photo_url = photo_url;
        this._description = description;
    }

    public get id(): number {
        return this._id;
    }

    public get photo_url(): string {
        return this._photo_url;
    }

    public get description(): string {
        return this._description;
    }

    public set id(id: number) {
        this._id = id;
    }

    public set photo_url(photo_url: string) {
        this._photo_url = photo_url;
    }

    public set description(description: string) {
        this._description = description;
    }
}
