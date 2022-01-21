import {hashAttributes} from './hashAttributes.js'

export const verifyAttributes = (VCs,VP,hashType) => {
    //console.log("verifyAttributes");
    //console.log(VCs);
    //console.log(VP);
    const disclosedAttributes = VP.vp.attributes;
    VCs.forEach(credential => {
        var claims = credential.credentialSubject;
        var verified = 0;
        if(claims && disclosedAttributes){
            disclosedAttributes.forEach(element => {
                    var attributes = element.attributes;
                    var {obj, propToVerify} = checkPath(element.path, claims);
                        var propertyPath = element.path.join('->');
                        if (propToVerify) {
                            //console.log('===SELECTIVE DISCLOSURE=== Verifying attribute : ' + propertyPath + " with value : " + propToVerify);
                            var rehashedAttribute = hashAttributes(element.clearValue, element.nonce,hashType);
                            //console.log('===SELECTIVE DISCLOSURE=== Recalculated hash is : ' + rehashedAttribute.res);
                            if(rehashedAttribute.res === propToVerify)
                                verified ++ ;
                            else
                                throw new Error('Unable to verify '+ propToVerify + ' hashing failed !')
                        }
                        else {
                            throw new Error('cannot find such claim : ' + propertyPath + " || Claims instead are : " + JSON.stringify(obj, null, 4));
                        }
            });
        }
        else 
            throw new Error('Claims or disclosedAttributes parameters are undefined !')
    })
    return 0;
}

const checkPath = (path, claims) => {
    var finalProp = undefined;
    var object = {};
    path.forEach(element => {
        if(finalProp === undefined ) {
            finalProp = claims[element];
            object[element]=finalProp
        }
        else {
            finalProp = finalProp[element];
        }
    });
    return {obj : object, propToVerify :finalProp};
}
