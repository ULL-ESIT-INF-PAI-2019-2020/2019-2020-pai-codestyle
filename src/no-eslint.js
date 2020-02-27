const escodegen  = require('escodegen');
const espree     = require('espree');
const estraverse = require('estraverse');
const filestream = require('fs');
const program    = require('commander');

program.version('0.15.0');

program.on('--help', function(){
  console.log('')
  console.log('User guide:');
  console.log('  $ logging-espree.js InputFile -o OutputFile');
});

program
.option('-o, --output <filename>', 'Insert the output path')
.parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp();
}else {
  let pathInJS  = program.args.shift();
  let pathOutJS = program.output;
  filestream.readFile(pathInJS, 'utf8', (err, input) =>{
    if (err) {throw `Error reading '${pathInJS}' : ${err}`}
    else {
      let content = input;
      filestream.writeFile(pathOutJS, addLogging(content), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
      }); 
    }
  });
}

function addLogging(code) {
  const ast = espree.parse(code, {
              loc:true,
              ecmaVersion: 6,
              arrowFuctions: true
            });

  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type === 'FunctionDeclaration' ||
        node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
        addBeforeCode(node);
      }
    }
  });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  let name = node.id ? node.id.name : '<anonymous function>'; 
  name = (node.type === 'ArrowFunctionExpression' ? 'Flecha gorda' : name); 
  const beforeCode = "console.log('Entering " + name + "(" + variables(node) + " at line " + node.loc.start.line + ")');";
  const beforeNodes = espree.parse(beforeCode).body;
  node.body.body = beforeNodes.concat(node.body.body);
}

function variables(node) {
  let stringVariables = "";
  let lastParameter = node.params[node.params.length -1];
  for (parameter of node.params) {
    stringVariables += "${" + parameter.name + "}";
    if (parameter.name !== lastParameter.name) {
      stringVariables += ", ";
    }
  }
  return stringVariables;
}
