import { config } from "dotenv";

export default class Config {
    static #env = process.env.NODE_ENV;  // u can console.log(process.env) and then look for NODE_ENV value

    static load = () => {
        config({
            path: `.env${Config.#env !== `prod` ? `.${Config.#env}` : ``}`,
        });
    };
}
