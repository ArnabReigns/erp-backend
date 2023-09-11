class HttpStatusCodes {
    static OK = 200;
    static CREATED = 201;
    static ACCEPTED = 202;
    static NO_CONTENT = 204;
    static BAD_REQUEST = 400;
    static UNAUTHORIZED = 401;
    static FORBIDDEN = 403;
    static NOT_FOUND = 404;
    static METHOD_NOT_ALLOWED = 405;
    static INTERNAL_SERVER_ERROR = 500;
  }
  
  class HttpStatusText {
    static OK = 'OK';
    static CREATED = 'Created';
    static ACCEPTED = 'Accepted';
    static NO_CONTENT = 'No Content';
    static BAD_REQUEST = 'Bad Request';
    static UNAUTHORIZED = 'Unauthorized';
    static FORBIDDEN = 'Forbidden';
    static NOT_FOUND = 'Not Found';
    static METHOD_NOT_ALLOWED = 'Method Not Allowed';
    static INTERNAL_SERVER_ERROR = 'Internal Server Error';
  }
  
  module.exports = { HttpStatusCodes, HttpStatusText };