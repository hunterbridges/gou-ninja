function ResultState() {
  this.identifier = 'result';
};

ResultState.prototype.begin = function(completion, env) {
  this.$state = $('#result-state');
  this.$state.css('display', 'block');

  var state = this;
  this.$state.delegate('a.btn', 'click', function() {
    state.progress();
  });
  $("#quit").blur();

  setTimeout(function() {
    $(document).on('keypress', function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13'){
        state.progress();
      }
    });
  }, 100);


  this.checkAnswer();

  if (completion) completion(env);
};

ResultState.prototype.complete = function(completion, env) {
  this.$state.css('display', 'none');
  this.$state.undelegate('a.btn', 'click');
  $(document).off('keypress');
  if (completion) completion(env);
};

ResultState.prototype.checkAnswer = function() {
  var $wrapper = $('#interface-wrapper');
  var $rightOrWrong = this.$state.find('#right-or-wrong');
  var $pointsAwarded = this.$state.find('#points-awarded');
  var $pointsMsg = this.$state.find('#points-msg');
  GouNinja.totalAnswers++;
  if (parseInt(GouNinja.turn.answer) == GouNinja.turn.number) {
    // Ya did it.
    $rightOrWrong.html('Correct! '+GouNinja.turn.string+'。');

    var awarded = Math.floor((15000 - GouNinja.turn.answerTime) / 100);
    $pointsAwarded.html(awarded);

    GouNinja.currentScore += awarded;

    GouNinja.answerTimes.push(GouNinja.turn.answerTime);

    GouNinja.correctAnswers++;

    $wrapper.removeClass('flash fl-red fl-green');
    setTimeout(function() {
      $wrapper.addClass('flash fl-green');
    }, 1);
  } else {
    // Ya blew it.
    $rightOrWrong.html('Sorry! The answer was '+GouNinja.turn.string+'。');
    $pointsAwarded.html('0');
    var state = this;
    $wrapper.removeClass('flash fl-red fl-green');
    setTimeout(function() {
      $wrapper.addClass('flash fl-red');
    }, 1);
  }

  if (GouNinja.rules.learningMode == true)
    $pointsMsg.hide();
  else
    $pointsMsg.show();

};

ResultState.prototype.progress = function() {
  if (GouNinja.questionNumber < GouNinja.rules.gameLength) {
    GouNinja.transitionToState('startQuestion');
  } else {
    GouNinja.transitionToState('finish');
  }
};
