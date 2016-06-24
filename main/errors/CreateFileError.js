// Generated by CoffeeScript 1.10.0
(function() {
  var CreateFileError,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CreateFileError = (function(superClass) {
    extend(CreateFileError, superClass);

    CreateFileError.prototype.message = 'Failed to create temporary file for editor';

    function CreateFileError(original_error) {
      this.original_error = original_error;
    }

    return CreateFileError;

  })(Error);

  module.exports = CreateFileError;

}).call(this);
