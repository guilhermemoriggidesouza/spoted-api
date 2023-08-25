import { v4 } from "uuid";

export class Comment {
    constructor(
        public userId: string,
        public spotedId: string,
        public comment: string,
        public commentFather?: string,
        public _id?: any,
        public id?: string,
    ) {
        if (!this.id) {
            this.id = v4()
        }
    }
} 