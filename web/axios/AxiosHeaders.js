'use strict';

// import { forEach } from "../utils.js";

function normalizeheader(header) {
    return header && String(header).trim().toLowerCase();
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

class AxiosHeader {
    constructor(headers) {
        headers && this.set(headers);
    }
    
    set(hander, valueOrReweite, rewrite) {
        
    }

}

export default AxiosHeader;