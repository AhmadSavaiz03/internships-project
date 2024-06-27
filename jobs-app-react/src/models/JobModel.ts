class JobModel {
    id: number;
    title: string;
    description: string;
    company: string;
    location: string;
    keywords?: Array<string>;
    date_posted: Date;
    created_at: Date;
    updated_at: Date;

    constructor (id: number, title: string, description: string, company: string, location: string, keywords: Array<string>, date_posted: Date, created_at: Date, updated_at: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.company = company;
        this.location = location;
        this.keywords = keywords;
        this.date_posted = date_posted;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default JobModel;