"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xml2js_1 = require("xml2js");
var Response;
(function (Response) {
    /**
     *
     */
    var StatusValidator = /** @class */ (function () {
        function StatusValidator() {
        }
        /**
         *
         */
        StatusValidator.prototype.resolve = function (response) {
            return response.statusCode < 400;
        };
        return StatusValidator;
    }());
    Response.StatusValidator = StatusValidator;
    /**
     *
     */
    var StringValidator = /** @class */ (function () {
        function StringValidator() {
        }
        /**
         *
         */
        StringValidator.prototype.resolve = function (response) {
            var result = response.items[0].toString();
            return result.length > 0 ? result : false;
        };
        return StringValidator;
    }());
    Response.StringValidator = StringValidator;
    /**
     *
     */
    var XMLValidator = /** @class */ (function () {
        function XMLValidator() {
        }
        /**
         *
         */
        XMLValidator.prototype.resolve = function (response) {
            var parseNumbers = function (str) {
                if (!isNaN(str)) {
                    str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
                }
                return str;
            };
            var parseBooleans = function (str) {
                if (str === true || str.toString().toLowerCase() === 'true') {
                    return true;
                }
                else if (str === false || str.toString().toLowerCase() === 'false') {
                    return false;
                }
                return str;
            };
            var parseLowerCase = function (str) {
                return str.toString().toLowerCase();
            };
            var returnFalse;
            var returnData;
            xml2js_1.parseString(response.items[0].replace('\n', ''), { explicitRoot: false, async: false, trim: true, explicitArray: false, mergeAttrs: true, attrValueProcessors: [parseNumbers], valueProcessors: [parseNumbers, parseBooleans], tagNameProcessors: [parseLowerCase], attrNameProcessors: [parseLowerCase] }, function (error, result) {
                returnFalse = error;
                returnData = result;
            });
            return returnFalse ? {} : returnData || {};
        };
        return XMLValidator;
    }());
    Response.XMLValidator = XMLValidator;
    /**
     *
     */
    var ListValidator = /** @class */ (function () {
        function ListValidator() {
        }
        /**
         *
         */
        ListValidator.prototype.resolve = function (response) {
            // filters on stringitems in items-list and validates if any items present
            var stringItems = response.items.filter(function (i) { return typeof i === 'string'; });
            return stringItems;
        };
        return ListValidator;
    }());
    Response.ListValidator = ListValidator;
    /**
     *
     */
    var DataValidator = /** @class */ (function () {
        function DataValidator() {
        }
        /**
         *
         */
        DataValidator.prototype.resolve = function (response) {
            var result = response.items[0].toString();
            return result.length > 0 ? result : false;
        };
        return DataValidator;
    }());
    Response.DataValidator = DataValidator;
    /**
     *
     */
    var Base64Validator = /** @class */ (function () {
        function Base64Validator() {
        }
        /**
         *
         */
        Base64Validator.prototype.resolve = function (response) {
            return response.items[0];
        };
        return Base64Validator;
    }());
    Response.Base64Validator = Base64Validator;
    /**
     *
     */
    var MixerStatusValidator = /** @class */ (function () {
        function MixerStatusValidator() {
        }
        /**
         *
         */
        MixerStatusValidator.prototype.resolve = function (response) {
            var result = response.items[0].split(' ').map(function (value) { return Number.parseFloat(value); });
            return result.length > 0 && result.every(function (value) { return !isNaN(value); }) ? result : false;
        };
        return MixerStatusValidator;
    }());
    Response.MixerStatusValidator = MixerStatusValidator;
})(Response = exports.Response || (exports.Response = {}));
