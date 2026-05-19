

const rateLimiter =wrapAsync((limit, windowSec, prefix)=>(
     async (req, res, next) => {
          let {user}=req.user._id||req.ip 

          let key=`rate${prefix}:${user}`

          const req=await redisClient.incr(key);

          if(req==1){
               await redisClient.expire(key, windowSec);
          }

          if(req>limit){
               console.log(`Too many ${prefix} requests. Try again later.`)
        return res.status(429).json({
          message: `Too many ${prefix} requests. Try again later.`
        });
          }

          next()

}

))

