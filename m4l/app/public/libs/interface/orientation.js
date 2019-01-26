
var a = new Interface.Panel({ 
  container:document.querySelector("#buttonPanel") 
});

var b = new Interface.Button({ 
  bounds:[.05,.05,.3,.9],  
  label:'toggle'  
});
var c = new Interface.Button({ 
  bounds:[.35,.05,.3,.9],
  label:'momentary',
  mode:'momentary'  
});
var d = new Interface.Button({ 
  bounds:[.65,.05,.3,.9],
  label:'contact',
   mode:'contact'  
});

a.background = 'black';   
a.add(b,c,d);