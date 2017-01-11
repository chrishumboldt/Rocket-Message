/**
 * Author: Chris Humboldt
**/

// Extend Rocket
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

// Module
module RockMod_Message {
   // Functions
   const html = {
      overlay: function () {
         // HTML
         let overlay = document.createElement('div');
         overlay.id = 'rocket-overlay';
         return overlay;
      }
   }

   function setup() {
      // Touch check
      if (!Rocket.has.class(Rocket.dom.html, 'rocket-no-touch') && !Rocket.is.touch()) {
         Rocket.classes.add(Rocket.dom.html, 'rocket-no-touch');
      }
      // Overlay
      if (!Rocket.exists(document.getElementById('rocket-overlay'))) {
			Rocket.dom.body.appendChild(html.overlay());
		}
   }

   // Initialiser
   export function init(uOptions: any) {
      // Catch
      if (typeof uOptions !== 'object') {
         return false;
      }
      // Continue
      const options = {
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

   // Execute
   setup();
}

// Bind to Rocket
Rocket.message = RockMod_Message.init;
