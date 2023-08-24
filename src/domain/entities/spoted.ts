import { v4 } from "uuid";

export class Spoted {
    constructor(
        public title: string,
        public description: string,
        public userId: string,
        public loc: {
            type: string,
            coordinates: Array<number>
        },
        public _id?: any,
        public id?: string,
        public fileId?: string,
    ) {
        if (!this.id) {
            this.id = v4()
        }
    }
} 