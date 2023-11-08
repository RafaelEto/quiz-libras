export interface Question {
    _id: string,
    video_url: string
    answers: {
        a: string;
        b: string;
        c: string;
        d: string;
    }
}