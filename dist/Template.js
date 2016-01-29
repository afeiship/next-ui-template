(function (nx, global) {

  var rPath = /(?:{)([\w.]+?)(?:})/gm;
  var tmplCache = {};
  var Template = nx.declare('nx.ui.Template', {
    statics: {
      format: function (inString, inArgs) {
        var result = inString || '';
        var replaceFn = (inArgs instanceof Array) ? function (str, match) {
          return inArgs[match];
        } : function (str, match) {
          return nx.path(inArgs, match);
        };
        result = inString.replace(rPath, replaceFn);
        return result;
      },
      heredoc: function (inMethod) {
        return inMethod.toString().split('\n').slice(1, -1).join('\n') + '\n';
      },
      compile: function (inTemplate, inData) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(inTemplate) ?
          tmplCache[inTemplate] = tmplCache[inTemplate] ||
            Template.compile(document.getElementById(inTemplate).innerHTML) :

          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

              // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

              // Convert the template into pure JavaScript
            inTemplate
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'") + "');}return p.join('');");

        // Provide some basic currying to the user
        return inData ? fn(inData) : fn;
      }
    }
  });

}(nx, nx.GLOBAL));
