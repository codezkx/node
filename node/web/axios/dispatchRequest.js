import adapters from "../adapters/adapters.js";
import AxiosHeader from "./AxiosHeaders.js";

export default function dispatchRequest(config) {

//   config.headers = AxiosHeaders.from(config.headers);
    const adapter = adapters.getAdapter(config.adapter);

    return adapter(config).then(response => {
        return response
    })

}