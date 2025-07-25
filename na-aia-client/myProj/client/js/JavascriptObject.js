let myObj={
    name: 'John Doe',
    age: 30,
    city: 'Toronto'
};

console.log(Object.keys(myObj));
console.log(Object.values(myObj)); 
console.log(Object.entries(myObj));


let obj1= {name: 'Tom Johnson', age: 40, city:'Montreal'};
let obj2= {telephone: '123456789'};

Object.assign(myObj,obj1);

console.log(myObj);

Object.assign(myObj,obj2);

console.log(myObj);


let obj3 = Object.assign({}, myObj);

console.log(obj3);

const { name, age } = myObj;

console.log(name); 
console.log(age); 

let myArray = [1, 2, "Three", {message:"hello"} ]

console.log(typeof [1, 2, 3]);

console.log(myArray[3]);

let add = (x,y) => { return (x+y)};

//With only one argument:
let myF=arg1=>{ return arg1+" AAA" };

//With only one statement in the body
let double=x=> x*2;

console.log(add(10,20));
console.log(myF("bbb"));
console.log(console.log(double(5)));