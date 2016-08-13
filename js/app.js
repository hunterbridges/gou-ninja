$(document).ready(function() {
  // Entry point
  var runApp = function() {
    var voices = window.speechSynthesis.getVoices();
    HUD.init();
    HUD.show();
    GouNinja.init();
  };

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = runApp;
  } else {
    runApp();
  }
});
