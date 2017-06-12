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
                    set: function (value) {
                        leftOperandValue = value;
                    },
                    get: function () {
                        return leftOperandValue;
                    }
                },
                rightValue: {
                    get: function () {
                        return rightOperandValue;
                    },
                    set: function (value) {
                        rightOperandValue = value;
                    }
                },
                operator: {
                    set: function (value) {
                        operator = value;
                    }
                },
                result: {
                    get: function () {
                        return result;
                    }
                },
                executeOperation: {
                    configurable: false,
                    value: function () {
                        result = operator.execute(this.leftValue, this.rightValue);
                    }
                },
                toStatement: {
                    configurable: false,
                    value: function () {
                        return '' + this.leftValue + ' ' + this.operator.symbol + ' ' + this.rightValue + ' = ' + this.result;
                    }
                }
            });
        }

        function createOperation(operation) {
            return new Operation(operation);
        }

        return {
            new: createOperation
        };

    }

})();