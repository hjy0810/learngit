//apply函数简单实现

Function.prototype.myApply = function (context,args) {
  context = context || window;
  context.fn = this;
  let res = args ? context.fn(...args) : context.fn(); //
  delete context.fn;
  return res;
};


console.log(Math.max.apply(null, [1,2,3]));
console.log(Math.max.myApply(null, [1,2,3]));

//缺陷：不能使用类数组



//改进
// Function.prototype.myApply = function (context,arr) {
//   context = context || window;
//   context.fn = this;
//   let res = null,
//       args = [];
//   if(!arr){
//     res = context.fn();
//   } else {
//     args = [].slice.call(arr);
//     res = context.fn(...args);
//   }
//   args ? context.fn(...args) : context.fn();
//   delete context.fn;
//   return res;
// };
//
// console.log(Math.max.apply(null,{length:3,0:0,1:1,2:2}));
// console.log(Math.max.myApply(null, {length:3,0:0,1:1,2:2}));
//
//
//
