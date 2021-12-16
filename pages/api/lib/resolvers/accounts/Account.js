'use strict'
export const sayHello = async (_, { idComp }, ctx) => {
  return 'Hello world! HOLA STUART YA HAGO CONSULTAS  EN GQL ';
}
export default {
  QUERIES: {
    sayHello
  }
}
