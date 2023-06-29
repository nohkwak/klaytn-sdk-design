import { JsonRpcProvider as EthersJsonRpcProvider } from "@ethersproject/providers";
import _ from "lodash";
const OpenSDK = require("opensdk-javascript");
// const { expect } = require("@jest/globals");

const sdk = new OpenSDK(new OpenSDK.ApiClient("https://api.baobab.klaytn.net:8651"));

// import { JsonRpcProvider as OldJsonRpcProvider} from "@ethersproject/providers";
// import { Network, Networkish } from "@ethersproject/networks";
// import { ConnectionInfo } from "ethers/lib/utils";
class JsonRpcProvider {

    constructor(url) {
        const KlaytnNameSpace = [ "admin", "debug", "eth", "governance", "klay", "net", "personal", "subbridge", "txpool"];
        
        let openSDK = new OpenSDK(url)
        this.openSDK = openSDK; 

        // public klay = new openSDK.klay() 
        let namespace;
        let func_name;

        // 1. dynamically adding 
        for (namespace in openSDK) {
            if ( KlaytnNameSpace.indexOf(namespace) != -1 ){
                for (func_name in openSDK[namespace].prototype) {
                    const str = String(func_name);
                    console.log(str);

                    const property = String( namespace + str.charAt(0).toUpperCase() + str.slice(1) ); 
                    console.log(property);

                    this.prototype[property.toString()] = openSDK[namespace].prototype[func_name]; 
                }
            }
        }
    }

    // // 2. statically adding 
    // // getChianConfig(opts, callback) {  // no type
    // klayGetChianConfig(opts:any, callback:any) {
    //     return this.openSDK.klay.getChainConfig(opts, callback); 
    // }

    // // getAccount(address, blockNumberOrHashOrTag, opts, callback) 
    // klayGetAccount(address:any, blockNumberOrHashOrTag:any, opts:any, callback:any) {
    //     return this.openSDK.klay.getAccount(address, blockNumberOrHashOrTag, opts, callback);
    // }

    // // getAccountKey(address, blockNumberOrHashOrTag, opts, callback) {
    // klayGetAccountKey(address:any, blockNumberOrHashOrTag:any, opts:any, callback:any) {
    //     return this.openSDK.klay.getAccountKey(address, blockNumberOrHashOrTag, opts, callback); 
    // }

    // // networkID(opts, callback)
    // netNetworkID(opts:any, callback:any) {
    //     return this.openSDK.net.networkID(opts, callback);
    // }

    // // addPeer(url, opts, callback) {
    // adminAddPeer(url:any, opts:any, callback:any) {
    //     return this.openSDK.admin.addPeer(url, opts, callback);
    // }

    // // backtraceAt(location, opts, callback)
    // debugBacktraceAt(location:any, opts:any, callback:any) {
    //     return this.openSDK.debug.backtraceAt(location, opts, callback); 
    // }

    // governance() {
    //     return this._openSDK.governance(this._url);
    // }
}

const provider = new JsonRpcProvider('https://api.baobab.klaytn.net:8651');
console.log( provider );

// describe('Eth block number API', () => {
//     test('using eth namespace, should return block number', (done) => {

//         let callbackOne = function (error, data, response) {

//             expect(error).toBeNull();
//             expect(data).toBeDefined()          
//             done();
//         };
//         sdk.eth.blockNumber({}, callbackOne);
//     });
// });
