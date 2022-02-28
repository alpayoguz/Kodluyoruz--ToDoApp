let contentButton = document.querySelector("#content-button");
let isDark = true;



contentButton.addEventListener("click", buttonClicked)

function buttonClicked(event)
{
    event.preventDefault();
    let contentText = document.querySelector("#content-text");

    if(contentText.value !== "")
    {
       
        let contentList = document.querySelector("#content-list");
        let newLi = document.createElement("li");
        if(isDark=== true)
        {
            newLi.style.backgroundColor = "#E7E9EB"
            isDark=false;

        } else{
            newLi.style.backgroundColor = "rgb(213,231,231,0.5)"
            isDark= true;
        }
        newLi.innerText = contentText.value;
        contentList.appendChild(newLi);
        contentText.value = "";
    }else{
        alert("Boş ekleme yapamazsın!")
    }
    
}

