
getAll();

document.getElementById('theForm').onsubmit = function(e){
    addItem();
    e.preventDefault();
}

document.getElementById('btn').onclick = function(){
    addItem();
};

function getAll(){
  var xmlhttp = (window.XMLHttpRequest)? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"); 
   xmlhttp.onreadystatechange = function(){
       if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           var obj = JSON.parse(xmlhttp.responseText);
           
           var list = document.getElementById('list');
           
           for(var i = 0; i< obj.length; i++){
               var li = document.createElement('li');

               li.setAttribute("contenteditable", "true");
               
               li.innerHTML = obj[i].items+'<span contenteditable="false" class="x" id="'+obj[i].id+'">&nbsp;</span>';
               
               li.onblur = function(){
                   changeItem(this.lastChild.id);
               }
               
               li.lastChild.onclick = function(){
                   deleteItem(this.id);
               }

               list.appendChild(li);
           }
       }
   };
   
   xmlhttp.open('get', 'processRequest.php?action=getAll', true);
   xmlhttp.send();
}

function deleteItem(id){
  var xmlhttp = (window.XMLHttpRequest)? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"); 
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var el = document.getElementById(id);
            var parentofel = el.parentNode;
            parentofel.parentNode.removeChild(parentofel);            
        }
    }
    xmlhttp.open('get', 'processRequest.php?action=deleteItem&id='+id, true);
    xmlhttp.send();
}

function addItem(){
  var xmlhttp = (window.XMLHttpRequest)? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"); 
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
           var obj = JSON.parse(xmlhttp.responseText);
           
           var list = document.getElementById('list');
           
           for(var i = 0; i < obj.length; i++){
               var li = document.createElement('li');
               li.setAttribute("contenteditable", "true");
               li.innerHTML = obj[i].items+'<span contenteditable="false" class="x" id="'+obj[i].id+'">&nbsp;</span>';
               list.insertBefore(li, list.childNodes[0]);
               
               li.onblur = function(){
                   changeItem(this.lastChild.id);
               }
               
               li.lastChild.onclick = function(){
                   deleteItem(this.id);
               }
               console.log(obj[i].items);
           }            
        }
    }
    var input = document.getElementById('input').value;
    input = encodeURIComponent(input.trim());
    xmlhttp.open('get', 'processRequest.php?action=addItem&item='+input, true);
    xmlhttp.send();
}

function changeItem(id){
  var xmlhttp = (window.XMLHttpRequest)? new XMLHttpRequest(): new ActiveXObject("Microsoft.XMLHTTP"); 
    var input = document.getElementById(id).parentNode.innerHTML;
    var pos = input.indexOf("<span");
    input = input.substring(0, pos);
    input = encodeURIComponent(input.trim());
    xmlhttp.open('get', "processRequest.php?action=changeItem&item="+input+"&id="+id, true);
    xmlhttp.send();
}