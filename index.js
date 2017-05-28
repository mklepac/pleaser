/* jshint esversion: 6, node: true */

'use strict';

let request = require("request");

const verbs = ['get', 'head', 'post', 'put', 'patch', 'del', 'delete'];

let wish = (rq = request) => {
    function promiseFunc(func) {
        const old = func;
        
        func = (uri, options) => {
            return new Promise((resolve, reject) => {
                old(uri, options, (err, response, body) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(response);
                    }
                });
            });
        };

        return func;
    }

    verbs.forEach((verb) => {
        rq[verb] = promiseFunc(rq[verb]);
    });
    
    return rq;
};

module.exports = wish;
