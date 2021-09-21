var form = document.querySelector(".grocery-form");
var input = document.getElementById("grocery-input");
var submitBtn = document.querySelector(".submit-btn"); // unused
var list = document.querySelector(".list-container");
var clearBtn = document.querySelector(".clear-tbn"); // unused
var itemCounter = 0;
form.addEventListener("submit", AddItem);
function AddItem(ev) {
    ev.preventDefault();
    if (input.value) {
        CreateElement(input.value);
    }
    console.log(++itemCounter);
    if (itemCounter > 0) {
        list.classList.add('show');
    }
    BackToDefault();
}
function CreateElement(value) {
    var itemID = new Date().getTime().toString();
    var element = document.createElement('div');
    element.classList.add('list');
    var attr = document.createAttribute('data-id');
    attr.value = itemID;
    element.setAttributeNode(attr);
    element.innerHTML =
        "<p class='item'>" + input.value +
            "</p><button class='single-remove-btn' onclick='RemoveSingleItem(" + itemID +
            ")'><img src='img/bin.png' /></button>";
    list.appendChild(element);
    AddToLocalStorage(itemID, input.value);
}
function AddToLocalStorage(id, value) {
    console.log("added");
}
function BackToDefault() {
    input.value = "";
    input.focus();
}
function RemoveEverything() {
    //
    //
    //
    // todo: undo button
}
function RemoveSingleItem(id) {
    var anchor = document.querySelector('div[data-id=\'' + id + '\']');
    anchor.remove();
    // todo: undo button
}
