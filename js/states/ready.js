function ReadyState() {
  this.identifier = 'ready';
};

ReadyState.prototype.begin = function(completion, env) {
  this.$timer = $('#play-timer');
  this.$timer.css('display', 'none');

  $('#buddy').css('display', 'block');

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

  this.$launcher.delegate('#howtoplay-button', 'click', function(e) {
      GouNinja.transitionToState('howToPlay');
  });
  if (completion) completion(env);
};

ReadyState.prototype.complete = function(completion, env) {
  this.$launcher.undelegate('.start-button', 'click');
  this.$launcher.css('display', 'none');
  $('#buddy').css('display', 'none');

  if (completion) completion(env);
};

ReadyState.prototype.startGame = function(difficulty) {
  // console.log("Start " + difficulty + " game.");
  var rules = this.getRules(difficulty);
  // console.info(rules);

  GouNinja.rules = rules;
  GouNinja.transitionToState('startQuestion');
};

ReadyState.prototype.getRules = function(difficulty) {
  var rules = {};
  rules.numberMax = parseInt($('#config-max').val(), 10);
  rules.gameLength = parseInt($('#config-length').val(), 10);
  rules.useUnits = $('#config-units')[0].checked;
  rules.learningMode = false;

  if (difficulty === 'easy') {
    rules.maxTries = 3;
  } else if (difficulty === 'med') {
    rules.maxTries = 2;
  } else if (difficulty === 'hard') {
    rules.maxTries = 1;
  } else if (difficulty === 'learning') {
    rules.maxTries = 0;
    rules.learningMode = true;
  }

  rules.selectedUnits = $.makeArray($('#units-menu input:checked').map(function(i, el) {
    var unit = { unit: $(el).attr('data-unit') };

    if (el.hasAttribute('data-min') && el.hasAttribute('data-max'))
    {
      unit.limit = true;
      unit.min = parseInt($(el).attr('data-min'), 10);
      unit.max = parseInt($(el).attr('data-max'), 10);
    }
    else
    {
      unit.limit = false;
    }

    return unit;
  }));
  // console.info(rules.selectedUnits);

  return rules;
};
