function HowToPlayState() {
  this.identifier = 'howToPlay';
};

HowToPlayState.prototype.begin = function(completion, env) {
  this.$state = $('#howtoplay-state');
  this.$state.css('display', 'block');

  var state = this;
  this.$state.delegate('a.btn#howtoplay-ok', 'click', function() {
    GouNinja.transitionToState('ready');
  });

  if (completion) completion(env);
};

HowToPlayState.prototype.complete = function(completion, env) {
  this.$state.css('display', 'none');
  this.$state.undelegate('a.btn', 'click');

  if (completion) completion(env);
};
