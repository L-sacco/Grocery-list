const form = document.querySelector(".grocery-form") as HTMLFormElement;
const input = document.getElementById("grocery-input") as HTMLInputElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement; // unused
const list = document.querySelector(".list-container") as HTMLDivElement;
const clearBtn = document.querySelector(".clear-tbn") as HTMLButtonElement; // unused

var itemCounter = 0;

form.addEventListener("submit", AddItem);

function AddItem(ev) {
    ev.preventDefault();
    if(input.value) {
        CreateElement(input.value);
    }
    console.log(++itemCounter);

    if(itemCounter > 0) { list.classList.add('show'); }
    BackToDefault();
}

function CreateElement(value) {
    
    var itemID = new Date().getTime().toString(); // Unique ID using datetime

    let element = document.createElement('div') as HTMLDivElement;
    element.classList.add('list'); // Adding the class 'list' to the div just created

    const attr = document.createAttribute('data-id');    // creating data-id attribute and
    attr.value = itemID;                                //  setting it to itemID (datatime id)   
    element.setAttributeNode(attr);

    // Creates the new item on dom, inside 'list-container' div after the clearBtn div 
    element.innerHTML = 
        "<p class='item'>" + input.value + 
        "</p><button class='single-remove-btn' onclick='RemoveSingleItem(" + itemID + 
        ")'><img src='img/bin.png' /></button>";

    list.appendChild(element);

    AddToLocalStorage(itemID, input.value);
}

function AddToLocalStorage(id, value) {
    console.log("added in local storage with id:" + id + " & value:" + value)
}

function BackToDefault() {
    input.value = "";
    input.focus();
}

function RemoveEverything() {
    //
    //
    // itemCounter = 0;

    // todo: undo button
}

function RemoveSingleItem(id) {
    let anchor = document.querySelector('div[data-id=\'' + id + '\']');
    anchor.remove();
    itemCounter--;

    if (itemCounter == 0) { 
        BackToDefault();
        list.classList.remove('show');
    }

    // todo: undo button
}