function FinishState() {
  this.identifier = 'finish';
};

FinishState.prototype.begin = function(completion) {
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

  if (GouNinja.currentScore > GouNinja.highScore) {
    GouNinja.highScore = GouNinja.currentScore;
  }

  var $pointsAwarded = this.$state.find('#total-points');
  $pointsAwarded.html(GouNinja.currentScore);

  if (completion) completion();
};

FinishState.prototype.complete = function(completion) {
  this.$state.css('display', 'none');
  this.$state.undelegate('a.btn', 'click');
  $(document).off('keypress');

  if (completion) completion();
};

