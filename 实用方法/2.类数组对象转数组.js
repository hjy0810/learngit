let arrLike = {
  length:4,
  0:'0',
  1:'1',
  2:'2',
  3:'3'
}

let lists = document.getElementsByTagName('li')

// 1. ...扩展运算符 (自己实现的类数组没有 iterator 接口，不能使用...，arguments 和 )
// let arr = [...arrLike] //会报错
// let arr = [...lists]


// 2. Array.from() (任何有 length 属性的对象，都可以通过这种方法转成数组)
// let arr = Array.from(arrLike)


// 3. Array.prototype.slice.call
// let arr = Array.prototype.slice.call(arrLike)

console.log(arr);
