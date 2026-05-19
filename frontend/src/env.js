let IS_PROD = true;

const server = IS_PROD
  ?"http://localhost:2000" 
  :"https://amazon-backend-i8vp.onrender.com" ;

export default server;