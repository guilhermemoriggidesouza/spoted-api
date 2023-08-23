import { Server } from "@overnightjs/core";
import * as bodyParser from 'body-parser';
import * as controllers from './api/controllers';
import { connectToDatabase } from "./mongodb";

export class ServerApp extends Server {

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        connectToDatabase();
        this.setupControllers();
    }


    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }


    public start(port?: number): void {
        port = port || 3000;
        this.app.listen(port, () => {
            console.log("running on: " + port)
        });
    }
}