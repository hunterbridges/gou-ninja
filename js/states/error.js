function ErrorState() {
  this.identifier = 'error';
};

ErrorState.prototype.begin = function(completion, env) {
  this.$timer = $('#play-timer');
  this.$timer.css('display', 'none');

  this.$state = $('#error-state');
  this.$state.css('display', 'block');

  var $message = this.$state.find('#error-message');
  $message.html(env.message);

  if (completion) completion(env);
};

ErrorState.prototype.complete = function(completion, env) {
  this.$state.css('display', 'none');
  if (completion) completion(env);
};

