let IS_PROD = true;

// const server = IS_PROD
//   ?"https://ecommerce-backend1-117w.onrender.com"
//   :"http://localhost:2000"  ;

// export default server;

const server = IS_PROD
  ?"https://e-commerce-2p81.onrender.com"
  :"http://localhost:2000"  ;

export default server;