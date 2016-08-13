var GouNinja = {
  validStates: ['ready', 'startQuestion', 'ask', 'prompt', 'result', 'finish'],
  validTransitions: {
    'ready': ['startQuestion'],
    'startQuestion': ['ask'],
    'ask': ['prompt', 'finish'],
    'prompt': ['result', 'ask', 'finish'],
    'result': ['ask', 'startQuestion', 'finish'],
    'finish': ['ready']
  },

  stateClasses: {
    'ready': ReadyState,
    'startQuestion': StartQuestionState,
    'ask': AskState,
    'prompt': PromptState,
    'result': ResultState,
    'finish': FinishState
  },

  questionNumber: 0,
  currentScore: 0,
  highScore: 0,
  utterances: [],

  // Funcs
  init: function() {
    if ('speechSynthesis' in window) {
      this.voice = _(window.speechSynthesis.getVoices()).find(function(voice) {
        return voice.lang === "ja-JP";
      });
      console.log("Found Voice:");
      console.info(this.voice);
    }

    this.transitionToState('ready');
  },

  isValidState: function(state) {
    return _(this.validStates).contains(state);
  },

  isValidTransition: function(newState) {
    if (!this.isValidState(newState)) {
      return false;
    }

    if (!this.currentState) {
      if (newState == 'ready') {
        return true;
      } else {
        return false;
      }
    }

    var validTransitions = this.validTransitions[this.currentState.identifier];
    if (!_(validTransitions).contains(newState)) {
      return false;
    }

    return true;
  },

  transitionToState: function(newState) {
    if (!this.isValidTransition(newState)) {
      return false;
    }

    var newStateClass = this.stateClasses[newState];
    var game = this;
    if (!!this.currentState) {
      console.log("Completing state <"+this.currentState.identifier+">");
      this.currentState.complete(function(env) {
        game.currentState = null;
        game.currentState = new newStateClass(env);
        console.log("Beginning state <"+game.currentState.identifier+">");
        game.currentState.begin();
        HUD.update();
      })
    } else {
      game.currentState = new newStateClass({});
      console.log("Beginning state <"+this.currentState.identifier+">");
      game.currentState.begin();
      HUD.update();
    }
  }
}

_(GouNinja).bindAll('isValidState', 'isValidTransition', 'transitionToState');
