(function () {
    'use strict';

    angular
        .module('thecalculator')
        .factory('OperationFactory', OperationFactory);

    OperationFactory.$inject = [];
    function OperationFactory() {

        function Operation(op) {
            var leftOperandValue = op.right;
            var rightOperandValue = op.left;
            var operator = op.operator;
            var result = null;

            return Object.create({}, {
                leftValue: {
                    enumerable: true,
                    set: function (value) {
                        leftOperandValue = Number(value);
                    },
                    get: function () {
                        return leftOperandValue;
                    }
                },
                rightValue: {
                    enumerable: true,
                    set: function (value) {
                        rightOperandValue = Number(value);
                    },
                    get: function () {
                        return rightOperandValue;
                    }
                },
                operator: {
                    enumerable: true,
                    set: function (value) {
                        operator = value;
                    },
                    get: function () {
                        return operator;
                    }
                },
                operationResult: {
                    enumerable: true,
                    get: function () {
                        return result;
                    },
                    set: function (value) {
                        result = value;
                    }
                },
                result: {
                    configurable: false,
                    enumerable: true,
                    value: function () {
                        return operator.execute(this.leftValue, this.rightValue);
                    }
                },
                toStatement: {
                    configurable: false,
                    enumerable: true,
                    value: function () {
                        return '' + this.leftValue + ' ' + operator.symbol + ' ' + this.rightValue + ' = ' + this.operationResult;
                    }
                }
            });
        }

        function createOperation(operation) {
            return new Operation(operation || {});
        }

        return {
            new: createOperation
        };

    }

})();