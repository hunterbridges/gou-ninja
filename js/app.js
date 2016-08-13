$(document).ready(function() {
  // Entry point
  window.speechSynthesis.onvoiceschanged = function() {
    var voices = window.speechSynthesis.getVoices();
    HUD.init();
    HUD.show();
    GouNinja.init();
  };
});
