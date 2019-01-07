import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};

var greeter = new Greeter("Hello, Ministry!!!! of Programming!");
var str = greeter.greet();
console.log(str);