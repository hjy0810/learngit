//call函数

Function.prototype.myCall = function (context, ...args) {
  context = context || winidow;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
};



let obj = {a:1};

let fn = function () {
  console.log(this,arguments);
  console.log(this.fn);
};

fn.call(obj,'a','s','d','f');
fn.myCall(obj,'a','s','d','f');



