var GouNinja = {
  validStates: ['ready', 'startQuestion', 'ask', 'prompt', 'result', 'finish', 'error', 'selectUnits', 'howToPlay'],
  validTransitions: {
    'error': [],
    'ready': ['startQuestion', 'selectUnits', 'howToPlay'],
    'selectUnits': ['ready'],
    'howToPlay': ['ready'],
    'startQuestion': ['ask'],
    'ask': ['prompt', 'finish'],
    'prompt': ['result', 'ask', 'finish'],
    'result': ['ask', 'startQuestion', 'finish'],
    'finish': ['ready']
  },

  stateClasses: {
    'error': ErrorState,
    'ready': ReadyState,
    'selectUnits': SelectUnitsState,
    'howToPlay': HowToPlayState,
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
    if (!('speechSynthesis' in window)) {
      this.transitionToState('error', {message: 'The SpeechSynthesis API is not available in your browser. :(<br><a href="http://caniuse.com/#feat=speech-synthesis" target="_blank">Which browsers can I use?</a>'});
      return;
    }

    this.voice = _(window.speechSynthesis.getVoices()).find(function(voice) {
      return voice.lang === "ja-JP";
    });

    if (!this.voice) {
      this.transitionToState('error', {message: 'Could not find any Japanese speech voices on your system. :('});
      return;
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
      if (newState == 'ready' || newState == 'error') {
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

  transitionToState: function(newState, env) {
    if (!this.isValidTransition(newState)) {
      return false;
    }

    var newStateClass = this.stateClasses[newState];
    var game = this;
    if (!!this.currentState) {
      // console.log("Completing state <"+this.currentState.identifier+">");
      this.currentState.complete(function(env) {
        game.currentState = null;
        game.currentState = new newStateClass(env);
        // console.log("Beginning state <"+game.currentState.identifier+">");
        game.currentState.begin(null, env);
        HUD.update();
      }, env);
    } else {
      game.currentState = new newStateClass(env);
      // console.log("Beginning state <"+this.currentState.identifier+">");
      game.currentState.begin(null, env);
      HUD.update();
    }
  }
}

_(GouNinja).bindAll('isValidState', 'isValidTransition', 'transitionToState');
