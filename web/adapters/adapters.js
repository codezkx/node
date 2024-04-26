import utils from '../utils.js'
import xhrAdapter from './xhr.js';

const knownAdopters = {
    xhr: xhrAdapter,
}

utils.forEach(knownAdopters, (fn, value) => {
    if (fn) {
        try {
            Object.defineProperty(fn, 'name', { value });
        } catch (e) {
            // eslint-disable-next-line no-empty
        }
        Object.defineProperty(fn, 'adapterName', { value });
    }
});

export default {
    getAdapter: (adapters) => {
        adapters = utils.isArray(adapters) ? adapters : [adapters];

        const { length } = adapters;
        let nameOrAdapter;
        let adapter;
        for (let i = 0; i < length; i++) {
            nameOrAdapter = adapters[i];
            if ((adapter = utils.isString(nameOrAdapter) ? knownAdopters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
                break;
            }
        }

        if (!adapter) {
            // if (adapter === false) {
            //   throw new AxiosError(
            //     `Adapter ${nameOrAdapter} is not supported by the environment`,
            //     'ERR_NOT_SUPPORT'
            //   );
            // }
            throw new Error(
              utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
                `Adapter '${nameOrAdapter}' is not available in the build` :
                `Unknown adapter '${nameOrAdapter}'`
            );
        }
        
        if (!utils.isFunction(adapter)) {
            throw new TypeError('adapter is not a function');
        }

        return adapter;
    },
    adapters: knownAdopters
}