const APPLICATION = 'application/json;charset=utf-8';

export const getData = async ( url ) => {
    const response = await fetch( url, {
        method : 'GET',
        headers : {
            'Accept'       : APPLICATION,
            'Content-Type' : APPLICATION,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        mode    : 'cors'
    } )
    .then( result => result )
    .catch( error => error )
    return response.json();
}

export const postData = async ( url, body ) => {
    const response = await fetch( url, {
        method  : 'POST',
        headers : {
            'Accept'       : APPLICATION,
            'Content-Type' : APPLICATION,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
        mode    : 'cors',
        body    : JSON.stringify( body )
    } )
    .then( result => result )
    .catch( error => error )
    return response.json()
}