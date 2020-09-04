/*
 * 判断left原型链中是不是能找到 right.prototype
 */

const myInstanceof = function(left,right){
  let prototype = right.prototype;
  left = left.__proto__;
  while (left) {
    if (left === prototype) return true;
    left = left.__proto__;
  }
  return false;
}

const arr = [1,2];
console.log(myInstanceof(arr,Object))