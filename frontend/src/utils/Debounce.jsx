export default function Debounce(fn,delay){
     let timeId;

     return function(...args){
          clearTimeout(timerId);
          timerId=setTimeout(()=>{
               fn(...args)
          },delay)

     }

}