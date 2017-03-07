/*
Author: Chris Humboldt
*/

// Extend Rocket
Rocket.defaults.message = {
   buttons: 'none',
   buttonFalse: 'Cancel',
   buttonTrue: 'Ok',
   close: 'close',
   overlay: true,
   style: 'popup'
};

// Module
module RockMod_Message {
   // Variables
   const types = ['error', 'success', 'warning'];

   // Functions
   function closeMessage() {
      /*
      Catch and make sure a Rocket modal is not open. This is to prevent
      the two modules from conflicting with each other.
      */
      if (!Rocket.has.class(Rocket.dom.html, 'rmo-reveal')) {
         Rocket.overlay.hide();
      }

      setTimeout(() => {
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
      return false; // Code goes here.
   }

   const html = {
      element: function (type: string, classes: string, content): any {
         // Catch
         if (!Rocket.is.string(type)) {
            return false;
         }
         // Continue
         let html = document.createElement(type);
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
            let html = document.createElement('div');
            html.id = 'rocket-message';
            return html;
         }
      },
      popup: function (options) {
         let addBtnTrue = (options.buttons === 'both' || options.buttons === 'true') ? true : false;
         let addBtnFalse = (options.buttons === 'both' || options.buttons === 'false') ? true : false;

         // Container
         let message = html.message.container();

         // Close
         if (Rocket.is.string(options.close) && options.close.length > 0) {
            let messageClose = html.element('a', 'rm-close', options.close);
            Rocket.event.add(messageClose, 'click', closeMessage);
            message.appendChild(messageClose);
         }

         // Type
         if (Rocket.is.string(options.type) && options.type !== 'none' && types.indexOf(options.type) > -1) {
            let messageType = html.element('div', 'rm-type', '');
            let messageTypeInner = html.element('div', 't-' + options.type, '');
            let messageTypeLine1 = html.element('div', 'l-1', '');
            let messageTypeLine2 = html.element('div', 'l-2', '');

            messageTypeInner.appendChild(messageTypeLine1);
            messageTypeInner.appendChild(messageTypeLine2);
            messageType.appendChild(messageTypeInner);
            message.appendChild(messageType);
         }

         // Heading
         if (Rocket.is.string(options.heading) && options.heading.length > 0) {
            let messageHeading = html.element('div', 'rm-heading', '');
            let headingH6 = html.element('h6', '', options.heading);
            messageHeading.appendChild(headingH6);
            message.appendChild(messageHeading);
         }

         // Body
         if (Rocket.is.string(options.body) && options.body.length > 0) {
            message.appendChild(html.element('div', 'rm-body', options.body));
         }

         // Buttons
         if (addBtnTrue || addBtnFalse) {
            let buttonContainer = html.element('div', (addBtnTrue && addBtnFalse) ? 'btn-col-2' : 'btn-col-1', '');

            if (addBtnFalse) {
               let buttonFalseContainer = html.element('div', 'left', '');
               let buttonFalse = html.element('button', 'btn-false', options.buttonFalse);
               Rocket.event.add(buttonFalse, 'click', closeMessage);
               buttonFalseContainer.appendChild(buttonFalse);
               buttonContainer.appendChild(buttonFalseContainer);
            }
            if (addBtnTrue) {
               let buttonTrueContainer = html.element('div', 'right', '');
               let buttonTrue = html.element('button', 'btn-true', options.buttonTrue);
               Rocket.event.add(buttonTrue, 'click', options.onTrue);
               buttonTrueContainer.appendChild(buttonTrue);
               buttonContainer.appendChild(buttonTrueContainer);
            }

            message.appendChild(buttonContainer);
         }

         return message;
      }
   }

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

   // Initialiser
   export function init(uOptions: any) {
      if (!Rocket.is.object(uOptions)) { return; }

      // Continue
      let options: any = {
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

      // Cancel default event behavious
      if (Rocket.exists(uOptions.parseEvent)) {
         uOptions.parseEvent.preventDefault();
      }

      // Return new message instance
      switch (options.style) {
         case 'popup':
            return createPopup(options);

         case 'toast':
            return createToast(options);

         default:
            return false;
      }
   }

   setup();
}

// Bind to Rocket
Rocket.message = RockMod_Message.init;
