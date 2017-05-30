///<reference path="observer.js"/>

(function ($, Observer) {
    'use strict';

    function typesBuilder(operators, collection) {
        var types = ['standard', 'scientific', 'programmer'];
        collection[types[0]] = operators.getStandard();
        collection[types[1]] = operators.getScientific();
        collection[types[2]] = operators.getProgrammer();
    }

    var TypesCalculatorModel = {
        typeChanged: Observer.create(this),
        types: {},

        create: function (operators) {
            typesBuilder(operators, this.types);
            return this; 
        } 
    }

    var TypesCalculatorController = {
        model: null,
        views: null,
         
        create: function (model, view, operatorsCtrl) { 
            this.model = model;
            this.views = view;

            this.model.typeChanged.subscribe('calculatorModeChanged', function (sender, element) {
                operatorsCtrl.fillList(model.types[element.id]);  
            });
            return this; 
        } 
    }

    function registerEvents(viewElements, model) {  
        for (var type in viewElements) {
            //debugger;
            if (viewElements.hasOwnProperty(type)) {
                viewElements[type].click(function onCalculatorTypeClick(e) {
                    model.typeChanged.notify('calculatorModeChanged', { id: e.target.id });
                    model.typeChanged.notify('modeChanged', {});
                });
            }
        }
    }

    var TypesCalculatorView = {
        model: null,
        viewElements: {},

        create: function (model, elements) {
            this.model = model;
            this.viewElements = elements;
            registerEvents(this.viewElements, this.model); 
        }
    }

    window.Types = {
        Model: Object.create(TypesCalculatorModel),
        Controller: Object.create(TypesCalculatorController),
        View: Object.create(TypesCalculatorView)
    }

})(jQuery, Observer);