#next-ui-template

##description:
+ Mini template engine based on next toolkit.

##usage:
+ get template
```javascript
  var Template=nx.ui.Template;
```

+ format string meets arr:
```javascript
  var arr1=['fei',100];
  var stringTempl='I am {0},my age is {1}';
  console.log(
    Template.format(stringTempl,arr1)
  );
  //result:
  //I am fei,my age is 100
```

+ format string meets object:
```javascript
  var obj1={
    name:'fei',
    age:100
  };
  var stringTempl2='I am {name},my age is {age}';
  console.log(
    Template.format(stringTempl2,obj1)
  );
  //result:
  //I am fei,my age is 100
```

+ Template.heredoc:
```javascript
  var htmlStr=Template.heredoc(function(){/*
    <div class="test-tmpl" id="<%=id%>">
      <ul>
        <% for (var i=0; i<10;i++){ %>
        <li><%=i%></li>
        <% } %>
      </ul>
    </div>
  */});
```

+ Template.compile:
```javascript
  var html=Template.compile(htmlStr,{
    id:"test1"
  });
```

