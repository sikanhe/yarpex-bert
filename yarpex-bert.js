module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.decodeValue = exports.encodeValue = exports.decode = exports.encode = undefined;
	
	var _serialization = __webpack_require__(1);
	
	Object.defineProperty(exports, 'encode', {
	  enumerable: true,
	  get: function get() {
	    return _serialization.encode;
	  }
	});
	Object.defineProperty(exports, 'decode', {
	  enumerable: true,
	  get: function get() {
	    return _serialization.decode;
	  }
	});
	Object.defineProperty(exports, 'encodeValue', {
	  enumerable: true,
	  get: function get() {
	    return _serialization.encodeValue;
	  }
	});
	Object.defineProperty(exports, 'decodeValue', {
	  enumerable: true,
	  get: function get() {
	    return _serialization.decodeValue;
	  }
	});
	
	
	var b = "g2gCdwJva2wAAAABdAAAAAV3E2N1c3RvbWVyX2FjY291bnRfaWRtAAAACWN1YWNjXzEyM3cQY3VzdG9tZXJfdXNlcl9pZGgCdwRiZXJ0dwNuaWx3Bm9yaWdpbm0AAAAGcmV0b29sdwZzb3VyY2V0AAAABHcTY3VzdG9tZXJfYWNjb3VudF9pZG0AAAAJY3VhY2NfMTIzdxBjdXN0b21lcl91c2VyX2lkaAJ3BGJlcnR3A25pbHcKcmVxdWVzdF9pZG0AAAAAdwpfX3N0cnVjdF9fdyVFbGl4aXIuQXNzZXRzQ2xpZW50LkZpbGVVcGxvYWRSZXF1ZXN0dwpfX3N0cnVjdF9fdyZFbGl4aXIuQXNzZXRzQ2xpZW50LkNyZWF0ZUFzc2V0UmVxdWVzdGo=";
	console.log(b);
	var decoded = (0, _serialization.decode)(b, 'base64');
	
	console.log(decoded);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isNil = __webpack_require__(2);
	
	var _isNil2 = _interopRequireDefault(_isNil);
	
	exports.encode = encode;
	exports.decode = decode;
	exports.encodeValue = encodeValue;
	exports.decodeValue = decodeValue;
	
	var _yarpex = __webpack_require__(5);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _types = __webpack_require__(7);
	
	var _initializer = __webpack_require__(12);
	
	var _initializer2 = _interopRequireDefault(_initializer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encode(value) {
	  var wrapped = (0, _yarpex.wrap)(value);
	  var header = Buffer.from([_constants2.default.Start]);
	  var encoded = encodeValue(wrapped);
	
	  return Buffer.concat([header, encoded]);
	}
	
	function decode(data, encoding) {
	  var buffer = Buffer.from(data, encoding);
	  var start = buffer.readUInt8(0);
	
	  if (start != _constants2.default.Start) {
	    throw new Error('malformed bert value');
	  }
	
	  var _decodeValue = decodeValue({
	    buffer: buffer,
	    offset: 1
	  }),
	      value = _decodeValue.value,
	      offset = _decodeValue.offset;
	
	  if (offset != buffer.length) {
	    throw new Error('malformed bert value');
	  }
	
	  return (0, _yarpex.unwrap)(value);
	}
	
	function encodeValue(_ref) {
	  var valueType = _ref.type,
	      value = _ref.value;
	
	  var type = _types.typesByName[valueType.name];
	
	  if ((0, _isNil2.default)(type)) {
	    throw new Error('value cannot be encoded');
	  }
	
	  return type.encode({
	    type: type,
	    valueType: valueType,
	    value: value
	  });
	}
	
	function decodeValue(_ref2) {
	  var buffer = _ref2.buffer,
	      offset = _ref2.offset;
	
	  var code = buffer.readUInt8(offset);
	  var type = _types.typesByCode[code];
	
	  if ((0, _isNil2.default)(type)) {
	    throw new Error('unsupported type ' + code);
	  }
	
	  return type.decode({
	    type: type,
	    buffer: buffer,
	    code: code,
	
	    offset: offset + 1
	  });
	}
	
	(0, _initializer2.default)();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	
	
	/**
	 * Checks if the input value is `null` or `undefined`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Type
	 * @sig * -> Boolean
	 * @param {*} x The value to test.
	 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
	 * @example
	 *
	 *      R.isNil(null); //=> true
	 *      R.isNil(undefined); //=> true
	 *      R.isNil(0); //=> false
	 *      R.isNil([]); //=> false
	 */
	module.exports = _curry1(function isNil(x) { return x == null; });


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(4);
	
	
	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("yarpex");

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var codes = {
	  Start: 131,
	  Utf8SmallAtom: 119,
	  Utf8Atom: 118,
	  SmallAtom: 115,
	  Atom: 100,
	  Binary: 109,
	  SmallInteger: 97,
	  Integer: 98,
	  SmallBig: 110,
	  LargeBig: 111,
	  Float: 99,
	  NewFloat: 70,
	  String: 107,
	  List: 108,
	  SmallTuple: 104,
	  LargeTuple: 105,
	  Nil: 106,
	  Map: 116
	};
	
	exports.default = codes;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.typesByTag = exports.typesByName = exports.typesByCode = undefined;
	
	var _forEach = __webpack_require__(8);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	exports.registerType = registerType;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var typesByCode = exports.typesByCode = {};
	var typesByName = exports.typesByName = {};
	var typesByTag = exports.typesByTag = {};
	
	function registerType(type) {
	  typesByName[type.name] = type;
	
	  if (type.codes) {
	    (0, _forEach2.default)(function (x) {
	      return typesByCode[x] = type;
	    }, type.codes);
	  }
	
	  if (type.tags) {
	    (0, _forEach2.default)(function (x) {
	      return typesByTag[x] = type;
	    }, type.tags);
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _checkForMethod = __webpack_require__(9);
	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Iterate over an input `list`, calling a provided function `fn` for each
	 * element in the list.
	 *
	 * `fn` receives one argument: *(value)*.
	 *
	 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.forEach` method. For more
	 * details on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
	 *
	 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
	 * the original array. In some libraries this function is named `each`.
	 *
	 * Dispatches to the `forEach` method of the second argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.1
	 * @category List
	 * @sig (a -> *) -> [a] -> [a]
	 * @param {Function} fn The function to invoke. Receives one argument, `value`.
	 * @param {Array} list The list to iterate over.
	 * @return {Array} The original list.
	 * @see R.addIndex
	 * @example
	 *
	 *      var printXPlusFive = x => console.log(x + 5);
	 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
	 *      // logs 6
	 *      // logs 7
	 *      // logs 8
	 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
	 */
	module.exports = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
	  var len = list.length;
	  var idx = 0;
	  while (idx < len) {
	    fn(list[idx]);
	    idx += 1;
	  }
	  return list;
	}));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(10);
	
	
	/**
	 * This checks whether a function has a [methodname] function. If it isn't an
	 * array it will execute that function otherwise it will default to the ramda
	 * implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function() {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return (_isArray(obj) || typeof obj[methodname] !== 'function') ?
	      fn.apply(this, arguments) :
	      obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
	  };
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return (val != null &&
	          val.length >= 0 &&
	          Object.prototype.toString.call(val) === '[object Array]');
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	var _isPlaceholder = __webpack_require__(4);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _forEach = __webpack_require__(8);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	exports.default = init;
	
	var _index = __webpack_require__(7);
	
	var _map = __webpack_require__(13);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _list = __webpack_require__(47);
	
	var _list2 = _interopRequireDefault(_list);
	
	var _tuple = __webpack_require__(36);
	
	var _tuple2 = _interopRequireDefault(_tuple);
	
	var _atom = __webpack_require__(48);
	
	var _atom2 = _interopRequireDefault(_atom);
	
	var _integer = __webpack_require__(50);
	
	var _integer2 = _interopRequireDefault(_integer);
	
	var _float = __webpack_require__(61);
	
	var _float2 = _interopRequireDefault(_float);
	
	var _binary = __webpack_require__(49);
	
	var _binary2 = _interopRequireDefault(_binary);
	
	var _charlist = __webpack_require__(62);
	
	var _charlist2 = _interopRequireDefault(_charlist);
	
	var _regex = __webpack_require__(63);
	
	var _regex2 = _interopRequireDefault(_regex);
	
	var _time = __webpack_require__(64);
	
	var _time2 = _interopRequireDefault(_time);
	
	var _nil = __webpack_require__(65);
	
	var _nil2 = _interopRequireDefault(_nil);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function init() {
	  var types = [_map2.default, _list2.default, _tuple2.default, _atom2.default, _integer2.default, _charlist2.default, _float2.default, _binary2.default, _regex2.default, _time2.default, _nil2.default];
	
	  (0, _forEach2.default)(_index.registerType, types);
	}
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _prop = __webpack_require__(14);
	
	var _prop2 = _interopRequireDefault(_prop);
	
	var _map = __webpack_require__(15);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _reduce = __webpack_require__(32);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.encode = encode;
	exports.decode = decode;
	exports.decodeComplex = decodeComplex;
	
	var _yarpex = __webpack_require__(5);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _serialization = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function encode(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  var offset = 0;
	  var header = Buffer.alloc(5);
	
	  offset = header.writeUInt8(_constants2.default.Map, offset);
	  offset = header.writeUInt32BE(value.length, offset);
	
	  var items = (0, _reduce2.default)(function (acc, _ref2) {
	    var _ref3 = _slicedToArray(_ref2, 2),
	        k = _ref3[0],
	        v = _ref3[1];
	
	    var key = (0, _serialization.encodeValue)(k);
	    var value = (0, _serialization.encodeValue)(v);
	
	    return acc.concat([key, value]);
	  }, [], value);
	
	  return Buffer.concat([header].concat(_toConsumableArray(items)));
	}
	
	function decode(_ref4) {
	  var type = _ref4.type,
	      buffer = _ref4.buffer,
	      offset = _ref4.offset;
	
	  var pairs = [];
	  var len = buffer.readUInt32BE(offset);
	
	  offset += 4;
	
	  for (var i = 0; i < len; i++) {
	    var _decodeValue = (0, _serialization.decodeValue)({ buffer: buffer, offset: offset }),
	        k = _decodeValue.value,
	        keyOffset = _decodeValue.offset;
	
	    var _decodeValue2 = (0, _serialization.decodeValue)({ buffer: buffer, offset: keyOffset }),
	        v = _decodeValue2.value,
	        valueOffset = _decodeValue2.offset;
	
	    pairs.push([k, v]);
	
	    offset = valueOffset;
	  }
	
	  return {
	    offset: offset,
	    value: (0, _yarpex.map)(pairs)
	  };
	}
	
	function decodeComplex(_ref5) {
	  var value = _ref5.value;
	
	  return (0, _yarpex.map)((0, _map2.default)((0, _prop2.default)('value'), value[0].value));
	}
	
	var map = (0, _type2.default)({
	  name: 'map',
	  codes: [_constants2.default.Map],
	  tags: ['dict'],
	  encode: encode,
	  decode: decode,
	  decodeComplex: decodeComplex
	});
	
	exports.default = map;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Returns a function that when supplied an object returns the indicated
	 * property of that object, if it exists.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig s -> {s: a} -> a | Undefined
	 * @param {String} p The property name
	 * @param {Object} obj The object to query
	 * @return {*} The value at `obj.p`.
	 * @see R.path
	 * @example
	 *
	 *      R.prop('x', {x: 100}); //=> 100
	 *      R.prop('x', {}); //=> undefined
	 */
	module.exports = _curry2(function prop(p, obj) { return obj[p]; });


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	var _dispatchable = __webpack_require__(16);
	var _map = __webpack_require__(18);
	var _reduce = __webpack_require__(19);
	var _xmap = __webpack_require__(25);
	var curryN = __webpack_require__(27);
	var keys = __webpack_require__(29);
	
	
	/**
	 * Takes a function and
	 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
	 * applies the function to each of the functor's values, and returns
	 * a functor of the same shape.
	 *
	 * Ramda provides suitable `map` implementations for `Array` and `Object`,
	 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
	 *
	 * Dispatches to the `map` method of the second argument, if present.
	 *
	 * Acts as a transducer if a transformer is given in list position.
	 *
	 * Also treats functions as functors and will compose them together.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig Functor f => (a -> b) -> f a -> f b
	 * @param {Function} fn The function to be called on every element of the input `list`.
	 * @param {Array} list The list to be iterated over.
	 * @return {Array} The new list.
	 * @see R.transduce, R.addIndex
	 * @example
	 *
	 *      var double = x => x * 2;
	 *
	 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	 *
	 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
	 * @symb R.map(f, [a, b]) = [f(a), f(b)]
	 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
	 * @symb R.map(f, functor_o) = functor_o.map(f)
	 */
	module.exports = _curry2(_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
	  switch (Object.prototype.toString.call(functor)) {
	    case '[object Function]':
	      return curryN(functor.length, function() {
	        return fn.call(this, functor.apply(this, arguments));
	      });
	    case '[object Object]':
	      return _reduce(function(acc, key) {
	        acc[key] = fn(functor[key]);
	        return acc;
	      }, {}, keys(functor));
	    default:
	      return _map(fn, functor);
	  }
	}));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _isArray = __webpack_require__(10);
	var _isTransformer = __webpack_require__(17);
	
	
	/**
	 * Returns a function that dispatches with different strategies based on the
	 * object in list position (last argument). If it is an array, executes [fn].
	 * Otherwise, if it has a function with one of the given method names, it will
	 * execute that function (functor case). Otherwise, if it is a transformer,
	 * uses transducer [xf] to return a new transformer (transducer case).
	 * Otherwise, it will default to executing [fn].
	 *
	 * @private
	 * @param {Array} methodNames properties to check for a custom implementation
	 * @param {Function} xf transducer to initialize if object is transformer
	 * @param {Function} fn default ramda implementation
	 * @return {Function} A function that dispatches on object in list position
	 */
	module.exports = function _dispatchable(methodNames, xf, fn) {
	  return function() {
	    if (arguments.length === 0) {
	      return fn();
	    }
	    var args = Array.prototype.slice.call(arguments, 0);
	    var obj = args.pop();
	    if (!_isArray(obj)) {
	      var idx = 0;
	      while (idx < methodNames.length) {
	        if (typeof obj[methodNames[idx]] === 'function') {
	          return obj[methodNames[idx]].apply(obj, args);
	        }
	        idx += 1;
	      }
	      if (_isTransformer(obj)) {
	        var transducer = xf.apply(null, args);
	        return transducer(obj);
	      }
	    }
	    return fn.apply(this, arguments);
	  };
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function _isTransformer(obj) {
	  return typeof obj['@@transducer/step'] === 'function';
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function _map(fn, functor) {
	  var idx = 0;
	  var len = functor.length;
	  var result = Array(len);
	  while (idx < len) {
	    result[idx] = fn(functor[idx]);
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var _isArrayLike = __webpack_require__(20);
	var _xwrap = __webpack_require__(22);
	var bind = __webpack_require__(23);
	
	
	module.exports = (function() {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0;
	    var len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }
	
	  function _methodReduce(xf, acc, obj, methodName) {
	    return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
	  }
	
	  var symIterator = (typeof Symbol !== 'undefined') ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (_isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list['fantasy-land/reduce'] === 'function') {
	      return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list, 'reduce');
	    }
	
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}());


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	var _isArray = __webpack_require__(10);
	var _isString = __webpack_require__(21);
	
	
	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @private
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      _isArrayLike([]); //=> true
	 *      _isArrayLike(true); //=> false
	 *      _isArrayLike({}); //=> false
	 *      _isArrayLike({length: 10}); //=> false
	 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) { return true; }
	  if (!x) { return false; }
	  if (typeof x !== 'object') { return false; }
	  if (_isString(x)) { return false; }
	  if (x.nodeType === 1) { return !!x.length; }
	  if (x.length === 0) { return true; }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = (function() {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function() {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function(acc) { return acc; };
	  XWrap.prototype['@@transducer/step'] = function(acc, x) {
	    return this.f(acc, x);
	  };
	
	  return function _xwrap(fn) { return new XWrap(fn); };
	}());


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(24);
	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 * @see R.partial
	 * @example
	 *
	 *      var log = R.bind(console.log, console);
	 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
	 *      // logs {a: 2}
	 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function() {
	    return fn.apply(thisObj, arguments);
	  });
	});


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	var _xfBase = __webpack_require__(26);
	
	
	module.exports = (function() {
	  function XMap(f, xf) {
	    this.xf = xf;
	    this.f = f;
	  }
	  XMap.prototype['@@transducer/init'] = _xfBase.init;
	  XMap.prototype['@@transducer/result'] = _xfBase.result;
	  XMap.prototype['@@transducer/step'] = function(result, input) {
	    return this.xf['@@transducer/step'](result, this.f(input));
	  };
	
	  return _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
	}());


/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = {
	  init: function() {
	    return this.xf['@@transducer/init']();
	  },
	  result: function(result) {
	    return this.xf['@@transducer/result'](result);
	  }
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(24);
	var _curry1 = __webpack_require__(3);
	var _curry2 = __webpack_require__(11);
	var _curryN = __webpack_require__(28);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(24);
	var _isPlaceholder = __webpack_require__(4);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (!_isPlaceholder(received[combinedIdx]) ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined)
	                     : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	var _has = __webpack_require__(30);
	var _isArguments = __webpack_require__(31);
	
	
	/**
	 * Returns a list containing the names of all the enumerable own properties of
	 * the supplied object.
	 * Note that the order of the output array is not guaranteed to be consistent
	 * across different JS platforms.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Object
	 * @sig {k: v} -> [k]
	 * @param {Object} obj The object to extract properties from
	 * @return {Array} An array of the object's own properties.
	 * @see R.keysIn, R.values
	 * @example
	 *
	 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	 */
	module.exports = (function() {
	  // cover IE < 9 keys issues
	  var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
	                            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	  // Safari bug
	  var hasArgsEnumBug = (function() {
	    'use strict';
	    return arguments.propertyIsEnumerable('length');
	  }());
	
	  var contains = function contains(list, item) {
	    var idx = 0;
	    while (idx < list.length) {
	      if (list[idx] === item) {
	        return true;
	      }
	      idx += 1;
	    }
	    return false;
	  };
	
	  return typeof Object.keys === 'function' && !hasArgsEnumBug ?
	    _curry1(function keys(obj) {
	      return Object(obj) !== obj ? [] : Object.keys(obj);
	    }) :
	    _curry1(function keys(obj) {
	      if (Object(obj) !== obj) {
	        return [];
	      }
	      var prop, nIdx;
	      var ks = [];
	      var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
	      for (prop in obj) {
	        if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
	          ks[ks.length] = prop;
	        }
	      }
	      if (hasEnumBug) {
	        nIdx = nonEnumerableProps.length - 1;
	        while (nIdx >= 0) {
	          prop = nonEnumerableProps[nIdx];
	          if (_has(prop, obj) && !contains(ks, prop)) {
	            ks[ks.length] = prop;
	          }
	          nIdx -= 1;
	        }
	      }
	      return ks;
	    });
	}());


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function _has(prop, obj) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var _has = __webpack_require__(30);
	
	
	module.exports = (function() {
	  var toString = Object.prototype.toString;
	  return toString.call(arguments) === '[object Arguments]' ?
	    function _isArguments(x) { return toString.call(x) === '[object Arguments]'; } :
	    function _isArguments(x) { return _has('callee', x); };
	}());


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var _curry3 = __webpack_require__(33);
	var _reduce = __webpack_require__(19);
	
	
	/**
	 * Returns a single item by iterating through the list, successively calling
	 * the iterator function and passing it an accumulator value and the current
	 * value from the array, and then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*. It may use
	 * [`R.reduced`](#reduced) to shortcut the iteration.
	 *
	 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
	 * is *(value, acc)*.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.reduce` method. For more details
	 * on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 *
	 * Dispatches to the `reduce` method of the third argument, if present. When
	 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
	 * shortcuting, as this is not implemented by `reduce`.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig ((a, b) -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @see R.reduced, R.addIndex, R.reduceRight
	 * @example
	 *
	 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
	 *                -               -10
	 *               / \              / \
	 *              -   4           -6   4
	 *             / \              / \
	 *            -   3   ==>     -3   3
	 *           / \              / \
	 *          -   2           -1   2
	 *         / \              / \
	 *        0   1            0   1
	 *
	 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
	 */
	module.exports = _curry3(_reduce);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	var _curry2 = __webpack_require__(11);
	var _isPlaceholder = __webpack_require__(4);
	
	
	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    switch (arguments.length) {
	      case 0:
	        return f3;
	      case 1:
	        return _isPlaceholder(a) ? f3
	             : _curry2(function(_b, _c) { return fn(a, _b, _c); });
	      case 2:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f3
	             : _isPlaceholder(a) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _curry1(function(_c) { return fn(a, b, _c); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3
	             : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) { return fn(_a, _b, c); })
	             : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) { return fn(_a, b, _c); })
	             : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) { return fn(a, _b, _c); })
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b, c); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b, c); })
	             : _isPlaceholder(c) ? _curry1(function(_c) { return fn(a, b, _c); })
	             : fn(a, b, c);
	    }
	  };
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = type;
	exports.complexType = complexType;
	
	var _complex = __webpack_require__(35);
	
	function type(_ref) {
	  var name = _ref.name,
	      codes = _ref.codes,
	      tags = _ref.tags,
	      encode = _ref.encode,
	      decode = _ref.decode,
	      decodeComplex = _ref.decodeComplex;
	
	  return {
	    name: name,
	    codes: codes,
	    tags: tags,
	    encode: encode,
	    decode: decode,
	    decodeComplex: decodeComplex
	  };
	}
	
	function complexType(_ref2) {
	  var name = _ref2.name,
	      tags = _ref2.tags,
	      encodeComplex = _ref2.encodeComplex,
	      decodeComplex = _ref2.decodeComplex;
	
	  return {
	    name: name,
	    tags: tags,
	    encode: (0, _complex.encode)(encodeComplex),
	    decodeComplex: decodeComplex
	  };
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encode = encode;
	exports.decode = decode;
	
	var _yarpex = __webpack_require__(5);
	
	var _tuple = __webpack_require__(36);
	
	var _index = __webpack_require__(7);
	
	function encode(encoder) {
	  return function (_ref) {
	    var type = _ref.type,
	        value = _ref.value;
	
	    var tuple = [(0, _yarpex.atom)('bert')].concat(encoder({ type: type, value: value }));
	
	    return (0, _tuple.encode)({
	      type: type,
	      value: tuple
	    });
	  };
	}
	
	function decode(complex) {
	  if (complex[0].type.name !== 'atom' && complex[0].value !== 'bert') {
	    throw new Error('value cannot be decoded');
	  }
	
	  var tag = complex[1].value;
	  var type = _index.typesByTag[tag];
	
	  if (type == null) {
	    throw new Error('unsupported type ' + tag);
	  }
	
	  return type.decodeComplex({ type: type, tag: tag, value: complex.slice(2) });
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(37);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _equals = __webpack_require__(39);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _cond = __webpack_require__(45);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	exports.encode = encode;
	exports.decode = decode;
	exports.decodeCore = decodeCore;
	
	var _yarpex = __webpack_require__(5);
	
	var _list = __webpack_require__(47);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _complex = __webpack_require__(35);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encode(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  if (value.length < 256) {
	    return (0, _list.encodeList)({
	      value: value,
	      code: _constants2.default.SmallTuple,
	      sizeLen: 1
	    });
	  } else {
	    return (0, _list.encodeList)({
	      value: value,
	      code: _constants2.default.LargeTuple,
	      sizeLen: 4
	    });
	  }
	}
	
	function decode(_ref2) {
	  var type = _ref2.type,
	      buffer = _ref2.buffer,
	      offset = _ref2.offset,
	      code = _ref2.code;
	
	  var _decodeCore = decodeCore({ create: _yarpex.tuple, type: type, buffer: buffer, offset: offset, code: code }),
	      nextOffset = _decodeCore.offset,
	      value = _decodeCore.value;
	
	  if (value.value[0].type.name === 'atom' && value.value[0].value === 'bert') {
	    return {
	      offset: nextOffset,
	      value: (0, _complex.decode)(value.value)
	    };
	  }
	
	  return {
	    offset: nextOffset,
	    value: value
	  };
	}
	
	function decodeCore(_ref3) {
	  var create = _ref3.create,
	      type = _ref3.type,
	      buffer = _ref3.buffer,
	      offset = _ref3.offset,
	      code = _ref3.code;
	
	  return (0, _cond2.default)([[(0, _equals2.default)(_constants2.default.SmallTuple), function (λ) {
	    return (0, _list.decodeList)({ create: create, buffer: buffer, offset: offset, type: type, sizeLen: 1, hasTail: false });
	  }], [(0, _equals2.default)(_constants2.default.LargeTuple), function (λ) {
	    return (0, _list.decodeList)({ create: create, buffer: buffer, offset: offset, type: type, sizeLen: 4, hasTail: false });
	  }], [_T2.default, function (λ) {
	    throw new Error('invalid atom type when decoding');
	  }]])(code);
	}
	
	var tuple = (0, _type2.default)({
	  name: 'tuple',
	  codes: [_constants2.default.SmallTuple, _constants2.default.LargeTuple],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = tuple;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var always = __webpack_require__(38);
	
	
	/**
	 * A function that always returns `true`. Any passed in parameters are ignored.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.9.0
	 * @category Function
	 * @sig * -> Boolean
	 * @param {*}
	 * @return {Boolean}
	 * @see R.always, R.F
	 * @example
	 *
	 *      R.T(); //=> true
	 */
	module.exports = always(true);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	
	
	/**
	 * Returns a function that always returns the given value. Note that for
	 * non-primitives the value returned is a reference to the original value.
	 *
	 * This function is known as `const`, `constant`, or `K` (for K combinator) in
	 * other languages and libraries.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig a -> (* -> a)
	 * @param {*} val The value to wrap in a function
	 * @return {Function} A Function :: * -> val.
	 * @example
	 *
	 *      var t = R.always('Tee');
	 *      t(); //=> 'Tee'
	 */
	module.exports = _curry1(function always(val) {
	  return function() {
	    return val;
	  };
	});


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	var _equals = __webpack_require__(40);
	
	
	/**
	 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
	 * cyclical data structures.
	 *
	 * Dispatches symmetrically to the `equals` methods of both arguments, if
	 * present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Relation
	 * @sig a -> b -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @example
	 *
	 *      R.equals(1, 1); //=> true
	 *      R.equals(1, '1'); //=> false
	 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	 *
	 *      var a = {}; a.v = a;
	 *      var b = {}; b.v = b;
	 *      R.equals(a, b); //=> true
	 */
	module.exports = _curry2(function equals(a, b) {
	  return _equals(a, b, [], []);
	});


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var _arrayFromIterator = __webpack_require__(41);
	var _functionName = __webpack_require__(42);
	var _has = __webpack_require__(30);
	var identical = __webpack_require__(43);
	var keys = __webpack_require__(29);
	var type = __webpack_require__(44);
	
	
	module.exports = function _equals(a, b, stackA, stackB) {
	  if (identical(a, b)) {
	    return true;
	  }
	
	  if (type(a) !== type(b)) {
	    return false;
	  }
	
	  if (a == null || b == null) {
	    return false;
	  }
	
	  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
	    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) &&
	           typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
	  }
	
	  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
	    return typeof a.equals === 'function' && a.equals(b) &&
	           typeof b.equals === 'function' && b.equals(a);
	  }
	
	  switch (type(a)) {
	    case 'Arguments':
	    case 'Array':
	    case 'Object':
	      if (typeof a.constructor === 'function' &&
	          _functionName(a.constructor) === 'Promise') {
	        return a === b;
	      }
	      break;
	    case 'Boolean':
	    case 'Number':
	    case 'String':
	      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
	        return false;
	      }
	      break;
	    case 'Date':
	      if (!identical(a.valueOf(), b.valueOf())) {
	        return false;
	      }
	      break;
	    case 'Error':
	      return a.name === b.name && a.message === b.message;
	    case 'RegExp':
	      if (!(a.source === b.source &&
	            a.global === b.global &&
	            a.ignoreCase === b.ignoreCase &&
	            a.multiline === b.multiline &&
	            a.sticky === b.sticky &&
	            a.unicode === b.unicode)) {
	        return false;
	      }
	      break;
	    case 'Map':
	    case 'Set':
	      if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
	        return false;
	      }
	      break;
	    case 'Int8Array':
	    case 'Uint8Array':
	    case 'Uint8ClampedArray':
	    case 'Int16Array':
	    case 'Uint16Array':
	    case 'Int32Array':
	    case 'Uint32Array':
	    case 'Float32Array':
	    case 'Float64Array':
	      break;
	    case 'ArrayBuffer':
	      break;
	    default:
	      // Values of other types are only equal if identical.
	      return false;
	  }
	
	  var keysA = keys(a);
	  if (keysA.length !== keys(b).length) {
	    return false;
	  }
	
	  var idx = stackA.length - 1;
	  while (idx >= 0) {
	    if (stackA[idx] === a) {
	      return stackB[idx] === b;
	    }
	    idx -= 1;
	  }
	
	  stackA.push(a);
	  stackB.push(b);
	  idx = keysA.length - 1;
	  while (idx >= 0) {
	    var key = keysA[idx];
	    if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
	      return false;
	    }
	    idx -= 1;
	  }
	  stackA.pop();
	  stackB.pop();
	  return true;
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function _arrayFromIterator(iter) {
	  var list = [];
	  var next;
	  while (!(next = iter.next()).done) {
	    list.push(next.value);
	  }
	  return list;
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function _functionName(f) {
	  // String(x => x) evaluates to "x => x", so the pattern may not match.
	  var match = String(f).match(/^function (\w*)/);
	  return match == null ? '' : match[1];
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Returns true if its arguments are identical, false otherwise. Values are
	 * identical if they reference the same memory. `NaN` is identical to `NaN`;
	 * `0` and `-0` are not identical.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.15.0
	 * @category Relation
	 * @sig a -> a -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @example
	 *
	 *      var o = {};
	 *      R.identical(o, o); //=> true
	 *      R.identical(1, 1); //=> true
	 *      R.identical(1, '1'); //=> false
	 *      R.identical([], []); //=> false
	 *      R.identical(0, -0); //=> false
	 *      R.identical(NaN, NaN); //=> true
	 */
	module.exports = _curry2(function identical(a, b) {
	  // SameValue algorithm
	  if (a === b) { // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return a !== 0 || 1 / a === 1 / b;
	  } else {
	    // Step 6.a: NaN == NaN
	    return a !== a && b !== b;
	  }
	});


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	
	
	/**
	 * Gives a single-word string description of the (native) type of a value,
	 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
	 * attempt to distinguish user Object types any further, reporting them all as
	 * 'Object'.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.8.0
	 * @category Type
	 * @sig (* -> {*}) -> String
	 * @param {*} val The value to test
	 * @return {String}
	 * @example
	 *
	 *      R.type({}); //=> "Object"
	 *      R.type(1); //=> "Number"
	 *      R.type(false); //=> "Boolean"
	 *      R.type('s'); //=> "String"
	 *      R.type(null); //=> "Null"
	 *      R.type([]); //=> "Array"
	 *      R.type(/[A-z]/); //=> "RegExp"
	 *      R.type(() => {}); //=> "Function"
	 */
	module.exports = _curry1(function type(val) {
	  return val === null      ? 'Null'      :
	         val === undefined ? 'Undefined' :
	         Object.prototype.toString.call(val).slice(8, -1);
	});


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(24);
	var _curry1 = __webpack_require__(3);
	var map = __webpack_require__(15);
	var max = __webpack_require__(46);
	var reduce = __webpack_require__(32);
	
	
	/**
	 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
	 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
	 * to `fn` are applied to each of the predicates in turn until one returns a
	 * "truthy" value, at which point `fn` returns the result of applying its
	 * arguments to the corresponding transformer. If none of the predicates
	 * matches, `fn` returns undefined.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Logic
	 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
	 * @param {Array} pairs A list of [predicate, transformer]
	 * @return {Function}
	 * @example
	 *
	 *      var fn = R.cond([
	 *        [R.equals(0),   R.always('water freezes at 0°C')],
	 *        [R.equals(100), R.always('water boils at 100°C')],
	 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
	 *      ]);
	 *      fn(0); //=> 'water freezes at 0°C'
	 *      fn(50); //=> 'nothing special happens at 50°C'
	 *      fn(100); //=> 'water boils at 100°C'
	 */
	module.exports = _curry1(function cond(pairs) {
	  var arity = reduce(max,
	                     0,
	                     map(function(pair) { return pair[0].length; }, pairs));
	  return _arity(arity, function() {
	    var idx = 0;
	    while (idx < pairs.length) {
	      if (pairs[idx][0].apply(this, arguments)) {
	        return pairs[idx][1].apply(this, arguments);
	      }
	      idx += 1;
	    }
	  });
	});


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Returns the larger of its two arguments.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> a
	 * @param {*} a
	 * @param {*} b
	 * @return {*}
	 * @see R.maxBy, R.min
	 * @example
	 *
	 *      R.max(789, 123); //=> 789
	 *      R.max('a', 'b'); //=> 'b'
	 */
	module.exports = _curry2(function max(a, b) { return b > a ? b : a; });


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isNil = __webpack_require__(2);
	
	var _isNil2 = _interopRequireDefault(_isNil);
	
	var _reduce = __webpack_require__(32);
	
	var _reduce2 = _interopRequireDefault(_reduce);
	
	exports.encodeList = encodeList;
	exports.decodeList = decodeList;
	exports.encode = encode;
	exports.decode = decode;
	
	var _yarpex = __webpack_require__(5);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _serialization = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function encodeList(_ref) {
	  var code = _ref.code,
	      value = _ref.value,
	      sizeLen = _ref.sizeLen,
	      tail = _ref.tail;
	
	  var offset = void 0;
	  var header = Buffer.alloc(1 + sizeLen);
	
	  offset = header.writeUInt8(code, offset);
	  offset = header.writeUIntBE(value.length, offset, sizeLen);
	
	  var items = (0, _reduce2.default)(function (acc, item) {
	    var value = (0, _serialization.encodeValue)(item);
	
	    return acc.concat([value]);
	  }, [], value);
	
	  if ((0, _isNil2.default)(tail)) {
	    return Buffer.concat([header].concat(_toConsumableArray(items)));
	  } else {
	    return Buffer.concat([header].concat(_toConsumableArray(items), [Buffer.from(tail)]));
	  }
	}
	
	function decodeList(_ref2) {
	  var create = _ref2.create,
	      type = _ref2.type,
	      buffer = _ref2.buffer,
	      startOffset = _ref2.offset,
	      sizeLen = _ref2.sizeLen,
	      hasTail = _ref2.hasTail;
	
	  var offset = startOffset;
	  var items = [];
	  var len = buffer.readUIntBE(offset, sizeLen);
	
	  offset += sizeLen;
	
	  for (var i = 0; i < len; i++) {
	    var _decodeValue = (0, _serialization.decodeValue)({ buffer: buffer, offset: offset }),
	        k = _decodeValue.value,
	        nextOffset = _decodeValue.offset;
	
	    items.push(k);
	
	    offset = nextOffset;
	  }
	
	  if (hasTail) {
	    var _decodeValue2 = (0, _serialization.decodeValue)({ buffer: buffer, offset: offset }),
	        lol = _decodeValue2.value,
	        nextOffset = _decodeValue2.offset;
	
	    offset = nextOffset;
	  }
	
	  return {
	    offset: offset,
	
	    value: create(items)
	  };
	}
	
	function encode(_ref3) {
	  var value = _ref3.value;
	
	  return encodeList({
	    code: _constants2.default.List,
	    value: value,
	    sizeLen: 4,
	    tail: [_constants2.default.Nil]
	  });
	}
	
	function decode(_ref4) {
	  var code = _ref4.code,
	      buffer = _ref4.buffer,
	      offset = _ref4.offset;
	
	  if (code === _constants2.default.Nil) {
	    return {
	      offset: offset,
	      value: []
	    };
	  }
	
	  return decodeList({
	    create: _yarpex.list,
	    type: _type2.default,
	    buffer: buffer,
	    offset: offset,
	    sizeLen: 4,
	    hasTail: true
	  });
	}
	
	var list = (0, _type2.default)({
	  name: 'list',
	  codes: [_constants2.default.List, _constants2.default.Nil],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = list;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _T = __webpack_require__(37);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _equals = __webpack_require__(39);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _cond = __webpack_require__(45);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	exports.encode = encode;
	exports.decode = decode;
	
	var _yarpex = __webpack_require__(5);
	
	var _binary = __webpack_require__(49);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encode(_ref) {
	  var value = _ref.value;
	
	  if (value.length <= 255) {
	    return (0, _binary.encodeBinary)({ value: value, code: _constants2.default.Utf8SmallAtom, sizeLen: 1, encoding: 'utf-8' });
	  }
	
	  return (0, _binary.encodeBinary)({ value: value, code: _constants2.default.Utf8Atom, sizeLen: 2, encoding: 'utf-8' });
	}
	
	function decode(_ref2) {
	  var buffer = _ref2.buffer,
	      offset = _ref2.offset,
	      code = _ref2.code;
	
	  return (0, _cond2.default)([[(0, _equals2.default)(_constants2.default.SmallAtom), function () {
	    return (0, _binary.decodeBinary)({ create: _yarpex.atom, buffer: buffer, offset: offset, sizeLen: 0, encoding: 'latin1' });
	  }], [(0, _equals2.default)(_constants2.default.Atom), function () {
	    return (0, _binary.decodeBinary)({ create: _yarpex.atom, buffer: buffer, offset: offset, sizeLen: 2, encoding: 'latin1' });
	  }], [(0, _equals2.default)(_constants2.default.Utf8SmallAtom), function () {
	    return (0, _binary.decodeBinary)({ create: _yarpex.atom, buffer: buffer, offset: offset, sizeLen: 1, encoding: 'utf-8' });
	  }], [(0, _equals2.default)(_constants2.default.Utf8Atom), function () {
	    return (0, _binary.decodeBinary)({ create: _yarpex.atom, buffer: buffer, offset: offset, sizeLen: 2, encoding: 'utf-8' });
	  }], [_T2.default, function () {
	    throw new Error('invalid atom type when decoding');
	  }]])(code);
	}
	
	var atom = (0, _type2.default)({
	  name: 'atom',
	  codes: [_constants2.default.Utf8SmallAtom, _constants2.default.Utf8Atom, _constants2.default.SmallAtom, _constants2.default.Atom],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = atom;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encode = encode;
	exports.decode = decode;
	exports.encodeBinary = encodeBinary;
	exports.decodeBinary = decodeBinary;
	
	var _yarpex = __webpack_require__(5);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encode(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  return encodeBinary({
	    value: value,
	
	    code: _constants2.default.Binary,
	    sizeLen: 4,
	    encoding: 'utf-8'
	  });
	}
	
	function decode(_ref2) {
	  var type = _ref2.type,
	      buffer = _ref2.buffer,
	      offset = _ref2.offset,
	      code = _ref2.code;
	
	  return decodeBinary({
	    create: _yarpex.binary,
	    buffer: buffer,
	    offset: offset,
	    type: type,
	
	    sizeLen: 4,
	    encoding: 'utf-8'
	  });
	}
	
	function encodeBinary(_ref3) {
	  var code = _ref3.code,
	      sizeLen = _ref3.sizeLen,
	      value = _ref3.value,
	      encoding = _ref3.encoding;
	
	  var offset = 0;
	  var byteLen = Buffer.byteLength(value, encoding);
	  var buffer = Buffer.alloc(1 + sizeLen + byteLen);
	
	  offset = buffer.writeUInt8(code, offset);
	  offset = buffer.writeUIntBE(byteLen, offset, sizeLen);
	  offset = buffer.write(value, offset, byteLen, encoding);
	
	  return buffer;
	}
	
	function decodeBinary(_ref4) {
	  var create = _ref4.create,
	      buffer = _ref4.buffer,
	      offset = _ref4.offset,
	      sizeLen = _ref4.sizeLen,
	      type = _ref4.type,
	      encoding = _ref4.encoding;
	
	  var len = buffer.readUIntBE(offset, sizeLen);
	  var end = offset + sizeLen + len;
	  var value = buffer.toString(encoding, offset + sizeLen, end);
	
	  return {
	    value: create(value),
	    offset: end
	  };
	}
	
	var binary = (0, _type2.default)({
	  name: 'binary',
	  codes: [_constants2.default.Binary],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = binary;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _equals = __webpack_require__(39);
	
	var _equals2 = _interopRequireDefault(_equals);
	
	var _T = __webpack_require__(37);
	
	var _T2 = _interopRequireDefault(_T);
	
	var _cond = __webpack_require__(45);
	
	var _cond2 = _interopRequireDefault(_cond);
	
	var _lt = __webpack_require__(51);
	
	var _lt2 = _interopRequireDefault(_lt);
	
	var _ = __webpack_require__(52);
	
	var _2 = _interopRequireDefault(_);
	
	var _gte = __webpack_require__(53);
	
	var _gte2 = _interopRequireDefault(_gte);
	
	var _both = __webpack_require__(54);
	
	var _both2 = _interopRequireDefault(_both);
	
	exports.encode = encode;
	exports.decode = decode;
	
	var _yarpex = __webpack_require__(5);
	
	var _float = __webpack_require__(61);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isFloat = function isFloat(x) {
	  return x % 1 !== 0;
	};
	
	var between = function between(min, max) {
	  return (0, _both2.default)((0, _gte2.default)(_2.default, min), (0, _lt2.default)(_2.default, max));
	};
	
	function encode(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  return (0, _cond2.default)([[isFloat, function (λ) {
	    return (0, _float.encode)({ type: type, value: value });
	  }], [between(0, 256), function (λ) {
	    return encodeInteger({ value: value, code: _constants2.default.SmallInteger, sizeLen: 1, signed: false });
	  }], [between(-134217728, 134217727), function (λ) {
	    return encodeInteger({ value: value, code: _constants2.default.Integer, sizeLen: 4, signed: true });
	  }], [_T2.default, function (λ) {
	    return encodeBigInteger({ type: type, value: value });
	  }]])(value);
	}
	
	function decode(_ref2) {
	  var type = _ref2.type,
	      buffer = _ref2.buffer,
	      offset = _ref2.offset,
	      code = _ref2.code;
	
	  return (0, _cond2.default)([[(0, _equals2.default)(_constants2.default.SmallInteger), function (λ) {
	    return decodeInteger({ buffer: buffer, offset: offset, sizeLen: 1, signed: false });
	  }], [(0, _equals2.default)(_constants2.default.Integer), function (λ) {
	    return decodeInteger({ buffer: buffer, offset: offset, sizeLen: 4, signed: true });
	  }], [(0, _equals2.default)(_constants2.default.SmallBig), function (λ) {
	    return decodeBigInteger({ buffer: buffer, offset: offset, sizeLen: 1 });
	  }], [(0, _equals2.default)(_constants2.default.LargeBig), function (λ) {
	    return decodeBigInteger({ buffer: buffer, offset: offset, sizeLen: 4 });
	  }]])(code);
	}
	
	var integer = (0, _type2.default)({
	  name: 'integer',
	  codes: [_constants2.default.SmallInteger, _constants2.default.Integer, _constants2.default.SmallBig, _constants2.default.LargeBig],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = integer;
	
	
	function encodeInteger(_ref3) {
	  var code = _ref3.code,
	      sizeLen = _ref3.sizeLen,
	      value = _ref3.value,
	      signed = _ref3.signed;
	
	  var offset = 0;
	  var buffer = Buffer.alloc(1 + sizeLen);
	
	  offset = buffer.writeUInt8(code, offset);
	
	  if (signed) {
	    buffer.writeIntBE(value, offset, sizeLen);
	  } else {
	    buffer.writeUIntBE(value, offset, sizeLen);
	  }
	
	  return buffer;
	}
	
	function decodeInteger(_ref4) {
	  var buffer = _ref4.buffer,
	      offset = _ref4.offset,
	      sizeLen = _ref4.sizeLen,
	      signed = _ref4.signed;
	
	  var value = void 0;
	
	  if (signed) {
	    value = buffer.readIntBE(offset, sizeLen);
	  } else {
	    value = buffer.readUIntBE(offset, sizeLen);
	  }
	
	  return {
	    value: (0, _yarpex.integer)(value),
	    offset: offset + sizeLen
	  };
	}
	
	function encodeBigInteger(_ref5) {
	  var type = _ref5.type,
	      value = _ref5.value;
	
	  var code = 0;
	  var offset = 0;
	  var size = 0;
	  var len = Math.ceil(value / 256);
	  var negative = value < 0;
	
	  if (negative) {
	    value *= -1;
	  }
	
	  if (len < 256) {
	    code = _constants2.default.SmallBig;
	    size = 1;
	  } else {
	    code = _constants2.default.LargeBig;
	    size = 4;
	  }
	
	  buffer = Buffer.alloc(2 + size + len);
	
	  offset = buffer.writeUInt8(code, offset);
	
	  if (len < 256) {
	    offset = buffer.writeUInt8(len, offset, size);
	  } else {
	    offset = buffer.writeUIntBE(len, offset, size);
	  }
	
	  offset = buffer.writeUInt8(negative ? 1 : 0, offset);
	
	  while (value != 0) {
	    var rem = value % 256;
	
	    offset = buffer.writeUInt8(rem, offset);
	    value = Math.floor(value / 256);
	  }
	
	  return buffer;
	}
	
	function decodeBigInteger(_ref6) {
	  var buffer = _ref6.buffer,
	      offset = _ref6.offset,
	      size = _ref6.size;
	
	  var value = 0;
	  var len = buffer.readUIntBE(offset, size);
	  var negative = buffer.readUInt8(offset + size) == 1;
	
	  for (var i = 0; i < len; i++) {
	    var byte = buffer.readUInt8(offset + size + 1 + i);
	
	    value = value * 256 + byte;
	  }
	
	  if (negative) {
	    value = value * -1;
	  }
	
	  return {
	    value: (0, _yarpex.integer)(value),
	    offset: offset + size + len + 1
	  };
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Returns `true` if the first argument is less than the second; `false`
	 * otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> Boolean
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 * @see R.gt
	 * @example
	 *
	 *      R.lt(2, 1); //=> false
	 *      R.lt(2, 2); //=> false
	 *      R.lt(2, 3); //=> true
	 *      R.lt('a', 'z'); //=> true
	 *      R.lt('z', 'a'); //=> false
	 */
	module.exports = _curry2(function lt(a, b) { return a < b; });


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * A special placeholder value used to specify "gaps" within curried functions,
	 * allowing partial application of any combination of arguments, regardless of
	 * their positions.
	 *
	 * If `g` is a curried ternary function and `_` is `R.__`, the following are
	 * equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2, _)(1, 3)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @constant
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @example
	 *
	 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
	 *      greet('Alice'); //=> 'Hello, Alice!'
	 */
	module.exports = {'@@functional/placeholder': true};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Returns `true` if the first argument is greater than or equal to the second;
	 * `false` otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Relation
	 * @sig Ord a => a -> a -> Boolean
	 * @param {Number} a
	 * @param {Number} b
	 * @return {Boolean}
	 * @see R.lte
	 * @example
	 *
	 *      R.gte(2, 1); //=> true
	 *      R.gte(2, 2); //=> true
	 *      R.gte(2, 3); //=> false
	 *      R.gte('a', 'z'); //=> false
	 *      R.gte('z', 'a'); //=> true
	 */
	module.exports = _curry2(function gte(a, b) { return a >= b; });


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	var _isFunction = __webpack_require__(55);
	var and = __webpack_require__(56);
	var lift = __webpack_require__(57);
	
	
	/**
	 * A function which calls the two provided functions and returns the `&&`
	 * of the results.
	 * It returns the result of the first function if it is false-y and the result
	 * of the second function otherwise. Note that this is short-circuited,
	 * meaning that the second function will not be invoked if the first returns a
	 * false-y value.
	 *
	 * In addition to functions, `R.both` also accepts any fantasy-land compatible
	 * applicative functor.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.12.0
	 * @category Logic
	 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	 * @param {Function} f A predicate
	 * @param {Function} g Another predicate
	 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
	 * @see R.and
	 * @example
	 *
	 *      var gt10 = R.gt(R.__, 10)
	 *      var lt20 = R.lt(R.__, 20)
	 *      var f = R.both(gt10, lt20);
	 *      f(15); //=> true
	 *      f(30); //=> false
	 */
	module.exports = _curry2(function both(f, g) {
	  return _isFunction(f) ?
	    function _both() {
	      return f.apply(this, arguments) && g.apply(this, arguments);
	    } :
	    lift(and)(f, g);
	});


/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function _isFunction(x) {
	  return Object.prototype.toString.call(x) === '[object Function]';
	};


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	
	
	/**
	 * Returns `true` if both arguments are `true`; `false` otherwise.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Logic
	 * @sig a -> b -> a | b
	 * @param {Any} a
	 * @param {Any} b
	 * @return {Any} the first argument if it is falsy, otherwise the second argument.
	 * @see R.both
	 * @example
	 *
	 *      R.and(true, true); //=> true
	 *      R.and(true, false); //=> false
	 *      R.and(false, true); //=> false
	 *      R.and(false, false); //=> false
	 */
	module.exports = _curry2(function and(a, b) {
	  return a && b;
	});


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(3);
	var liftN = __webpack_require__(58);
	
	
	/**
	 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
	 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category Function
	 * @sig (*... -> *) -> ([*]... -> [*])
	 * @param {Function} fn The function to lift into higher context
	 * @return {Function} The lifted function.
	 * @see R.liftN
	 * @example
	 *
	 *      var madd3 = R.lift((a, b, c) => a + b + c);
	 *
	 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	 *
	 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
	 *
	 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	 */
	module.exports = _curry1(function lift(fn) {
	  return liftN(fn.length, fn);
	});


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(11);
	var _reduce = __webpack_require__(19);
	var ap = __webpack_require__(59);
	var curryN = __webpack_require__(27);
	var map = __webpack_require__(15);
	
	
	/**
	 * "lifts" a function to be the specified arity, so that it may "map over" that
	 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.7.0
	 * @category Function
	 * @sig Number -> (*... -> *) -> ([*]... -> [*])
	 * @param {Function} fn The function to lift into higher context
	 * @return {Function} The lifted function.
	 * @see R.lift, R.ap
	 * @example
	 *
	 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
	 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	 */
	module.exports = _curry2(function liftN(arity, fn) {
	  var lifted = curryN(arity, fn);
	  return curryN(arity, function() {
	    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
	  });
	});


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var _concat = __webpack_require__(60);
	var _curry2 = __webpack_require__(11);
	var _reduce = __webpack_require__(19);
	var map = __webpack_require__(15);
	
	
	/**
	 * ap applies a list of functions to a list of values.
	 *
	 * Dispatches to the `ap` method of the second argument, if present. Also
	 * treats curried functions as applicatives.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.3.0
	 * @category Function
	 * @sig [a -> b] -> [a] -> [b]
	 * @sig Apply f => f (a -> b) -> f a -> f b
	 * @param {*} applyF
	 * @param {*} applyX
	 * @return {*}
	 * @example
	 *
	 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
	 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
	 */
	module.exports = _curry2(function ap(applyF, applyX) {
	  return (
	    typeof applyX['fantasy-land/ap'] === 'function' ?
	      applyX['fantasy-land/ap'](applyF) :
	    typeof applyF.ap === 'function' ?
	      applyF.ap(applyX) :
	    typeof applyF === 'function' ?
	      function(x) { return applyF(x)(applyX(x)); } :
	    // else
	      _reduce(function(acc, f) { return _concat(acc, map(f, applyX)); }, [], applyF)
	  );
	});


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Private `concat` function to merge two array-like objects.
	 *
	 * @private
	 * @param {Array|Arguments} [set1=[]] An array-like object.
	 * @param {Array|Arguments} [set2=[]] An array-like object.
	 * @return {Array} A new, merged array.
	 * @example
	 *
	 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	 */
	module.exports = function _concat(set1, set2) {
	  set1 = set1 || [];
	  set2 = set2 || [];
	  var idx;
	  var len1 = set1.length;
	  var len2 = set2.length;
	  var result = [];
	
	  idx = 0;
	  while (idx < len1) {
	    result[result.length] = set1[idx];
	    idx += 1;
	  }
	  idx = 0;
	  while (idx < len2) {
	    result[result.length] = set2[idx];
	    idx += 1;
	  }
	  return result;
	};


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encode = encode;
	exports.decode = decode;
	
	var _yarpex = __webpack_require__(5);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encode(type, value) {
	  var offset = 0;
	  var buffer = Buffer.alloc(9);
	
	  offset = buffer.writeUInt8(_constants2.default.NewFloat, offset);
	  offset = buffer.writeDoubleBE(value, offset);
	
	  return buffer;
	}
	
	function decode(type, buffer, offset) {
	  return {
	    value: (0, _yarpex.float)(buffer.readDoubleBE(offset)),
	    offset: offset + 8
	  };
	}
	
	var float = (0, _type2.default)({
	  name: 'float',
	  codes: [_constants2.default.Float, _constants2.default.NewFloat],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = float;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encode = encode;
	exports.decode = decode;
	
	var _yarpex = __webpack_require__(5);
	
	var _binary = __webpack_require__(49);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _type = __webpack_require__(34);
	
	var _type2 = _interopRequireDefault(_type);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function encode(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  return (0, _binary.encodeBinary)({ value: value, code: _constants2.default.String, sizeLen: 2, encoding: 'utf-8' });
	}
	
	function decode(_ref2) {
	  var type = _ref2.type,
	      buffer = _ref2.buffer,
	      offset = _ref2.offset,
	      code = _ref2.code;
	
	  return (0, _binary.decodeBinary)({ create: _yarpex.charlist, buffer: buffer, offset: offset, sizeLen: 2, encoding: 'utf-8' });
	}
	
	var charlist = (0, _type2.default)({
	  name: 'charlist',
	  codes: [_constants2.default.String],
	  encode: encode,
	  decode: decode
	});
	
	exports.default = charlist;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encodeComplex = encodeComplex;
	exports.decodeComplex = decodeComplex;
	
	var _type = __webpack_require__(34);
	
	function encodeComplex(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  return [];
	}
	
	function decodeComplex(_ref2) {
	  var type = _ref2.type,
	      items = _ref2.items;
	
	  return null;
	}
	
	var regex = (0, _type.complexType)({
	  name: 'regex',
	  tag: ['regex'],
	  encodeComplex: encodeComplex,
	  decodeComplex: decodeComplex
	});
	
	exports.default = regex;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encodeComplex = encodeComplex;
	exports.decodeComplex = decodeComplex;
	
	var _yarpex = __webpack_require__(5);
	
	var _type = __webpack_require__(34);
	
	function encodeComplex(_ref) {
	  var type = _ref.type,
	      value = _ref.value;
	
	  var ms = value.getTime();
	  var micro = Math.floor(ms % 1000 * 1000);
	  var second = Math.floor(ms % 1000000000 / 1000);
	  var mega = Math.floor(ms / 1000000000);
	
	  return [(0, _yarpex.atom)('time'), (0, _yarpex.integer)(mega), (0, _yarpex.integer)(second), (0, _yarpex.integer)(micro)];
	}
	
	function decodeComplex(_ref2) {
	  var type = _ref2.type,
	      items = _ref2.items;
	
	  var mega = items[0].value;
	  var s = items[1].value;
	  var mili = items[2].value;
	  var ms = mega * 10000000000 + s * 1000 + mili / 1000;
	
	  return time(new Date(ms));
	}
	
	var time = (0, _type.complexType)({
	  name: 'time',
	  tags: ['time'],
	  encodeComplex: encodeComplex,
	  decodeComplex: decodeComplex
	});
	
	exports.default = time;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.encodeComplex = encodeComplex;
	exports.decodeComplex = decodeComplex;
	
	var _yarpex = __webpack_require__(5);
	
	var _type = __webpack_require__(34);
	
	function encodeComplex() {
	  return [(0, _yarpex.atom)('nil')];
	}
	
	function decodeComplex() {
	  return (0, _yarpex.nil)(null);
	}
	
	var nil = (0, _type.complexType)({
	  name: 'nil',
	  tags: ['nil'],
	  encodeComplex: encodeComplex,
	  decodeComplex: decodeComplex
	});
	
	exports.default = nil;

/***/ }
/******/ ]);
//# sourceMappingURL=yarpex-bert.js.map