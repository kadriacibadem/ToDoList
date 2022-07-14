var task = document.querySelector("#task")
var addButton = document.querySelector("#liveToastBtn")
var list = document.querySelector("#list")

eventListener();
function eventListener(){

    
    document.addEventListener('DOMContentLoaded', getTasks)
    

}



function newElement(){

    if(task.value === ''){
        $('#fail').toast('show')
    }else{
        const createtask = document.createElement("li")
        const createi = document.createElement("i") 
        createi.classList.add("close","float-right","fa-solid", "fa-xmark")  
        addLocalStorage(task.value)     
        createtask.innerHTML = task.value + createi.outerHTML
        list.append(createtask)
        createtask.lastChild.addEventListener("click",function(){
            removeLocalStorage(createtask)
            createtask.remove()
        })
        task.value=""
        createtask.onclick = function(){
            if(createtask.classList.value.includes("checked")){
                createtask.classList.remove("checked")
            }else{
                createtask.classList.add("checked")
            }
        }
        
        $('#success').toast('show')
    }   
}


function addLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks')===null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    
    localStorage.setItem('tasks',JSON.stringify(tasks))
}


function getTasks(){
    let tasks

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        const createli = document.createElement("li")            
        createli.appendChild(document.createTextNode(task))
        const createi = document.createElement("i")
        createi.innerHTML = `${'<i class="close float-right fa-solid fa-xmark"></i>'}`
        createli.append(createi)
        createli.onclick = function(){
            if(createli.classList.value.includes("checked")){
                createli.classList.remove("checked")
            }else{
                createli.classList.add("checked")
            }
        }
        createli.lastChild.addEventListener("click",function(){
            createli.remove();
            removeLocalStorage(createli)
            
        })
        list.appendChild(createli)
    })


}


function removeLocalStorage(taskItem){
    let tasks;
    
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent == task){
            tasks.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}