//防抖函数，返回函数连续调用时，空闲时间必须大于或等于 delay，callback 才会被执行，即短时间多次执行只有最后一次才会执行

/*
* 使用场景：
* 1. Vue双向数据绑定时，只要input输入，就会引起oninput事件触发，使用防抖，当我们频繁的输入时，并不会立即调用方法，只有在经过指定的间隔内没有输入的情况下才会调用函数方法；
* 2. 按钮的防二次点击。开始一个定时器，只要定时器还在，不管怎么点击都不会执行回调函数，它会清除之前的定时器，并创建一个新的定时器。一旦定时器结束并设置为 null，就可以再次点击了。
* */

//事件绑定中，当callback是经过bind绑定，并且传值的情况下，事件也会默认给callback传递事件对象，此时callback中的arguments中，先是绑定的值，再是事件对象


const debounce = function (callback, delay = 500) {
  let timer = null;
  return function (...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this,args);
      timer = null;
    },delay)
  }
};


// let btn = document.getElementById('btn');
// btn.addEventListener('click',debounce(console.log.bind(null,1),300));
// //300ms后输出 1  MouseEvent{}
