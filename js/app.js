const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const list2 = document.getElementById("list2")
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
const no_line = "";
let LIST, id;
let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{    
    LIST = [];
    id = 0;
}
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}
 clear.addEventListener("click", function(){
     localStorage.clear();
     location.reload();
 });
 function addToDo(toDo, id, done, trash){
   if(trash){ return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    <i class="fa fa-pencil" job="edit" id="${id}"></i>
                  </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}
document.addEventListener("keyup",function(abc){
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});
function completeToDo(element){
    const ID = LIST[element.id].id;
    const NAME = LIST[element.id].name;
    const item = `<li class="item">
                    <i class="fa ${CHECK} co" job="complete" id="${ID}"></i>
                    <p class="text ${LINE_THROUGH}">${NAME}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${ID}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    list2.insertAdjacentHTML(position, item);
}
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
function removeToDo2(element){
    
    element.parentNode.parentNode.removeChild(element.parentNode);
}
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value
    
    if(elementJob == "complete"){
        completeToDo(element);
        removeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    else if(elementJob == "edit")
    {
        const NAME = LIST[element.id].name;
        const ID = LIST[element.id].id;
        var newText = prompt("Please Enter Updated task", NAME);
        if(NAME!=newText)
        {
            removeToDo(element);
            const item = `<li class="item">
                    <i class="fa ${UNCHECK} co" job="complete" id="${ID}"></i>
                    <p class="text ${no_line}">${newText}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${ID}"></i>
                    <i class="fa fa-pencil" job="edit" id="${ID}"></i>
                  </li>
                `;
            const position = "beforeend";
            list.insertAdjacentHTML(position, item);
            LIST[element.id].name = newText;
            LIST[element.id].trash = false;
            localStorage.setItem("TODO", JSON.stringify(LIST));

        }
        

    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
list2.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if(elementJob == "delete"){
        removeToDo2(element);
    }
});