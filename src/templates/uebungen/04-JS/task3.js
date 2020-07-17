// function FIFO(arr) {
//   this._list = arr ? arr : [];
// }

// FIFO.prototype.push = function (obj) {
//   this._list.push(obj)
//   console.log(this._list);
// }
// FIFO.prototype.pop = function () {
//   return this._list.splice(0,1)[0]
// }
// FIFO.prototype.size = function () {
//   return this._list.length
// }


var obj = makeFIFO();

obj.push(1);
obj.push("asdasd");
obj.push({baa:"foo"});
obj.push(1.123123);
console.log(obj.size());
obj.pop();
console.log(obj.size());

function makeFIFO(arr) {
  var _list = Array.isArray(arr) ? arr : [];
  var fifo =  {
    push: function (obj) {
      _list.push(obj)
    },
    pop: function () {
      return _list.splice(0,1)[0]
    },
    size: function () {
     return _list.length
    }
  }
  return fifo;
}


function makeUnordedList(arr) {
  var _list = Array.isArray(arr) ? arr : [];
  return {
    add: function (el) {
      //Remove if for every element
      if (_list.some(element => el === element)) return console.error(`${el} ist bereits in der UL`);
      _list.push(el);
    },
    remove: function (i) {
      if (_list[i]) {
        _list.splice(i, 1);
      }
    },
    size: function () {
      return _list.length;
    }
  }
}

var uList = makeUnordedList();

uList.add(1);
uList.add("asdasd");
uList.add("asdasd");
uList.add({ baa: "foo" });
uList.add(1.123123);
console.log(uList.size());
uList.remove(2);
console.log(uList.size());