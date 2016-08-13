function StartQuestionState() {
  this.identifier = 'startQuestion';
  this.units = [
    '',   // No unit
    'つ', // tsu - things
    '台', // dai - machines
    '本', // hon - long, thin objects
    '枚', // mai - thin, flat objects
    '分', // bun - minutes
    '時', // ji - hour of the day
    '時間', // jikan - hour long periods
    '月', // gatsu - months of the year
    'ヶ月', // kagetsu - month-long periods
    '日', // ka - day of the month
    '週', // shuu - weeks
    '才', // sai - years of age
    '回' // kai - frequency
  ];
};

StartQuestionState.prototype.begin = function(completion) {
  if (completion) completion();

  this.generateTurn();
  GouNinja.transitionToState('ask');
};

StartQuestionState.prototype.complete = function(completion) {
  if (completion) completion();
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
  }
  var string = number + unit;
  GouNinja.turn.string = string;
  console.log("Generated string: ", string);
};

