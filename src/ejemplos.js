// File name
// Okay
hello_world.js hello-world.js helloworld.js 	
// Bad 
hello_3.js hello,world.js HeLlO_WoRlD.js


// Non-ASCII characters 
/* Best: perfectly clear even without a comment. */
const units = 'μs';

/* Allowed: but unnecessary as μ is a printable character. */
const units = '\u03bcs'; // 'μs'

/* Good: use escapes for non-printable characters with a comment for clarity. */
return '\ufeff' + content;  // Prepend a byte order mark.


// Braces in control structures
// Bad use
if (someVeryLongCondition())
  doSomething();

for (let i = 0; i < foo.length; i++) bar(foo[i]);
// Exception 
if (shortCondition()) foo();


// Nonempty blocks: K&R style 
class InnerClass {
  constructor() {}

  /** @param {number} foo */
  method(foo) {
    if (condition(foo)) {
      try {
        // Note: this might fail.
        something();
      } catch (err) {
        recover();
      }
    }
  }
}


// Empty blocks
// Okay
function doNothing() {} 
// Bad use
if (condition) { 
  // ...
} else if (otherCondition) {} else {
  // ...
}

try {
  // ...
} catch (e) {}


// Array and objects: optionally block-like
const a = [
  0,
  1,
  2,
];

const b =
    [0, 1, 2];

const a = {
  a: 0,
  b: 1,
};
    
const b =
    {a: 0, b: 1};


// Function expressions
some.reallyLongFunctionCall(arg1, arg2, arg3)
    .thatsWrapped()
    .then((result) => {
      // Indent the function body +2 relative to the indentation depth
      // of the '.then()' call.
      if (result) {
        result.use();
      }
    });


// Switch statements.
switch (animal) {
  case Animal.BANDERSNATCH:
    handleBandersnatch();
    break;

  case Animal.JABBERWOCK:
    handleJabberwock();
    break;

  default:
    throw new Error('Unknown animal');
}


// Statements
currentEstimate =
    calc(currentEstimate + x * currentEstimate) /
        2.0;

currentEstimate = calc(currentEstimate + x *
    currentEstimate) / 2.0;


// Horizontal Whitespaces
// In a template expansion
foo({a: [{c: d}]})
`ab${1 + 2}cd`
// After an open-block comment character
this.foo = /** @type {number} */ (bar) ; or
function(/** string */ foo) { ; or baz(/** buzz= */ true)}

//Correct comment 
{
  tiny: 42, // this is great
  longer: 435, // this too
};

{
  tiny:   42,  // permitted, but future edits
  longer: 435, // may leave it unaligned
};


// Grouping parentheses
// Is okay 
if (2 * 3 > 2  * 3 + 1 && !istrue || 9 * 3 === 3 * 9)
// Better form
if ((2 * 3 > (2*3) +1) && !(istrue) || (9 * 3 === 3 * 9))


// Comments 
/*
 * This is
 * okay.
 */

// And so
// is this.

/* This is fine, too. */
someFunction(obvious Param, /* shouldRender= */ true, /* name= */ 'hello');


// Local variable declarations
// Bad 
let a = 1, b = 2;
// Okay 
let a = 1;
let b = 2;


// Objects literals
method() { return this.foo + this.bar; }


// String literals
function arithmetic(a, b) {
  return `Here is a table of arithmetic operations:
${a} + ${b} = ${a + b}
${a} - ${b} = ${a - b}
${a} * ${b} = ${a * b}
${a} / ${b} = ${a / b}`;
}

const longString = 'This is a very long string that far exceeds the 80 ' +
    'column limit. It does not contain long stretches of spaces since ' +
    'the concatenated strings are cleaner.';


// Number literals
Object example; 
Object example();


// Rules common to all identifiers
let val;  
let value;
let gravityValue;