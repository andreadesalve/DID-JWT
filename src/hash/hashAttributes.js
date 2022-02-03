import process from 'process';
import { createRequire } from 'module';


const require = createRequire(import.meta.url);
const util = require('util');

let crypto;
var config =require('../config.json');

 try {
 	crypto = require('crypto');
 	let h = await crypto.getHashes();
 	console.log("Available hash algorithms..");
 	console.log(h);
 }catch (err){
 	console.log('crypto support is disabled');
 	process.exit();
 }


const generateKey = util.promisify(crypto.generateKey);


  // in order to implement the possibility of selective disclosure
	// the issuer provides the VC with hashed values of all the claims
	// for each claim the issuer uses a different nonce during hashing
export const hashAttributes = async (attribute, key = undefined, keylength = config.hash.keylength, type =config.hash.H) => {
	//console.log("Key length "+keylength);
	//console.log("Hashing "+type);
	if(!key){
       key = await generateKey('hmac',{length:keylength});
	   key = key.export().toString('hex');
	}
	//console.log("Key  "+key);
	
   	const hmac = await crypto.createHmac(type,key);
   	hmac.update(attribute);
   	const result = await hmac.digest('hex');
    return { nonce: key, res: result};
}

