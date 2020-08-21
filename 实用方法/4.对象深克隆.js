let obj = {
  a:1,
  b:'1',
  c:true,
  d:null,
  e:undefined,
  f:Symbol('1'),
  g:BigInt(1234),
  h:[1,2],
  i:{
    constructor:Array,
    a:1,
    b:{c:2}
  },
  j:Function.prototype,
  k:new Date(),
  l:new RegExp(/d+/,'i'),
};


// let arr = [
//   1,
//   '1',
//   true,
//   null,
//   undefined,
//   Symbol('1'),
//   BigInt(123),[1,2],
//   {
//     constructor:Array,
//     a:1,
//     b:{c:2}
//   },
//   Function.prototype,
//   new Date(),
//   new RegExp(/d+/,'i')
// ];

// 1. JSON
// let newObj = JSON.parse(JSON.stringify(arr));

/*
* 局限：
* 1. undefined、Symbol()、函数、对象的constructor(都指向Object) 会丢失 (若是数组，这四项都会转为null)
* 2. BigInt()会报错
* 3. 正则会变为空对象
*
*/


// 2.
// let deepClone = function(obj){
//
// };

//
// function deepCopy(obj){
//   //判断是否是简单数据类型，
//   if(typeof obj === "object"){
//     //复杂数据类型
//     var result = obj.constructor === Array ? [] : {};
//     for(let i in obj){
//       result[i] = typeof obj[i] === "object" ? deepCopy(obj[i]) : obj[i];
//     }
//   }else {
//     //简单数据类型 直接 == 赋值
//     var result = obj;
//   }
//   return result;
// }
let deepClone = function (obj) {
  //特殊情况
  // if(obj instanceof Function) return new Function(obj);
  if(obj instanceof RegExp) return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);

  if(obj === null || typeof obj !== 'object') return obj;

  //let newObj = (obj.constructor === Object) ? {} : [];
  let result = new obj.constructor;
  for (let key in obj) {
    if(obj.hasOwnProperty(key)){
      // newObj[key] = (typeof obj[key] === 'object') ? deepClone(obj) : obj[key];//这样写遇到null会出问题
      result[key] = deepClone(obj[key]);
    }
  }

  return result;
};
// console.log(newObj);
console.log(deepClone(obj))

