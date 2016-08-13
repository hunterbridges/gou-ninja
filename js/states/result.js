function ResultState() {
  this.identifier = 'result';
};

ResultState.prototype.begin = function(completion) {
  this.$state = $('#result-state');
  this.$state.css('display', 'block');

  setTimeout(function() {
    $(document).on('keypress', function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13'){
        if (GouNinja.questionNumber < GouNinja.rules.gameLength) {
          GouNinja.transitionToState('startQuestion');
        } else {
          GouNinja.transitionToState('finish');
        }
      }
    });
  }, 100);


  this.checkAnswer();

  if (completion) completion();
};

ResultState.prototype.complete = function(completion) {
  this.$state.css('display', 'none');
  $(document).off('keypress');
  if (completion) completion();
};

ResultState.prototype.checkAnswer = function() {
  var $wrapper = $('#interface-wrapper');
  var $rightOrWrong = this.$state.find('#right-or-wrong');
  var $pointsAwarded = this.$state.find('#points-awarded');
  GouNinja.totalAnswers++;
  if (parseInt(GouNinja.turn.answer) == GouNinja.turn.number) {
    // Ya did it.
    $rightOrWrong.html('Correct!');

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
    $rightOrWrong.html('Sorry! The answer was '+GouNinja.turn.number+'.');
    $pointsAwarded.html('0');
    var state = this;
    $wrapper.removeClass('flash fl-red fl-green');
    setTimeout(function() {
      $wrapper.addClass('flash fl-red');
    }, 1);
  }
};
