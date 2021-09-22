const groceryForm = document.querySelector(".grocery-form") as HTMLFormElement;
const searchForm = document.querySelector(".search-form") as HTMLFormElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const groceryInput = document.getElementById("grocery-input") as HTMLInputElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement; // unused
const list = document.querySelector(".list-container") as HTMLDivElement;
const clearBtn = document.querySelector(".clear-tbn") as HTMLButtonElement; // unused

var itemCounter: number = 0;

groceryForm.addEventListener("submit", AddItem);
searchForm.addEventListener("submit", SearchItem);

function AddItem(ev) {
    ev.preventDefault();
    if(groceryInput.value) {
        CreateElement(groceryInput.value);
    }
    ++itemCounter;
    if(itemCounter > 0) { 
        list.classList.add('show'); 
        searchForm.classList.add('show'); 
    }
    BackToDefault();
}

function CreateElement(value: string) {
    
    var itemID: string = new Date().getTime().toString(); // Unique ID using datetime

    let element = document.createElement('div') as HTMLDivElement;
    element.classList.add('list'); // Adding the class 'list' to the div just created

    const attr = document.createAttribute('data-id');    // creating data-id attribute and
    attr.value = itemID;                                //  setting it to itemID (datatime id)   
    element.setAttributeNode(attr);

    // Creates the new item on dom, inside 'list-container' div after the clearBtn div 
    element.innerHTML = 
        "<p class='item'>" + groceryInput.value + 
        "</p><button class='single-remove-btn' onclick='RemoveSingleItem(" + itemID + 
        ")'><img src='img/bin.png' /></button>";

    list.appendChild(element);

    AddToLocalStorage(itemID, groceryInput.value);
}

function AddToLocalStorage(id: string, value: string) {
    //console.log("added in local storage with id:" + id + " & value:" + value)
}

function BackToDefault() {
    groceryInput.value = "";
    groceryInput.focus();
}

function RemoveSingleItem(id: string) {
    let anchor = document.querySelector('div[data-id=\'' + id + '\']');
    if (confirm("Are you sure?")) {
        anchor.remove();
        itemCounter--;
    }

    if (itemCounter == 0) { 
        BackToDefault();
        list.classList.remove('show');
        searchForm.classList.remove('show');
    }
}

function ClearList() {
    let items = Array.from(document.querySelectorAll('.list'));
    if (itemCounter > 0 && items) {
        if (confirm("Are you sure?")) {
            items.map(item => item.remove());
            itemCounter = 0;
            BackToDefault();
            list.classList.remove('show');
            searchForm.classList.remove('show');
        }
    }
}

function Highlight(item, val) {
    item.classList.add('highlighted');
}

function RemoveHighlight(items, val) {
    items.forEach(item => { 
        item.classList.remove('highlighted');
    });
}

function SearchItem(ev) {
    ev.preventDefault();
    let flag: number = 0;
    let val: string = searchInput.value.toUpperCase();
    let items = document.querySelectorAll('.item');
    RemoveHighlight(items, val);
    items.forEach(item => { 
        if (item.innerHTML.toUpperCase() === val) { 
            Highlight(item, val); 
            flag++;
        }
    });
    if (flag == 0) alert("no items found");
    //items.filter(item => item === val ? console.log(item) : console.log("0"))
}