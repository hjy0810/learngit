// 不能 new 的版本
Function.prototype.myBind = function (context, ...args1) {
  let self = this;
  return function (...args2) {
    self.apply(context,[...args1,...args2])
  }
};


// 可以 new 的版本
// Function.prototype.myBind = function(context,...arg1){
//   if(typeof this !== 'function'){
//     throw new TypeError('Error');
//   }
//   const self = this;
//   return function F(...arg2){
//     if(this instanceof F){
//       return new self([...arg1,...arg2])
//     }
//     return self.apply(context,[...arg1,...arg2])
//   }
// };


function fn(){
  console.log(this,arguments)
}

const obj = {
  a:1,
  b:2
};

fn.bind(obj,3,4)(5,6);
fn.myBind(obj,3,4)(5,6);
