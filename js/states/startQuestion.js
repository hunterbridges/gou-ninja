function StartQuestionState() {
  this.identifier = 'startQuestion';
  this.units = GouNinja.rules.selectedUnits;
};

StartQuestionState.prototype.begin = function(completion, env) {
  if (completion) completion(env);

  $('#prompt-state input').val('');

  this.generateTurn();
  GouNinja.questionNumber++;
  GouNinja.transitionToState('ask');
};

StartQuestionState.prototype.complete = function(completion, env) {
  if (completion) completion(env);
};

StartQuestionState.prototype.generateNumber = function(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};

StartQuestionState.prototype.generateTurn = function() {
  GouNinja.turn = {
    listens: 0,
    answerTime: 0
  };

  var number = this.generateNumber(1, GouNinja.rules.numberMax);
  GouNinja.turn.number = number;
  console.log("Generated number: ", number);

  var unit = '';
  if (GouNinja.rules.useUnits) {
    unit = _(this.units).sample();

    // This can happen if the user chooses to use units but selects none.
    if (!unit) {
      unit = '';
    }
  }
  var string = number + unit;
  GouNinja.turn.string = string;
  console.log("Generated string: ", string);
};

