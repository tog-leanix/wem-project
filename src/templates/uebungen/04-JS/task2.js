function pubsub() {
  return function () {
    var subFnc = [];
    return {
      subscribe: function(fnc) {
        subFnc.push(fnc)
      },
      publish: function (data) {
        subFnc.forEach(fnc => fnc(data))
      }
    }
  }()
}

var my_pubsub = pubsub();
my_pubsub.subscribe(alert);
my_pubsub.publish("Pub/Sub"); // alert("It works!")


function gensymf(str){
  var _str = str;
  var i = 0;
  return function () {
    var tmp = _str + i;
    i++;
    return tmp;
  }
}


gensym = gensymf('G');
console.log(

  gensym(), // 'G0'
  gensym(), // 'G1'
  gensym(), // 'G2'
  gensym(), // 'G3'
);
  

function fibonaccif(a, b) {
  var _a = a;
  var _b = b;
  return function () {
    var tmp = _a;
    var tmp_b = _b;
    _b = _a + _b;
    _a = tmp_b;
    return tmp;
  }
}

var fib = fibonaccif(0, 1);
console.log(
  fib(),
  fib(),
  fib(),
  fib(),
  fib(),
  fib(),
  fib(),
  fib(),
  );


function addg(x) {
  var _num = 0;
  var call = function (x) {
    if (!x) return _num;  
    else {
      _num = _num + x;
      return function (y) {
        return call(y);
      }
    }
  }
  return call(x);
}

console.log(
  "addg",
  addg(3)(4)(5)(), // 12
  addg(1)(2)(4)(8)() // 15
);
  


function add(x, y) {
  return x + y;
}

function applyg(fnc) {
  var _num = 0;
  var call = function (x) {
    if (!x) return _num;  
    else {
      _num = fnc(_num, x);
      return function (y) {
        return call(y);
      }
    }
  }
  if (fnc) return function (x) {
    return call(x);
  }
}

console.log(
  "applyg",
  applyg(add)(3)(4)(5)(), // 12
  applyg(add)(1)(2)(4)(8)() // 15
);


function m(val, str){
  return {
    value: val,
    source: str ? str : val
  }
}
console.log(
  "Format m",
  JSON.stringify(m(1)), // {"value": 1, "source": "1"}
  JSON.stringify(m(Math.PI, "pi")) // {"value": 3.14159..., "source": "pi"}
);
  

function addm(m1, m2) {
  return {
    value: m1.value + m2.value,
    source: `(${m1.source}+${m2.source})`
  }
}
console.log("addm",
JSON.stringify(addm(m(3), m(4))) // {"value": 7, "source": "(3+4)"}
);


function binarymf(fnc, str) {
  return function (m1, m2) {
    return {
      value: fnc(m1.value ? m1.value : m1, m2.value ? m2.value : m2),
      source: `(${m1.source ? m1.source : m1}${str}${m2.source ? m2.source : m2})`
    }
  }
}

addm = binarymf(add, "+");
console.log(
  "binarymf",
  JSON.stringify(addm(m(3), m(4))), // {"value": 7, "source": "(3+4)"
  JSON.stringify(addm(3, 4)) // {"value": 7, "source": "(3+4)"}
  );

function square(x) {
  return x * x;
}
function unarymf(fnc, str) {
  return function (x) {
    return {
      value: fnc(x),
      source: `(${fnc.name} ${x})`
    } 
  }
}

squarem = unarymf(square, "square");
console.log("unarymf",
JSON.stringify(squarem(4)) // {"value": 16, "source": "(square 4)"}
);

function hyp(x,y) {
  return Math.sqrt(x * x + y * y);
}
console.log("hyp",
hyp(3, 4) // 5
);

function mul(x,y) {
  return x * y;
}

function exp(arr = []) {
  var eval = function (arr = []) {
    if (typeof arr[0] === "function") {
      var val1, val2;
      if (Array.isArray(arr[1])) val1 = eval(arr[1]);
      else val1 = arr[1];
      
      if (Array.isArray(arr[2])) val2 = eval(arr[2]);
      else val2 = arr[2];

      return arr[0](val1, val2);
    } else {
      throw Error("First val of array not a function");
    }
  }
  return eval(arr);
}
hypa = [Math.sqrt, [add, [mul, 3, 3], [mul, 4, 4]]];

console.log("exp",
exp(hypa) // 5
);


function store(x) {
  variable = x;
}
var variable; store(5); // variable === 5
console.log("store",
variable === 5
);

function identityf(x) {
  return x;
}
function quatre(bin_fnc, provide_1, provide_2, store_fnc) {
  store_fnc(bin_fnc(provide_1, provide_2));
}
quatre(add, identityf(3), identityf(4), store); // variable === 7
console.log("quatre",
variable === 7
);

function unaryc(fnc) {
  return function (x, cb) {
    cb(fnc(x));
  }
}
sqrtc = unaryc(Math.sqrt);
sqrtc(81, store) // variable === 9
console.log("unaryc",
variable === 9
);

function binaryc(fnc) {
  return function (x, y, cb) {
    cb(fnc(x,y))
  }
}
addc = binaryc(add);
addc(4, 5, store) // variable === 9
console.log("addc",
variable === 9
);
mulc = binaryc(mul);
mulc(2, 3, store) // variable === 6
console.log("mulc",
variable === 6
);