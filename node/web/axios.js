import Axios from './axios/Axios.js';
import defaults from './defaults.js';
import utils from './utils.js'
import bind from './helpers/bind.js'

// function createInstance(defaultConfig) {
//     const context = new Axios(defaultConfig);
//     const instance = utils.bind(Axios.prototype.request, context);

//     // Copy axios.prototype to instance
//     utils.extend(instance, Axios.prototype, context, {allOwnKeys: true});

//     // Copy context to instance
//     utils.extend(instance, context, null, {allOwnKeys: true});

//     // Factory for creating new instances
//     instance.create = function create(instanceConfig) {
//         return createInstance(Object.assign(defaultConfig, instanceConfig));
//     };

//     return instance;
// }

function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig);
    const instance = bind(Axios.prototype.request, context);
  
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context, {allOwnKeys: true});
  
    // Copy context to instance
    utils.extend(instance, context, null, {allOwnKeys: true});
  
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
      return createInstance(Object.assign(defaultConfig, instanceConfig));
    };
  
    return instance;
}

const axios = createInstance(defaults)
axios.Axios = Axios;

export default axios