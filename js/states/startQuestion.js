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

  var hasValidUnit = false;
  var pickedUnit = null;
  if (GouNinja.rules.useUnits) {
    while (hasValidUnit == false) {
      var unit = _(this.units).sample();

      // This can happen if the user chooses to use units but selects none.
      if (!unit) {
        unitStr = '';
        break;
      }

      // If unit has limits, make sure the limits are in bounds of the numberMax
      if (unit.limit) {
        if (unit.min > GouNinja.rules.numberMax)
          continue;
      }

      hasValidUnit = true;
      pickedUnit = unit;
    }
  }

  // Limit min and max by the unit limits
  var randMin = 1;
  var randMax = GouNinja.rules.numberMax;
  var unitStr = '';
  if (hasValidUnit)
  {
    unitStr = pickedUnit.unit;

    if (pickedUnit.limit)
    {
      randMin = Math.max(randMin, pickedUnit.min);
      randMax = Math.min(randMax, pickedUnit.max);
    }
  }

  var number = this.generateNumber(randMin, randMax);
  GouNinja.turn.number = number;
  // console.log("Generated number: ", number);

  var string = number + unitStr;
  GouNinja.turn.string = string;
  // console.log("Generated string: ", string);
};

