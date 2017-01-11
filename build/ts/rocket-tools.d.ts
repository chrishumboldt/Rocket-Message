/**
 * Author: Chris Humboldt
**/

declare namespace Rocket {
   var defaults: any;

   // Basic checks
   function exists(check: any);

   interface has {
      class(element: any, className: any);
   }
   var has: has;

   interface is {
      touch();
   }
   var is: is;

   // Classes
   interface classes {
      add(elements: any, classes: any);
   }
   var classes: classes;

   // DOM
   interface dom {
      body: any;
      html: any;
   }
   var dom: dom;

   // Helpers
   interface helper {
      setDefault(set: any, defauit: any);
   }
   var helper: helper;

   // Modules
   var message: any;
}
