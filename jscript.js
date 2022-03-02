//Selectors
let toDoInput = document.querySelector("#content-input");
let toDoButton = document.querySelector("#content-button");
let toDoList = document.querySelector("#content-list");
let filterOption = document.querySelector("#filter-to-do");

//Variables
let backgroundColor = true;

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addToDo(event)
{
    //prevent form from submitting
    event.preventDefault();
    //create toDoDiv
    let toDoDiv = document.createElement("div");
    toDoDiv.classList.add("to-do-div");
    //create toDoLi
    let toDoLi = document.createElement("Li");
    //set background color to li
    if(backgroundColor === true)
    {
        toDoLi.style.backgroundColor = "rgb(137, 137, 137, 0.5)";
        backgroundColor=false;
    }else{
        toDoLi.style.backgroundColor = "rgb(137, 137, 137, 0.2)";
        backgroundColor=true;
    }

    toDoLi.classList.add("to-do-li");
    toDoLi.innerText = toDoInput.value;
    toDoDiv.appendChild(toDoLi);
    // add to do to local storage
    saveToLocal(toDoInput.value);

    //create complete button
    let completeButton = document.createElement("Button");
    completeButton.innerHTML = "&#10004;"
    completeButton.classList.add("complete-btn");
    toDoDiv.appendChild(completeButton);
    //create delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML = "&#128465;"
    toDoDiv.appendChild(deleteButton);
    //Append div to list
    toDoList.appendChild(toDoDiv);
    toDoInput.value = " ";
}

function deleteAndCheck(event)
{   

    //delete task
    const clickedItem = event.target;
    if(clickedItem.classList[0]=== "delete-btn") 
    {
        clickedItem.parentElement.classList.add("fall");
        removeLocalTodos(clickedItem.parentElement);
        clickedItem.parentElement.addEventListener("transitionend", () => 
        clickedItem.parentElement.remove());
    }

    //complete task
    if(clickedItem.classList[0]=== "complete-btn")
    {
        clickedItem.parentElement.firstChild.classList.toggle("line-completed");
        clickedItem.parentElement.classList.toggle("opacity-completed");

    }

}

function filterTodo(e) {
    const todos = toDoList.childNodes;
    todos.forEach(function (todo) { 
        const mStyle = todo.style;  
        if(mStyle !== undefined && mStyle !== null){
            switch (e.target.value) {
                case "all":
                    mStyle.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('opacity-completed')) {
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = "none";
                    }
                    break;
                case "onprogress":
                    if (todo.classList.contains('opacity-completed')){
                        mStyle.display = 'none';
                    }
                    else{
                        mStyle.display = "flex";
                    }
                    break;
            }
        }
    })
}

function saveToLocal(todo){
    
    let todos;
    if(localStorage.getItem("todos") ===null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos()
{
    let todos;
    if(localStorage.getItem("todos") ===null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo)
    {
        let toDoDiv = document.createElement("div");
        toDoDiv.classList.add("to-do-div");
        //create toDoLi
        let toDoLi = document.createElement("Li");
        //set background color to li
        if(backgroundColor === true)
        {
            toDoLi.style.backgroundColor = "rgb(137, 137, 137, 0.5)";
            backgroundColor=false;
        }else{
            toDoLi.style.backgroundColor = "rgb(137, 137, 137, 0.2)";
            backgroundColor=true;
        }
    
        toDoLi.classList.add("to-do-li");
        toDoLi.innerText = todo;
        toDoDiv.appendChild(toDoLi);
        //create complete button
        let completeButton = document.createElement("Button");
        completeButton.innerHTML = "&#10004;"
        completeButton.classList.add("complete-btn");
        toDoDiv.appendChild(completeButton);
        //create delete button
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = "&#128465;"
        toDoDiv.appendChild(deleteButton);
        //Append div to list
        toDoList.appendChild(toDoDiv);
    
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") ===null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const  todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}