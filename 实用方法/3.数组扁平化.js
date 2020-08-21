let arr = [1,2,[3,4],[5,6,[7,8,[9,10]]]];


//1. toString + split + map
// let flatArr = arr.toString().split(',').map(item => parseFloat(item));


//2. join + split + map
// let flatArr = arr.join(',').split(',').map(item => parseFloat(item));


//3. ES6 => flat
// let flatArr = arr.flat(Infinity)


//4. 递归 + push / concat
// let flat = function(arr){
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i];
//     if(Array.isArray(item)){
//       newArr.push(...flat(item));    //没有扩展运算符，还是原来的数组，因为函数整体返回的是一个数组
//     }else{
//       newArr.push(item)
//     }
//   }
//   return newArr;
// };

// let flat = function(arr){
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i];
//     if(Array.isArray(item)){
//       newArr = newArr.concat(...flat(item));    //扩展运算符加或者不加都可以
//     }else{
//       newArr = newArr.concat(item)
//     }
//   }
//   return newArr;
// };

// let flat = function(arr){
//   let newArr = [];
//   arr.forEach(item => Array.isArray(item) ? newArr.push(...flat(item)) : newArr.push(item));
//   return newArr;
// };

// let flat = function(arr){
//   let newArr = [];
//   arr.forEach(item => {
//     newArr = newArr.concat(Array.isArray(item) ? flat(item) : item);
//   });
//   return newArr;
// };



//5. reduce
// let flat = function(arr){
//   return arr.reduce((pre,cur) => {
//     return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
//   },[])
// };
//


//6. 扩展运算符 ...，把二维变一维，只要数组中某一项是数组，就使用一次 ...
let flat = function(arr){
  while (arr.some(item => Array.isArray(item))){
    arr = [].concat(...arr);
  }
  return arr;
};




// console.log(flatArr);

console.log(flat(arr));
