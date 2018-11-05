// create an object
// const pbj = {
//   name: 'PB&J',
//   bread: 'White',
//   ingredients: ['Peanut Butter', 'Jelly'],
//   cut: 'Triangles'
// };

// use a constructor function to create multiple objects
// & create methods on the constructed object
function Sandwich(bread, ingredients, name) {
  this.bread = bread;
  this.ingredients = ingredients;
  this.name = name;
  // this.serve = function () {
  //   return `Here's your ${this.name}. Enjoy!`; // this => Sandwich
  // }
}

// serve() is no longer part of the Sandwich constructor
function serve() {
  return `Here's your ${this.name}. Enjoy!`; // this => window || this => undefined
}

const gc = new Sandwich('White', ['Cheese'], 'Grilled Cheese');
const pbj = new Sandwich(
  'Wheat',
  ['Peanut Butter', 'Raspberry Jam'],
  'Peanut Butter & Jelly'
);

const blt = new Sandwich(
  'White',
  ['Bacon', 'Lettuce', 'Tomato', 'Mayo'],
  'Rectangle'
);

const reuben = new Sandwich(
  'Rye',
  ['Corned Beef', 'Sauerkraut', 'Swiss', 'Russian dressing'],
  'Diagonal'
);

// since functions are objects too, they can have properties (this) and their own methods (call)
// instead of invoking serve() directly, call() method of the serve function is being used
// in this case, apply() can be used interchangeably with call()
serve.call(gc);
serve.call(pbj);

// add name to sandwich before serving
// blt.name = 'BLT';
// blt.serve();

// attach a function to an object
// const pbj = {
//   name: 'PB&J',
//   bread: 'White',
//   ingredients: ['Peanut Butter', 'Jelly'],
//   cut: 'Triangles',
//   serve: function () {
//     return `Here's your ${this.name}. Enjoy!`;
//   }
// };

// pbj.serve();
// LOG: Here's your PB&J. Enjoy!


// === ANOTHER EXAMPLE ===
function serve(customer) {
  return `Hey ${customer}, here's your ${this.name}. Enjoy!`;
}

const gc = new Sandwich('White', ['Cheese'], 'Grilled Cheese');
const pbj = new Sandwich(
  'Wheat',
  ['Peanut Butter', 'Raspberry Jam'],
  'Peanut Butter & Jelly'
);

// this needs to be explicitly set when invoking serve() now as well as passing in a value for customer

// using call():
serve.call(gc, 'Terry');
serve.call(pbj, 'Jesse');

// using apply():
serve.apply(gc, ['Terry']);
serve.apply(pbj, ['Jesse']);

function deliverFood(customer, table) {
  return `Delivering ${this.name} to ${customer} at table ${table}`;
}

deliverFood.call(gc, 'Terry', '4');
deliverFood.apply(pbj, ['Jesse', '15']);

// === VARIADIC FUNCTIONS ===
// (functions that take a variable number of arguments)

function serve() {
  if (arguments.length > 0) {
    const customers = Array.prototype.slice.call(arguments); // the arguments object does not have a slice method (not an array), thus Array.prototype is being invoked to get to the slice function, and then explicitly set its this to arguments in order to turn them into an array
    // ^^ borrowing a function

    last = customers.pop();

    return `${this.name} for ${customers.join(', ')} and ${last}. Enjoy!`;
  } else {
    return `${this.name}. Order up!`;
  }
}

serve.call(gc);
// => 'Grilled Cheese. Order up!'

serve.apply(pbj, ['Terry', 'Tom', 'Tabitha']);
// => 'Peanut Butter & Jelly for Terry, Tom and Tabitha. Enjoy!'

// === BORROWING FUNCTIONS ===
function Sandwich(bread, ingredients, name) {
  this.bread = bread;
  this.ingredients = ingredients;
  this.name = name;
  this.describe = function () {
    return `Your ${this.name} includes: ${this.ingredients.join(', ')}. Yum!`;
  };
}

const pbj = new Sandwich(
  'Wheat',
  ['Chunky Peanut Butter', 'Blackberry Preserves'],
  'PB&Jam'
);

pbj.describe();

const salad = {
  ingredients: [
    'Croutons',
    'Romaine Hearts',
    'Steak',
    'Parmesan',
    'Caesar Dressing'
  ],
  name: 'Steak Caesar'
};

// describing salad as if it were a Sandwich object
// this works b/c call is used to explicitly set this on the describe method to the salad object
pbj.describe.call(salad);

// BIND()
// when we need to hold on to the function and delay calling it until later
// like borrow the describe function in a way that we can call it from the salad
// as with call(), bind() takes in the first argument to be the value for this in the target function, then any arguments for the target function come after
// the difference in execution: call() executes immediately; bind() creates a new function with that this value set, and it can execute whenever

pbj.describe.bind(salad);
// didn't execute

// we need to hold the function so that we could call it later
const describeSalad = pbj.describe.bind(salad);

describeSalad();
// should print the ingredients

//give salad a describe method:
salad.describe = pbj.describe.bind(salad);


// === ASYNCHRONOUS EXECUTION ===

function visitTable() {
  return `The server is visiting ${this.name} at table number ${this.tableNumber}.`
}

function Customer(name, tableNumber) {
  this.name = name;
  this.tableNumber = tableNumber;
}

//create new Customer instance
const sally = new Customer('Sally', '4');

//schedule table visit
const visitSally = visitTable.bind(sally);

setTimeout(visitSally, 1000);