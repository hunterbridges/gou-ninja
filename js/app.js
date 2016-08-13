$(document).ready(function() {
  // Entry point
  var runApp = function() {
    HUD.init();
    HUD.show();
    GouNinja.init();
  };

  var voices = window.speechSynthesis.getVoices();
  if (!!voices && _(voices).isArray() && voices.length > 0) {
    runApp();
  } else if (speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = runApp;
  }
});
