Rocket.defaults.message = {
    buttons: 'none',
    buttonFalse: 'Cancel',
    buttonTrue: 'Ok',
    close: 'close',
    overlay: true,
    style: 'popup'
};
var RockMod_Message;
(function (RockMod_Message) {
    var types = ['error', 'success', 'warning'];
    function closeMessage() {
        if (!Rocket.has.class(Rocket.dom.html, 'rmo-reveal')) {
            Rocket.overlay.hide();
        }
        setTimeout(function () {
            Rocket.classes.remove(Rocket.dom.html, 'rm-reveal');
        }, 50);
    }
    function createPopup(options) {
        Rocket.dom.remove('#rocket-message');
        Rocket.dom.body.appendChild(html.popup(options));
        revealMessage(options.overlay, options.style);
        return {
            message: Rocket.dom.select('#rocket-message')[0],
            close: closeMessage
        };
    }
    function createToast(options) {
        return false;
    }
    var html = {
        element: function (type, classes, content) {
            if (!Rocket.is.string(type)) {
                return false;
            }
            var html = document.createElement(type);
            if (Rocket.is.string(classes)) {
                html.className = classes;
            }
            if (Rocket.is.string(content) && content.length > 0) {
                html.innerHTML = content;
            }
            return html;
        },
        message: {
            container: function () {
                var html = document.createElement('div');
                html.id = 'rocket-message';
                return html;
            }
        },
        popup: function (options) {
            var addBtnTrue = (options.buttons === 'both' || options.buttons === 'true') ? true : false;
            var addBtnFalse = (options.buttons === 'both' || options.buttons === 'false') ? true : false;
            var message = html.message.container();
            if (Rocket.is.string(options.close) && options.close.length > 0) {
                var messageClose = html.element('a', 'rm-close', options.close);
                Rocket.event.add(messageClose, 'click', closeMessage);
                message.appendChild(messageClose);
            }
            if (Rocket.is.string(options.type) && options.type !== 'none' && types.indexOf(options.type) > -1) {
                var messageType = html.element('div', 'rm-type', '');
                var messageTypeInner = html.element('div', 't-' + options.type, '');
                var messageTypeLine1 = html.element('div', 'l-1', '');
                var messageTypeLine2 = html.element('div', 'l-2', '');
                messageTypeInner.appendChild(messageTypeLine1);
                messageTypeInner.appendChild(messageTypeLine2);
                messageType.appendChild(messageTypeInner);
                message.appendChild(messageType);
            }
            if (Rocket.is.string(options.heading) && options.heading.length > 0) {
                var messageHeading = html.element('div', 'rm-heading', '');
                var headingH6 = html.element('h6', '', options.heading);
                messageHeading.appendChild(headingH6);
                message.appendChild(messageHeading);
            }
            if (Rocket.is.string(options.body) && options.body.length > 0) {
                message.appendChild(html.element('div', 'rm-body', options.body));
            }
            if (addBtnTrue || addBtnFalse) {
                var buttonContainer = html.element('div', (addBtnTrue && addBtnFalse) ? 'btn-col-2' : 'btn-col-1', '');
                if (addBtnFalse) {
                    var buttonFalseContainer = html.element('div', 'left', '');
                    var buttonFalse = html.element('button', 'btn-false', options.buttonFalse);
                    Rocket.event.add(buttonFalse, 'click', closeMessage);
                    buttonFalseContainer.appendChild(buttonFalse);
                    buttonContainer.appendChild(buttonFalseContainer);
                }
                if (addBtnTrue) {
                    var buttonTrueContainer = html.element('div', 'right', '');
                    var buttonTrue = html.element('button', 'btn-true', options.buttonTrue);
                    Rocket.event.add(buttonTrue, 'click', options.onTrue);
                    buttonTrueContainer.appendChild(buttonTrue);
                    buttonContainer.appendChild(buttonTrueContainer);
                }
                message.appendChild(buttonContainer);
            }
            return message;
        }
    };
    function revealMessage(overlay, style) {
        setTimeout(function () {
            if (overlay && style === 'popup') {
                Rocket.overlay.show();
            }
            Rocket.classes.add(Rocket.dom.html, 'rm-reveal');
        }, 50);
    }
    function setup() {
        Rocket.event.add(Rocket.dom.select('#rocket-overlay')[0], 'click', closeMessage);
    }
    function init(uOptions) {
        if (!Rocket.is.object(uOptions)) {
            return;
        }
        var options = {
            buttons: Rocket.helper.setDefault(uOptions.buttons, Rocket.defaults.message.buttons),
            buttonFalse: Rocket.helper.setDefault(uOptions.buttonFalse, Rocket.defaults.message.buttonFalse),
            buttonTrue: Rocket.helper.setDefault(uOptions.buttonTrue, Rocket.defaults.message.buttonTrue),
            close: Rocket.helper.setDefault(uOptions.close, Rocket.defaults.message.close),
            heading: Rocket.helper.setDefault(uOptions.heading, ''),
            body: Rocket.helper.setDefault(uOptions.body, ''),
            onTrue: Rocket.helper.setDefault(uOptions.onTrue, closeMessage),
            overlay: Rocket.helper.setDefault(uOptions.overlay, Rocket.defaults.message.overlay),
            type: Rocket.helper.setDefault(uOptions.type, 'none'),
            style: Rocket.helper.setDefault(uOptions.style, Rocket.defaults.message.style)
        };
        if (Rocket.is.function(uOptions.onDone)) {
            options.onDone = uOptions.onDone;
        }
        if (Rocket.exists(uOptions.parseEvent)) {
            uOptions.parseEvent.preventDefault();
        }
        switch (options.style) {
            case 'popup':
                return createPopup(options);
            case 'toast':
                return createToast(options);
            default:
                return false;
        }
    }
    RockMod_Message.init = init;
    setup();
})(RockMod_Message || (RockMod_Message = {}));
Rocket.message = RockMod_Message.init;
