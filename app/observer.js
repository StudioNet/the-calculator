
(function () {
    'use strict';
    
    var Observer = {
        sender: null,
        listeners: {},

        create: function (sender) {
            this.sender = sender;
            return this;
        },

        subscribe: function (name, listener) {
            this.listeners[name] = listener;  
        },

        notify: function (name, args) { 
            if (this.listeners.hasOwnProperty(name)) {
                this.listeners[name](this.sender, args);
            }
        }
    }

    window.Observer = Object.create(Observer); 
})();