var form = document.querySelector(".grocery-form");
var input = document.getElementById("grocery-input");
var submitBtn = document.querySelector(".submit-btn");
var list = document.querySelector(".list");
var clearBtn = document.querySelector(".clear-tbn");
var itemID = new Date().getTime().toString();
form.addEventListener("submit", AddItem);
function AddItem(ev) {
    ev.preventDefault();
    console.log(itemID);
    console.log(input.value);
    if (input.value) {
        CreateElement(input.value);
    }
}
function CreateElement(value) {
    var elem = document.createElement('div');
    var attr = document.createAttribute('data-id');
    attr.value = itemID;
    elem.setAttributeNode(attr);
    elem.innerHTML = '<div class="list">' + input.value + '</div><button class="clear-btn">Clear list</button>';
    list.appendChild(elem);
}
