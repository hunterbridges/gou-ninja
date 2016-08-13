function ReadyState() {
  this.identifier = 'ready';
};

ReadyState.prototype.begin = function(completion, env) {
  this.$timer = $('#play-timer');
  this.$timer.css('display', 'none');

  this.$launcher = $('#launcher');
  this.$launcher.css('display', 'block');

  var state = this;

  GouNinja.questionNumber = 0;
  GouNinja.currentScore = 0;
  GouNinja.answerTimes = [];
  GouNinja.correctAnswers = 0;
  GouNinja.totalAnswers = 0;
  GouNinja.turn = null;

  this.$launcher.delegate('.start-button', 'click', function(e) {
    var $link = $(e.currentTarget);
    state.startGame($link.attr('data-difficulty'));
  });

  this.$launcher.delegate('#config-units-button', 'click', function(e) {
      GouNinja.transitionToState('selectUnits');
  });
  if (completion) completion(env);
};

ReadyState.prototype.complete = function(completion, env) {
  this.$launcher.undelegate('.start-button', 'click');
  this.$launcher.css('display', 'none');

  if (completion) completion(env);
};

ReadyState.prototype.startGame = function(difficulty) {
  console.log("Start " + difficulty + " game.");
  var rules = this.getRules(difficulty);
  console.info(rules);

  GouNinja.rules = rules;
  GouNinja.transitionToState('startQuestion');
};

ReadyState.prototype.getRules = function(difficulty) {
  var rules = {};
  rules.numberMax = parseInt($('#config-max').val(), 10);
  rules.gameLength = parseInt($('#config-length').val(), 10);
  rules.useUnits = $('#config-units')[0].checked;

  if (difficulty === 'easy') {
    rules.maxTries = 3;
  } else if (difficulty === 'med') {
    rules.maxTries = 2;
  } else if (difficulty === 'hard') {
    rules.maxTries = 1;
  }

  rules.selectedUnits = $.makeArray($('#units-menu input:checked').map(function(i, el) {
    return $(el).attr('data-unit');
  }));
  console.info(rules.selectedUnits);

  return rules;
};
