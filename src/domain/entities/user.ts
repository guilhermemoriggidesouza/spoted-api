import { v4 } from "uuid";

export class User {
    constructor(
        public name: string,
        public login: string,
        public email: string,
        public _id?: any,
        public bio?: string,
        public age?: string,
        public facul?: string,
        public ocupation?: string,
        public facebook?: string,
        public instagram?: string,
        public twitter?: string,
        public id?: string,
        public password?: string,
        public recoverCode?: number,
        public files?: Array<string>
    ) {
        if (!this.id) {
            this.id = v4()
        }
    }
} 