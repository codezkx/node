import bind from './helpers/bind.js'

//格式化请求参数
const formatQuery = (data) => {
    if (toString.call(data) !== "[object Object]") {
        return '';
    }
    let query = null;
    const keys = Object.keys(data)
    const len = keys.length - 1
    const arr=[];
    keys?.forEach((key) => {
        arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    })
    arr.push(("v="+Math.random()).replace(".",""));
    return arr.join("&");
}

// user/:id => user/123
function formatParams(url = '', params = {}) {
    const regex = /:(\w+)/g;
    let match;
    while ((match = regex.exec(url)) !== null) {
        url = url.replace(match[0], params[match[1]]);
    }
    return url
}

const realArray = (values) => {
    if (!isArray(values)) {
      return false
    }
    return values.length > 0
  }

const toString = Object.prototype.toString

const { isArray } = Array;

function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if ([null, undefined].includes(obj)) {
        return false;
    }
    // 强制将不可迭代的值转化成数组
    if (typeof obj !== 'object') {
        obj = [obj];
    }
    let i = 0;
    let l = 0;
    if (isArray(obj)) {
        l = obj.length
        for (i; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
        l = keys.length;
        let key;
        for (i; i < l; i++) {
            key = keys[i];
            fn.call(null, obj[key], key, obj);
        }
    }
}

function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }

const typeOfTest = type => thing => typeof thing === type;

const isString = typeOfTest('string');

const isFunction = typeOfTest('function');

const isUndefined = typeOfTest('undefined');

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));
    
const isPlainObject = (val) => {
    if (kindOf(val) !== 'object') {
        return false;
    }

    const prototype = getPrototypeOf(val);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

const _global = (() => {
    /*eslint no-undef:0*/
    if (typeof globalThis !== "undefined") return globalThis;
    return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
  })();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

    
function merge(/*  */) {
    const {caseless} = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
        const targetKey = caseless && findKey(result, key) || key;
        // if () {

        // }
    }
}

const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, {allOwnKeys});
    return a;
}
    
    
export default {
    forEach,
    formatQuery,
    formatParams,
    realArray,
    isArray,
    isFunction,
    isString,
    global: _global,
    extend,
}
