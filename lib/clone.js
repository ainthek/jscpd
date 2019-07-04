// Generated by CoffeeScript 1.11.1
(function() {
  var Blamer, Clone, Promise, shjs;

  shjs = require('shelljs');

  Blamer = require('blamer');

  Promise = require('bluebird');

  Clone = (function() {
    function Clone(firstFile, secondFile, firstFileStart, secondFileStart, linesCount, tokensCount) {
      this.firstFile = firstFile;
      this.secondFile = secondFile;
      this.firstFileStart = firstFileStart;
      this.secondFileStart = secondFileStart;
      this.linesCount = linesCount;
      this.tokensCount = tokensCount;
      this.firstFileAnnotatedCode = {};
      this.secondFileAnnotatedCode = {};
    }

    Clone.prototype.getLines = function(isFirstFile) {
      var code, end, lines, start;
      if (isFirstFile == null) {
        isFirstFile = true;
      }
      code = shjs.cat(isFirstFile ? this.firstFile : this.secondFile);
      start = isFirstFile ? this.firstFileStart : this.secondFileStart;
      lines = code.split('\n');
      end = start + this.linesCount;
      return lines.slice(start, +end + 1 || 9e9).join("\n");
    };

    Clone.prototype.blame = function() {
      var blamer;
      blamer = new Blamer;
      return Promise.all([blamer.blameByFile(this.firstFile), blamer.blameByFile(this.secondFile)]).then((function(_this) {
        return function(results) {
          var annotation, line, ref, ref1;
          ref = results[0][_this.firstFile];
          for (line in ref) {
            annotation = ref[line];
            if (_this.lineInRange(line, _this.firstFileStart)) {
              _this.firstFileAnnotatedCode[line] = annotation;
            }
          }
          ref1 = results[1][_this.secondFile];
          for (line in ref1) {
            annotation = ref1[line];
            if (_this.lineInRange(line, _this.secondFileStart)) {
              _this.secondFileAnnotatedCode[line] = annotation;
            }
          }
          return _this;
        };
      })(this));
    };

    Clone.prototype.lineInRange = function(line, fileStart) {
      return 0 + line >= fileStart && 0 + line <= fileStart + this.linesCount;
    };

    return Clone;

  })();

  exports.Clone = Clone;

}).call(this);