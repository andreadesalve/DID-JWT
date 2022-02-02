import {hashAttributes} from './hashAttributes.js'


export const verifyAttributes = async (VCs,VP) => {
    //console.log("verifyAttributes");
    //console.log(VCs);
    //console.log(VP);
    const disclosedAttributes = VP.vp.attributes;
    for(const credential of VCs){
        var claims = credential.credentialSubject;
        var verified = 0;
        if(claims && disclosedAttributes){
            for(const element of disclosedAttributes){
                var attributes = element.attributes;
                var {obj, propToVerify} = checkPath(element.path, claims);
                var propertyPath = element.path.join('->');
                if (propToVerify) {
                    //console.log('===SELECTIVE DISCLOSURE=== Verifying attribute : ' + propertyPath + " with value : " + propToVerify);
                    const rehashedAttribute = await hashAttributes(element.clearValue, element.nonce,undefined,undefined);
                    //console.log('===SELECTIVE DISCLOSURE=== Recalculated hash is : ' + rehashedAttribute.res);
                    if(rehashedAttribute.res === propToVerify)
                        verified ++ ;
                    else
                        throw new Error('Unable to verify '+ propToVerify + ' hashing failed !')
                }else {
                    throw new Error('cannot find such claim : ' + propertyPath + " || Claims instead are : " + JSON.stringify(obj, null, 4));
                }
            }
    }else 
            throw new Error('Claims or disclosedAttributes parameters are undefined !')
    }
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
