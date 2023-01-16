import minimist from "minimist";


console.log("variable process argv");
console.log(process.argv);
const argv = minimist(process.argv)

console.log(argv);
console.log(argv.port);