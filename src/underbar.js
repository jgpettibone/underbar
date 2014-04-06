/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var arrLen = array.length;
    if (n > arrLen) {
	   var ind = 0;
    } else {
  	  var ind = arrLen-n;
    }
    return n === undefined ? array[arrLen-1] : array.slice(ind, arrLen);
  };

  // _.last = function(array, n) {
  //   // the index to start the slice will either be 
  //   // the arrLen - n (the last n elements) or it 
  //   // will be 0 if arrLen - n is a negative number
  //   // so I want the max of arrLen-n and 0
  //     var arrLen = array.length;
  //     return n === undefined ? array[arrLen-1] : array.slice(Math.max(arrLen-n, 0), arrLen);      
  // };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
  	  for (var i = 0; i < collection.length; i++) {
  	    iterator(collection[i], i, collection);
  	  }
    } else {
  	  for (var key in collection) {
	      iterator(collection[key], key, collection);
  	  }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;
    _.each(array, function(element, index) {
      if (element === target && result === -1) {
  		  result = index;
      }
	  });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var result = [];
    _.each(collection, function(element, index) {
      if (iterator(element)) {
    	  result.push(element);
      }
	  });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    var result = [];
    _.each(collection, function(element, index) {
      if (iterator(element) === false) {
  		  result.push(element);
      }
	  });
    return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    if (!array) {
      return null;
    }
    var seen={};
    var result = [];
    _.each(array, function(element) {
      if(!(element in seen)) {
    	  result.push(element);
    	  seen[element]=1;
      }
	  });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(array, function(element, index, collection) {
      result.push(iterator(element, index, collection));
	  });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    return _.map(list, function(element) {
      if (typeof methodName === 'function') {
    	  //function reference
    	  return methodName.apply(element, args);
      } else {
    	  //need context when string
    	  return element[methodName].apply(element, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    var prevVal = (initialValue === undefined ? 0 : initialValue);
    _.each(collection, function(element, index) {
      prevVal = iterator(prevVal, element);
	  });
    return prevVal;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var testBool = true;
    return _.reduce(collection, function(testBool, element) {
      if (!(testBool)) {
  		  return false;
      }
      return (iterator === undefined ? !!element : !!iterator(element));
	  }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var testBool = false;
    return _.reduce(collection, function(testBool, element) {
      if (testBool) {
  		  return true;
      }
      return (iterator === undefined ? !!element : !!iterator(element));
	  }, false);
  };

  // Logical some
  //   _.some = function(collection, iterator) {
  //   // TIP: There's a very clever way to re-use every() here.
  //   iterator = iterator || function(i) { 
  //     return i; 
  //   };
  //   return !_.every(collection, function(item) {
  //     return !iterator(item);
  //   });
  // };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var newObj = arguments[0];
    var initial = true;
    _.each(arguments, function(element, index) {
      if (!(initial)) {
    	  _.each(element, function(value, key) {
  	      newObj[key] = value;
	      });
      } else {
    	  initial = false;
      }
    });
    return newObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  _.defaults = function(obj) {
    var newObj = arguments[0];
    var initial = true;

    _.each(arguments, function(element, index) {
      if (!(initial)) {
    	  _.each(element, function(value, key) {
    		  if (!(key in newObj)) {
    		      newObj[key] = value;
    		  }
        });
      } else {
    	  initial = false;
      }
    });
    return newObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {      
    var results = {};
    var arg = arguments;
    var initial = true;
    return function() {
  	  if (initial) {
	      results[arg] = func.apply(this, arguments);
  	  }
  	  if (!(arg in results)) {
	      results[arg] = func.apply(this, arguments);
  	  }
  	  return results[arg];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var params = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() { return func.apply(null, params);}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.

  _.shuffle = function(array) {
    //shuffle array - Fisher-Yates shuffle via wikipedia
    //pseudocode worked backwards through array but probably could
    //change it to use _.each - later
    var newArr = array.slice();
    var len = array.length;
    for (var i=len-1; i>0; i--) {
  	  var rand = Math.round(Math.random() * (i-0) + 0);
  	  var temp = newArr[rand];
  	  newArr[rand] = newArr[i];
  	  newArr[i] = temp;
    }
    return newArr;
  };

  // Sort shuffle
  //_.shuffle = function(array) {
  //  return array.slice().sort(function() { return Math.random() - 0.5; });
  //};

  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort(function(a, b) {
      if (typeof iterator === 'string') {
        return a[String(iterator)] - b[String(iterator)];
      } else {
        return iterator(a) - iterator(b);
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var sortedArr = _.sortBy(Array.prototype.slice.call(arguments), 'length');
    var max = sortedArr.slice(-1)[0].length;
    var result = [];
    for(var i = 0; i < max; i++) {
      result[i] = _.pluck(arguments, i);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    return _.reduce(nestedArray, function(result, item){
      if (Array.isArray(item)) {
        return result.concat(_.flatten(item));
      } else {
        return result.concat(item);
      }
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var first = arguments[0];
    var others = Array.prototype.slice.call(arguments, 1);
    
    return _.filter(_.uniq(first), function(item) {
      return _.every(others, function(array) {
        return _.indexOf(array, item) > -1;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var first = arguments[0];
    var others = Array.prototype.slice.call(arguments, 1);
    
    return _.filter(_.uniq(first), function(item) {
      return _.every(others, function(array) {
        return _.indexOf(array, item) === -1;
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
