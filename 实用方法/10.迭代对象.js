const person = {
  name:'Lydia Halle',
  age:21,
  *[Symbol.iterator](){
    yield* Object.values(this)
  }
}


console.log([...person])