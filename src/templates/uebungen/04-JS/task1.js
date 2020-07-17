function identity_function(a){
  return function () {
    return a;
  }
}

function addf(x) {
  return function (y) {
    return x + y
  }
}

function add(x, y) {
  return x + y;
}

function mul(a,b) {
  return a * b;
}


function applyf(fnc){
  return function (a) {
    return function (b) {
      return fnc(a, b);
    }
  }
}



var addf = applyf(add);
console.log("addf",addf(1)(2));

function curry(fnc, a) {
  return function (b) {
    return fnc(a,b)
  }
}

var inc = function (x) {
  return addf(x)(1)
}

function methodize(fnc) {
  return function (a) {
    return fnc(a, this);
  }
}

Number.prototype.add = methodize(add);

function demethodize(fnc) {
  return function (x, y) {
    return fnc.call(y, x);
  }
}

console.log("demethodize",demethodize(Number.prototype.add)(5,6));

function twice(fnc) {
  return function (x) {
    return fnc(x, x);
  }
}
var square = twice(mul);
var double = twice(add);
console.log("square, double",square(11), double(11));

function composeu(fnc1, fnc2) {
  return function (x) {
    return fnc2(fnc1(x));
  }  
}
console.log("composeu",composeu( double, square)(3));


function composeb(fnc1, fnc2) {
  return function (x, y, z) {
    return fnc2(fnc1(x, y), z);
  }
}
console.log("composeb",composeb(add,mul)(2,3,5));


function once(fnc) {  
  var called = false;
  return function (...arg) { 
    if (called) return new Error("You can only call this method once") 
    else {
      called = true;
      return fnc(...arg);
    }
  }
}

console.log("Once");
var add_once = once(add);
var mul_once = once(mul);
console.log(add_once(3,4));
console.log(add_once(3,4));
console.log(mul_once(3,4));
console.log(mul_once(3, 4));

function counterf(x) {
  return {
    x: x,
    inc: function () {
      this.x++
    },
    dec: function () {
      this.x--
    }
  }
}
var counter = counterf(10);
console.log("Counter", counter.x);
counter.inc();
console.log("Counter inc", counter.x);
counter.dec()
console.log("Counter dec", counter.x);


function revocable(fnc) {
  return {
    fnc: fnc,
    invoke: function (...args) {
      if (!this.fnc) return console.error("Keine Funktion definiert.");
      else {
        console.log(this.fnc);
        this.fnc.call(null, args);
      }
    },
    revoke: function () {
      this.fnc = undefined;
    }
  }
}


temp = revocable(alert);
temp.invoke(7); // führt zu alert(7);
temp.revoke();
temp.invoke(8); // Fehlerabbruch!


var arr = (function () {
  var _arr = [];
  return {
    store: function (arr) {
      _arr = arr
    },
    get: function () {
      return _arr
    },
    append: function (obj) {
      _arr.push(obj)
    }
  }
})()

console.log("Array Wrapper");
console.log(arr.get());
arr.store(['123',1123])
console.log("Store",arr.get());
arr.append(45)
console.log("Append",arr.get());
