(function ($, Observer) {
    'use strict';

    var CalculatorModel = {
        leftOperandChanged: Observer.create(this), 
        rightOperandChanged: Observer.create(this),
        operationsChanged: Observer.create(this),
        resultChanged: Observer.create(this),
        typesModel: null,

        create: function (typesModel) {
            this.typesModel = typesModel;
            return this;
        } 
    }

    function operationValidation(args) {
        if (!args.left || isNaN(parseInt(args.left)))
            return false;
        if (!args.right || isNaN(parseInt(args.right)))
            return false;

        if (!args.operation)
            return false;

        args.left = parseInt(args.left);
        args.right = parseInt(args.right);
        return true; 
    } 

    function subscribeToViewEvents(localModel, handler) { 
        localModel.leftOperandChanged.subscribe('leftOperandChanged', function (sender, element) {
            if(operationValidation(element.args))
                handler(element.args); 
        });
        localModel.rightOperandChanged.subscribe('rightOperandChanged', function (sender, element) {
            if (operationValidation(element.args))
                handler(element.args);
        });
        localModel.operationsChanged.subscribe('operationChanged', function (sender, element) {
            if (operationValidation(element.args))
                handler(element.args);  
        });
    } 

    var CalculatorController = {
        model: null,
        view: null,
        operatorsCtrl: null, 

        create: function create(model, view, operatorsCtrl) {
            this.model = model;
            this.view = view;
            this.operatorsCtrl = operatorsCtrl;
             
            var localView = this.view;

            this.model.typesModel.typeChanged.subscribe('modeChanged', function () {
                localView.erace();
            });

            subscribeToViewEvents(this.model, this.calculate.bind(this)); 
        },
        calculate: function (args) { 
            var operator = this.operatorsCtrl.getOperator(args.operation); 
            if (operator) {
                this.view.updateResult(operator.execute(args.left, args.right));
            }
        }
    }

    function registerViewListeners(localModel, viewElements) {

        viewElements.leftOperand.blur(function (e) {
            var eventArgs = {
                left: e.target.value, 
                right: viewElements.rightOperand.val(),
                operation: viewElements.operations.val()
            } 
            localModel.leftOperandChanged.notify('leftOperandChanged', { args: eventArgs });
        });

        viewElements.rightOperand.blur(function (e) {
            var eventArgs = {
                left: viewElements.leftOperand.val(),
                right: e.target.value,
                operation: viewElements.operations.val()
            }
            localModel.rightOperandChanged.notify('rightOperandChanged', { args: eventArgs });
        });

        viewElements.operations.change(function (e) {
            var eventArgs = {
                left: viewElements.leftOperand.val(),
                right: viewElements.rightOperand.val(),
                operation: e.target.value  
            }
            localModel.operationsChanged.notify('operationChanged', { args: eventArgs });
        });
    }

    var CalculatorView = {
        model: null,
        viewElements: {},

        create: function (model, elements) {
            this.model = model;
            this.viewElements = elements;
            
            registerViewListeners(this.model, this.viewElements);
            return this; 
        }, 

        erace: function () {
            this.viewElements.leftOperand.val('');
            this.viewElements.rightOperand.val('');
            this.viewElements.result.text('');
        },

        updateResult: function (result) {
            this.viewElements.result.text(result);  
        }
    }

    window.Calculator = {
        Model: Object.create(CalculatorModel),
        Controller: Object.create(CalculatorController),
        View: Object.create(CalculatorView)
    }

})(jQuery, Observer);