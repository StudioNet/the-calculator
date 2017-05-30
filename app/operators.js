///<reference path="observer.js"/>

(function ($, Observer) {
    'use strict';
    
    var OperatorsModel = {
        standard: [
            { symbol: "+", name: "addition", execute: function (addend1, addend2) { return addend1 + addend2; } },
            { symbol: "-", name: "subtraction ", execute: function (minuend, substrahend) { return minuend - substrahend; } },
            { symbol: "*", name: "multiplication ", execute: function (multiplier, multiplicand) { return multiplier * multiplicand; } },
            { symbol: "/", name: "division", execute: function (devidend, devisor) { return devidend / devisor; } }
        ],
        scientific: [
            { symbol: "^", name: "power", execute: function (base, exponent) { return Math.pow(base, exponent); } },
            { symbol: "xRooty", name: "nth root", execute: function (degree, radicand) { return Math.pow(radicand, (1 / degree)); } }
        ],
        programmer: [
            { symbol: "mod", name: "modolo", execute: function (devidend, devisor) { return devidend % devisor; } }
        ],
        getStandard: function () {
            return this.standard;
        },
        getScientific: function () {
            return this.standard.concat(this.scientific);
        },
        getProgrammer: function () {
            return this.standard.concat(this.programmer);
        },
        all: function () {
            return this.standard.concat(this.scientific).concat(this.programmer);
        }

    }

    function subscribeToViewEvents(view, eventName, handler) {  
        if (eventName && view[eventName]) {
            view[eventName].subscribe(handler); 
        } 
    }

    var OperatorsController = {
        model: null,
        views: {}, 
        addView: function (viewName, view) { 
            this.views[viewName] = view;
            return this; 
        },
        create: function (model, view, viewName) {
            this.model = model;
            if (viewName) {
                this.views[viewName] = view;
            }
            else {
                this.views['default'] = view;
            }
            return this;
        },
        fillList: function (operators) {
            this.views['default'].fillList(operators);
        },
        getOperator: function (name) {
            return this.model.all().find(function (operator) {
                return operator.symbol === name; 
            });
        }
        //attachEvent: function (viewName, eventName) { 
        //    subscribeToViewEvents(this.views[viewName ? viewName : 'default'], eventName, this.fillList.bind(this)); 
        //}
    }

    var OperatorsListView = {
        model: null,
        viewElements: {},

        create: function (model, elements) {
            this.model = model;
            this.viewElements = elements;
            return this; 
        }, 
        
        fillList: function (operators) {  
            var key;
            var list = this.viewElements.list;

            list.html('');
            var operator;
            for (var i = 0; i < operators.length; i++) {
                operator = operators[i]; 
                list.append($('<option id=' + operator['name'] + '>' + operator["symbol"] + '</option>'));
            }
        },

        show: function () {
            this.fillList(this.model.getStandard());
        }

    }

    //Create namespace for operators module
    window.Operators = { 
        Model: Object.create(OperatorsModel), 
        Controller: Object.create(OperatorsController),
        Views: {
            ListView: Object.create(OperatorsListView)
        }
    }

})(jQuery, Observer); 

