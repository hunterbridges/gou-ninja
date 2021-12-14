function FinishState() {
  this.identifier = 'finish';
};

FinishState.prototype.begin = function(completion, env) {
  $('#buddy').css('display', 'block');
  this.$state = $('#finish-state');
  this.$state.css('display', 'block');
  this.$state.delegate('a.btn', 'click', function() {
    GouNinja.transitionToState('ready');
  });
  $("#quit").blur();

  setTimeout(function() {
    $(document).on('keypress', function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13'){
        GouNinja.transitionToState('ready');
      }
    });
  }, 100);

  var $pointsAwarded = this.$state.find('#total-points');
  var $totalMsg = this.$state.find('#total-msg');
  $pointsAwarded.html(GouNinja.currentScore);

  if (GouNinja.rules.learningMode === true)
  {
    $totalMsg.hide();
  }
  else
  {
    if (GouNinja.currentScore > GouNinja.highScore) {
      GouNinja.highScore = GouNinja.currentScore;
    }

    $totalMsg.show();
  }

  if (completion) completion(env);
};

FinishState.prototype.complete = function(completion, env) {
  $('#buddy').css('display', 'none');
  this.$state.css('display', 'none');
  this.$state.undelegate('a.btn', 'click');
  $(document).off('keypress');

  if (completion) completion(env);
};

