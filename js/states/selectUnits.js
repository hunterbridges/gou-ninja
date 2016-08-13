function SelectUnitsState() {
  this.identifier = 'selectUnits';
};

SelectUnitsState.prototype.begin = function(completion, env) {
  this.$state = $('#select-units-state');
  this.$state.css('display', 'block');

  var state = this;
  this.$state.delegate('a.btn#units-select-all', 'click', function() {
    state.selectAll();
  });

  this.$state.delegate('a.btn#units-select-none', 'click', function() {
    state.selectNone();
  });

  this.$state.delegate('a.btn#units-ok', 'click', function() {
    GouNinja.transitionToState('ready');
  });

  if (completion) completion(env);
};

SelectUnitsState.prototype.complete = function(completion, env) {
  this.$state.css('display', 'none');
  this.$state.undelegate('a.btn', 'click');

  if (completion) completion(env);
};

SelectUnitsState.prototype.selectAll = function() {
  this.$state.find('input[type="checkbox"]').prop('checked', true);
};

SelectUnitsState.prototype.selectNone = function() {
  this.$state.find('input[type="checkbox"]').prop('checked', false);
};
