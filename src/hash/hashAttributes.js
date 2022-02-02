import process from 'process';
import { createRequire } from 'module';
import { Keccak } from 'sha3';


const require = createRequire(import.meta.url);
const util = require('util');

let crypto;

 try {
 	crypto = require('crypto');
 	let h = await crypto.getHashes();
 	console.log("Available hash algorithms..");
 	console.log(h);
 }catch (err){
 	console.log('crypto support is disabled');
 	process.exit();
 }


 
const md5 = require('md5');
const hashKeccak = new Keccak(512);
const generateKey = util.promisify(crypto.generateKey);
// function to generate nonce string for hashing
/*
  Generate a random string of a given length.
  @params:
    length: *required* - length of string to generate 
    kind:   *optional* - character set or sets to use for string generation  (default: 'aA#')
      Available options
        'a' => for lowercase alphabets [a-z]
        'A' => for uppercase alphabets [A-Z]
        '#' => numbers [0-9]
        '!' => special character as defined
        '*' => all of the above
      
      Default charset is AlphaNumeric - equivalent to 'aA#'
  Typical Usage
    console.log(randomString(10));        // alphanumeric strings. Uses 'aA#'
    console.log(randomString(10, 'a'));   // downcase alpha
    console.log(randomString(10, 'A'));   // downcase alpha
    console.log(randomString(19, '#aA')); // case-insensitive AlphaNumric
    console.log(randomString(24, '#A!')); // numbers && upcase alpha && special characters
    console.log(randomString(100, '*'));  // Everything: case-insensitive AlphaNumric && special characters
*/
const randomString = (length, kind) => {
	var i,
		str = '', 
		opts = kind || 'aA#',
		possibleChars = '';
  
	if (kind.indexOf('*') > -1) opts = 'aA#!'; // use all possible charsets
  
	// Collate charset to use
	if (opts.indexOf('#') > -1) possibleChars += '0123456789';
	if (opts.indexOf('a') > -1) possibleChars += 'abcdefghijklmnopqrstuvwxyz';
	if (opts.indexOf('A') > -1) possibleChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (opts.indexOf('!') > -1) possibleChars += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  
	for(i = 0; i < length; i++) {
	  str += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	}
	return str;
  }

  // in order to implement the possibility of selective disclosure
	// the issuer provides the VC with hashed values of all the claims
	// for each claim the issuer uses a different nonce during hashing
/**export const hashAttributes = (attribute, nonce = undefined ,type ="md5") => {
	if(!nonce)
       nonce = randomString(8,'#aA');
  if(type=="md5"){
    var tmp = md5(attribute);  
	  tmp = tmp + ':' + nonce;
	  const result = md5(tmp);
    return { nonce: nonce, res: result};
  }else if(type=="sha3"){
    hashKeccak.reset();
    hashKeccak.update(attribute);
    var tmp = hashKeccak.digest('base64');;  
    tmp = tmp + ':' + nonce;
    hashKeccak.reset();
    hashKeccak.update(tmp);
    const result = hashKeccak.digest('base64');
    return { nonce: nonce, res: result};
  }
}*/


  // in order to implement the possibility of selective disclosure
	// the issuer provides the VC with hashed values of all the claims
	// for each claim the issuer uses a different nonce during hashing
export const hashAttributes = async (attribute, key = undefined ,type ="md5") => {
	if(!key){
       key = await generateKey('hmac',{length:256});
	   key = key.export().toString('hex');
	}
   	const hmac = await crypto.createHmac(type,key);
   	hmac.update(attribute);
   	const result = await hmac.digest('hex');
    return { nonce: key, res: result};
}

