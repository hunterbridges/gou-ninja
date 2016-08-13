function PromptState() {
  this.identifier = 'prompt';
};

PromptState.prototype.begin = function(completion) {
  this.$state = $('#prompt-state');
  this.$state.css('display', 'block');

  this.$input = this.$state.find('input');
  this.$input.focus();

  this.startedAt = new Date();

  var state = this;
  this.$input.on('keyup', function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13'){
      var $el = $(event.currentTarget);
      state.handleResponse($el.val());
    }
  });

  this.$timer = $('#play-timer');
  this.$timer.css('display', 'block');

  this.startTimer();
  if (completion) completion();
};

PromptState.prototype.complete = function(completion) {
  this.$timer.removeClass('animate');
  this.$timer.addClass('complete');
  this.$input.removeClass('flash fl-yellow');
  this.$input.val('');
  this.$input.blur();
  this.$state.css('display', 'none');
  this.$input.off('keyup');

  var endedAt = new Date();
  var durationMs = endedAt.getTime() - this.startedAt.getTime();
  var accum = _([5000, durationMs]).min();
  GouNinja.turn.answerTime += accum;

  if (completion) completion();
};

PromptState.prototype.startTimer = function() {
  var el = this.$timer;
  var newone = el.clone(true);
  el.before(newone);
  el.remove();
  newone.addClass('animate');
  this.$timer = newone;

  var state = this;
  this.timeout = setTimeout(function () {
    state.handleTimerEnded();
  }, 5000);
}

PromptState.prototype.handleResponse = function(str) {
  if (this.validateResponse(str)) {
    clearTimeout(this.timeout);
    GouNinja.turn.answer = str;
    GouNinja.transitionToState('result');
  } else {
    var state = this;
    this.$input.removeClass('flash fl-yellow');
    setTimeout(function() {
      state.$input.addClass('flash fl-yellow');
    }, 1);
  }
};

PromptState.prototype.validateResponse = function(str) {
  return !isNaN(parseInt(str.trim(), 10));
};

PromptState.prototype.handleTimerEnded = function() {
  if (GouNinja.turn.listens >= GouNinja.rules.maxTries) {
    GouNinja.transitionToState('result');
  } else {
    GouNinja.transitionToState('ask');
  }
};
