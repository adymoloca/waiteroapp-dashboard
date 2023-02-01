export function addressValidator(address){
    const addressFormat = /^[a-zA-Z0-9ĂăÂâÎîȘșȚț].{3,20}$/
    if(addressFormat.test(address) || String(address).length===0)
    {
        return false;
    }
    else
    {   
        return true;
    }
}

export function mailValidator(mail){
    const mailFormat = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    if(mailFormat.test(mail) || String(mail).length===0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

export function nameValidator(name){
    const nameFormat = /^[a-zA-ZĂăÂâÎîȘșȚț].{2,50}$/
    if(nameFormat.test(name) || String(name).length===0)
    {
        return false;
    }
    else
    {   
        return true;
    }
}

export function passwordValidator(password){
    const passwordFormat =  /^(?=.*\W)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,32}$/
    if(passwordFormat.test(password) || String(password).length===0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

export function phoneValidator(phone){
    const phoneFormat =  /^[0-9].{9,12}$/
    if(phoneFormat.test(phone) || phone === '')
    {
        return false;
    }
    else
    {
        return true;
    }
}

export function numberValidator(number){
    const numberFormat = /^[0-9,.].{0,5}$/
    if(numberFormat.test(number))
    {
        return false;
    }
    else
    {
        return true;
    }
}

export function cardNumberValidator(cardNumber){
    const cardNumberFormat = /^[0-9].{15}$/
    if(cardNumberFormat.test(cardNumber) || String(cardNumber)==='')
    {
        return false;
    }
    else
    {
        return true;
    }
}

export function cvvValidator(cvv){
    const cvvFormat = /^[0-9].{2}$/
    if(cvvFormat.test(cvv) || String(cvv)==='')
    {
        return false;
    }
    else
    {
        return true;
    }
}