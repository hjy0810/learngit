//节流函数：返回函数连续调用时，callback 执行频率限定为  1次/delay
/*
* 使用场景：
* 用于 onresize, onscroll , 拖拽 , onmouseover...等短时间内会多次触发的事件
*
* */
//虽然代码很像，但是防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行



const throttle = function (callback, delay = 300) {
  let timer = null;
  return function (...args) {
    if(timer) return;
    timer = setTimeout(() => {
      callback.apply(this,args);
      timer = null;
    },delay)
  }
};


// let btn = document.getElementById('btn');
// btn.addEventListener('click',throttle(console.log.bind(null,1),300));
// //假设持续点击，每隔300ms后输出 1  MouseEvent{}

document.body.addEventListener('mouseover', throttle(e => {
  console.log(e.offsetX,e.offsetY);
},200));
