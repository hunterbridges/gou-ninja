function AskState() {
  this.identifier = 'ask';
};

AskState.prototype.begin = function(completion, env) {
  this.$timer = $('#play-timer');
  this.$timer.css('display', 'block');
  this.$timer.removeClass('complete');
  this.$timer.removeClass('animate');

  this.$state = $('#ask-state');
  this.$state.css('display', 'block');

  if (completion) completion();

  this.doAsk();
};

AskState.prototype.complete = function(completion, env) {
  this.$state.css('display', 'none');
  if (completion) completion();
};

AskState.prototype.doAsk = function() {
  var string = GouNinja.turn.string;

  var rate = 1.175 - (0.175 * GouNinja.turn.listens);
  if (GouNinja.rules.learningMode === true)
    rate = 0.5;

  var msg = new SpeechSynthesisUtterance();
  msg.voice = GouNinja.voice;
  msg.volume = 1;
  msg.rate = rate;
  msg.pitch = 1;
  msg.text = string;
  msg.lang = 'ja-JP';
  msg.onend = function () {
    GouNinja.turn.listens++;
    GouNinja.transitionToState('prompt');
    GouNinja.utterances = _(GouNinja.utterances).without([msg]);
  };
  GouNinja.utterances.push(msg);
  speechSynthesis.speak(msg);
}
