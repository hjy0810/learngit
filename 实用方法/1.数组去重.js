let arr = [1,2,3,4,5,4,1,3,2];



//1. Set + Array.from()
// newArr = Array.from(new Set(arr))


//2.   for...of + includes / indexOf / some
// let unique = function(arr){
//   let newArr = [];
//   for (let value of arr) {
//     if(newArr.includes(value)){
//       continue;
//     }
//     newArr.push(value)
//   }
//   return newArr
// }
//

// 3. 遍历，取出不重复的保存在 数组 中
// let unique = function(arr){
//   let newArr = [];
//
//   // arr.every( item => {
//   //   newArr.includes(item) ? null : newArr.push(item);
//   //   return true;
//   // });
//   arr.some( item => {
//     newArr.includes(item) ? null : newArr.push(item);
//     return false;
//   });
//   return newArr
// }
//

// 4. 遍历，把数组每一项的值当作 对象的键（字符串形式） 存入对象中，再取出
// let unique = function(arr){
//   let obj = {}
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i]
//     obj[item] = 'asdf';
//   }
//   return Object.keys(obj).map(item => parseInt(item))
// };


// 5. reduce + includes
let newArr = arr.reduce((pre,cur)=>{
  return pre.includes(cur) ? pre : [...pre,cur];
},[]);

// 6. 排序 + 比较相邻项
// let unique = function(arr){
//   let newArr = [arr[0]];
//   arr = arr.sort((a,b) => a-b);
//   for (let i = 1; i < arr.length; i++) {
//     if(arr[i] !== arr[i-1]){
//       newArr.push(arr[i])
//     }
//   }
//   return newArr;
// }

// 7. 双循环 + splice （修改原数组）
// let unique = function(arr){
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i+1 ; j < arr.length; j++) {
//       if(arr[i] === arr[j]){
//         arr.splice(j,1);
//         j--;
//       }
//     }
//   }
//   return arr;
// };

// 8. 把数组中符合条件的值，同时作为属性和值传入对象 ，比较 item === obj[item]，
// let unique = function(arr){
//   let obj = {};
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i];
//     if(obj[item]){ //如果当前项有值，或者 obj[item] === item
//       //把最后一项替换掉当前这一项
//       arr[i] = arr[arr.length - 1];
//       arr.length--;
//       i--;
//       continue;
//     }
//     obj[item] = item;
//   }
//   return arr;
// };

//9. filter + 当前项的索引值，等于该值在数组中的第一次出现的索引
// let unique = function(arr){
//   return arr.filter((item,index,arr) => arr.indexOf(item) === index)
// };
//

//10. 排序 + 递归
// let unique = function(arr){
//   let length = arr.length;
//   arr = arr.sort();
//
//   function recursive(index) {
//     if(index <= 0) return;
//     if(arr[index] === arr[index - 1]){
//       arr.splice(index,1)
//     }
//     recursive(index - 1)
//   }
//   recursive(length - 1);
//   return arr;
// };

//11. Set + ...
newArr = [...new Set(arr)]


console.log(newArr)

// console.log(unique(arr));
