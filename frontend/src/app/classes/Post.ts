export class Post {
    private _id: number;
    private _title: string;
    private _category: string;
    private _content: string;
    private _date: Date;
    private _author: string;
    private _image: string;

    constructor(id: number, title: string, category: string, content: string, date: Date, author: string, image: string) {
        this._id = id;
        this._title = title;
        this._category = category;
        this._content = content;
        this._date = date;
        this._author = author;
        this._image = image;
    }

    public get id(): number {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }

    public get category(): string {
        return this._category;
    }

    public get content(): string {
        return this._content;
    }

    public get date() {
        let retDate = '';
        let tmp = this._date.getDate();
        tmp < 10 ? retDate = '0' + tmp : retDate += tmp;
        tmp = this._date.getMonth() + 1;
        tmp < 10 ? retDate += '0' + tmp : retDate += '-' + tmp;
        retDate += '-' + this._date.getFullYear();

        return retDate;
    }

    public get author() {
        return this._author;
    }

    public get image() {
        return this._image;
    }

    public getReqContent(reqLength: number): string {
        return this._content.substring(0, reqLength) + '...';
    }

    public set title(title: string) {
        this._title = title;
    }

    public set category(category: string) {
        this._category = category;
    }

    public set content(content: string) {
        this._content = content;
    }

    public set addDate(date: Date) {
        this._date = date;
    }

    public set author(author: string) {
        this._author = author;
    }

    public set image(image: string) {
        this._image = image;
    }
}