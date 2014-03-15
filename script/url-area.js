/* global renderAreaURL:true, _, arealist, msglist, phiBar */

renderAreaURL = function(URL, parsedURL){
   if ( parsedURL.objectPath.length > 0 ){
      phiBar.reportErrorHTML([
         'Sorry, opening files embedded in echomail ',
         'is not (yet) supported in PhiDo.',
         '<p>The address <b>',
         _.escapeHTML(URL),
         '</b> could not be opened.',
         '</p>'
      ].join(''));
      return;
   }
   if( parsedURL.echoNames.length > 1 ){
      phiBar.reportErrorHTML([
         'Sorry, opening multiple echomail areas at once ',
         'is not (yet) supported in PhiDo.',
         '<p>The address <b>',
         _.escapeHTML(URL),
         '</b> could not be opened.',
         '</p>'
      ].join(''));
      return;
   }
   if( parsedURL.echoNames.length < 1 ){
      arealist();
      return;
   }
   // parsedURL.echoNames.length === 1
   msglist( parsedURL.echoNames[0][0] );
};