/**
 * @author Antonio Guijarro <alu0101100494@ull.edu.es>
 * @file This script generates a log for each function call along with
 * its input parameters
 * @copyright Antonio Guijarro 2019
 * @since 06.02.2029
 */

const escodegen = require('escodegen');
const espree = require('espree');
const estraverse = require('estraverse');
const filestream = require('fs');
const program = require('commander');

program.version('0.15.0');

program.on('--help', function() {
  console.log('');
  console.log('User guide:');
  console.log('  $ logging-espree.js InputFile -o OutputFile');
});

program
    .option('-o, --output <filename>', 'Insert the output path')
    .parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp();
} else {
  const pathInJS = program.args.shift();
  const pathOutJS = program.output;
  filestream.readFile(pathInJS, 'utf8', (err, input) =>{
    if (err) {
      throw err;
    } else {
      const content = input;
      filestream.writeFile(pathOutJS, addLogging(content), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      });
    }
  });
}

/**
 * Function that inserts a log for each function
 * @param {string} code Contains the code that we want to process
 * @return {string} Code with all logs for each function entry
 */
function addLogging(code) {
  const ast = espree.parse(code, {
    loc: true,
    ecmaVersion: 6,
    arrowFuctions: true,
  });

  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression') {
        addBeforeCode(node);
      }
    },
  });
  return escodegen.generate(ast);
}

/**
 * Generate the log to the corresponding type of function
 * @param {node} node Contains the code that we want to process
 */
function addBeforeCode(node) {
  let name = node.id ? node.id.name : '<anonymous function>';
  name = (node.type === 'ArrowFunctionExpression' ? 'Flecha gorda' : name);
  const beforeCode = 'console.log(\'Entering ' + name + '(' + variables(node) +
                     ' at line ' + node.loc.start.line + ')\');';
  const beforeNodes = espree.parse(beforeCode).body;
  node.body.body = beforeNodes.concat(node.body.body);
}
/**
 * Generate the log to the corresponding parameters of the function
 * @param {node} node Contains the code that we want to process
 * @return {string} Formatted output to display the variables
 */
function variables(node) {
  let stringVariables = '';
  const lastParameter = node.params[node.params.length -1];
  for (parameter of node.params) {
    stringVariables += '${' + parameter.name + '}';
    if (parameter.name !== lastParameter.name) {
      stringVariables += ', ';
    }
  }
  return stringVariables;
}
