var groceryForm = document.querySelector(".grocery-form");
var searchForm = document.querySelector(".search-form");
var searchInput = document.getElementById("search-input");
var groceryInput = document.getElementById("grocery-input");
var submitBtn = document.querySelector(".submit-btn"); // unused
var list = document.querySelector(".list-container");
var clearBtn = document.querySelector(".clear-tbn"); // unused
var itemCounter = 0;
groceryForm.addEventListener("submit", AddItem);
searchForm.addEventListener("submit", SearchItem);
function AddItem(ev) {
    ev.preventDefault();
    if (groceryInput.value) {
        CreateElement(groceryInput.value);
    }
    ++itemCounter;
    if (itemCounter > 0) {
        list.classList.add('show');
        searchForm.classList.add('show');
    }
    BackToDefault();
}
function CreateElement(value) {
    var itemID = new Date().getTime().toString(); // Unique ID using datetime
    var element = document.createElement('div');
    element.classList.add('list'); // Adding the class 'list' to the div just created
    var attr = document.createAttribute('data-id'); // creating data-id attribute and
    attr.value = itemID; //  setting it to itemID (datatime id)   
    element.setAttributeNode(attr);
    // Creates the new item on dom, inside 'list-container' div after the clearBtn div 
    element.innerHTML =
        "<p class='item'>" + groceryInput.value +
            "</p><button class='single-remove-btn' onclick='RemoveSingleItem(" + itemID +
            ")'><img src='img/bin.png' /></button>";
    list.appendChild(element);
    AddToLocalStorage(itemID, groceryInput.value);
}
function AddToLocalStorage(id, value) {
    //console.log("added in local storage with id:" + id + " & value:" + value)
}
function BackToDefault() {
    groceryInput.value = "";
    groceryInput.focus();
}
function RemoveSingleItem(id) {
    var anchor = document.querySelector('div[data-id=\'' + id + '\']');
    if (confirm("Are you sure?")) {
        anchor.remove();
        itemCounter--;
    }
    if (itemCounter == 0) {
        BackToDefault();
        list.classList.remove('show');
        searchForm.classList.remove('show');
    }
    // todo: undo button
}
function ClearList() {
    var items = Array.from(document.querySelectorAll('.list'));
    if (itemCounter > 0 && items) {
        if (confirm("Are you sure?")) {
            items.map(function (item) { return item.remove(); });
            itemCounter = 0;
            BackToDefault();
            list.classList.remove('show');
            searchForm.classList.remove('show');
        }
    }
}
function Highlight(item, val) {
    //RemoveHighlight(item, val);
    item.classList.add('highlighted');
}
function RemoveHighlight(items, val) {
    items.forEach(function (item) {
        item.classList.remove('highlighted');
    });
}
function SearchItem(ev) {
    ev.preventDefault();
    var flag = 0;
    var val = searchInput.value.toUpperCase();
    var items = document.querySelectorAll('.item');
    RemoveHighlight(items, val);
    items.forEach(function (item) {
        if (item.innerHTML.toUpperCase() === val) {
            Highlight(item, val);
            flag++;
        }
    });
    if (flag == 0)
        alert("no items found");
    //items.filter(item => item === val ? console.log(item) : console.log("no"))
}
