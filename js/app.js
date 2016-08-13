$(document).ready(function() {
  // Entry point
  var runApp = function() {
    HUD.init();
    HUD.show();
    GouNinja.init();
  };

  if ('speechSynthesis' in window) {
    var voices = window.speechSynthesis.getVoices();
    if (!!voices && _(voices).isArray() && voices.length > 0) {
      runApp();
    } else if (speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = runApp;
    }
  } else {
    // No SpeechSynthesis available. Run the app and let it go to error state.
    runApp();
  }
});
