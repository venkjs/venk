export const enum HttpMethod{
    GET,
    POST,
    PUT,
    DELETE,
    PATCH
}

export  const HttpStatus={
    OK:200,
    BAD_REQUEST:400,
    UNAUTHORIZED:401,
    PAYMENT_REQUIRED:402,
    FORBIDDEN:403,
    NOT_FOUND:404,
    INTERNAL_SERVER_ERROR:500
}


export const enum RequestArgumentType{
    REQUEST_PARAM,
    REQUEST_BODY,
    PATH_VARIABLE
}

export const REQUEST_ARGUMENT="REQUEST_ARGUMENT"