export const enum HttpMethod{
    GET,
    POST,
}

export  const HttpStatus={
    OK:200,
    UNAUTHORIZED:401,
    FORBIDDEN:403
}


export const enum RequestArgumentType{
    REQUEST_PARAM,
    REQUEST_BODY,
    PATH_VARIABLE
}

export const REQUEST_ARGUMENT="REQUEST_ARGUMENT"