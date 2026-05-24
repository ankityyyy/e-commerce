let IS_PROD = true;

const server = IS_PROD
  ?"http://localhost:2000"
  :"https://ecommerce-backend1-117w.onrender.com"  ;

export default server;