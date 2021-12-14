var HUD = {
  init: function() {
    this.$el = $('#play-scoreboard');
    this.$quit = $('#quit');
    this.update();

    $('html').delegate('#quit', 'click', function() {
      if (confirm("This will quit the current game!")) {
        GouNinja.transitionToState('finish');
      }
    });
  },

  show: function() {
    this.$el.css('display', 'block');
  },

  hide: function() {
    this.$el.css('display', 'none');
  },

  update: function() {
    if (!!GouNinja.turn) {
      var avgResp = 0;
      if (GouNinja.answerTimes.length > 0) {
        var sum = _.reduce(GouNinja.answerTimes, function(memo, num){ return memo + num; }, 0);
        avgResp = Math.floor(sum / GouNinja.answerTimes.length);
      }

      var correct = 100;
      if (GouNinja.totalAnswers > 0) {
        correct = Math.floor(100.0 * GouNinja.correctAnswers / GouNinja.totalAnswers);
      }
      this.$el.html(
          '<b>Correct:</b> ' + correct + "%&nbsp;&nbsp;" +
          (GouNinja.rules.learningMode !== true ? '<b>Score:</b> ' + GouNinja.currentScore + "&nbsp;&nbsp;" : '') +
          '<b>Avg Resp:</b> ' + avgResp + "ms&nbsp;&nbsp;" +
          "<b>Question:</b> " + GouNinja.questionNumber + "/" + GouNinja.rules.gameLength + 
          (GouNinja.rules.learningMode === true ? '&nbsp;&nbsp;<a href="#!" onclick="GouNinja.transitionToState(\'ask\');">Repeat</a>' : ''));
      this.$quit.css('display', 'block');
    } else {
      // Game is inactive
      this.$el.html('<b>High Score:</b> ' + GouNinja.highScore);
      this.$quit.css('display', 'none');
    }
  }
};

_(HUD).bindAll('init', 'show', 'hide', 'update');
