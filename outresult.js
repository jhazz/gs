define("StringValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("ZipCodeValidator", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && exports.numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    exports.ZipCodeValidator = ZipCodeValidator;
});
define("test_type", ["require", "exports", "ZipCodeValidator"], function (require, exports, validator) {
    "use strict";
    exports.__esModule = true;
    var myValidator = new validator.ZipCodeValidator();
    var Greeter = /** @class */ (function () {
        function Greeter(greeting) {
            this.greeting = greeting;
        }
        Greeter.prototype.greet = function () {
            return "<h1>" + this.greeting + "</h1>";
        };
        return Greeter;
    }());
    ;
    var greeter = new Greeter("Hello, Ministry!!!! of Programming!");
    var str = greeter.greet();
    console.log(str);
});
//# sourceMappingURL=outresult.js.map