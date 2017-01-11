Rocket.defaults.message = {
    buttonFalse: '',
    buttonTrue: '',
    close: 'close',
    parseEvent: false,
    heading: '',
    body: '',
    onTrue: false,
    overlay: true,
    type: 'none',
    style: 'popup'
};
var RockMod_Message;
(function (RockMod_Message) {
    var html = {
        overlay: function () {
            var overlay = document.createElement('div');
            overlay.id = 'rocket-overlay';
            return overlay;
        }
    };
    function setup() {
        if (!Rocket.has.class(Rocket.dom.html, 'rocket-no-touch') && !Rocket.is.touch()) {
            Rocket.classes.add(Rocket.dom.html, 'rocket-no-touch');
        }
        if (!Rocket.exists(document.getElementById('rocket-overlay'))) {
            Rocket.dom.body.appendChild(html.overlay());
        }
    }
    function init(uOptions) {
        if (typeof uOptions !== 'object') {
            return false;
        }
        var options = {
            buttonFalse: Rocket.helper.setDefault(uOptions.buttonFalse, ''),
            buttonTrue: Rocket.helper.setDefault(uOptions.buttonTrue, ''),
            close: Rocket.helper.setDefault(uOptions.close, 'close'),
            parseEvent: false,
            heading: Rocket.helper.setDefault(uOptions.heading, ''),
            body: Rocket.helper.setDefault(uOptions.body, ''),
            onTrue: false,
            overlay: Rocket.helper.setDefault(uOptions.overlay, true),
            type: Rocket.helper.setDefault(uOptions.type, 'none'),
            style: Rocket.helper.setDefault(uOptions.style, 'popup')
        };
    }
    RockMod_Message.init = init;
    setup();
})(RockMod_Message || (RockMod_Message = {}));
Rocket.message = RockMod_Message.init;
