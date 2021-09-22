const groceryForm = document.querySelector(".grocery-form") as HTMLFormElement;
const searchForm = document.querySelector(".search-form") as HTMLFormElement;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
const groceryInput = document.getElementById("grocery-input") as HTMLInputElement;
const list = document.querySelector(".list-container") as HTMLDivElement;
const quantitySelect = document.getElementById('quantity') as HTMLSelectElement;

class Items {
    itemID: string;
    itemValue: string;
    itemQuantity: string;
}

var itemsList: Items[] = [];

var itemCounter: number = 0;

groceryForm.addEventListener("submit", AddItem);
searchForm.addEventListener("submit", SearchItem);

function AddItem(ev) {
    ev.preventDefault();
    if(groceryInput.value) {
        var quantityValue: string = quantitySelect.options[quantitySelect.selectedIndex].value;
        CreateElement(groceryInput.value, quantityValue);
    }
    ++itemCounter;
    if(itemCounter > 0) { 
        list.classList.add('show'); 
        searchForm.classList.add('show'); 
    }
    BackToDefault();
}

function CreateElement(value: string, quantity: string) {
    
    var itemID: string = new Date().getTime().toString(); // Unique ID using datetime
    let element: HTMLDivElement = document.createElement('div');
    element.classList.add('list'); // Adding the class 'list' to the div just created

    const attr: Attr = document.createAttribute('data-id');    // creating data-id attribute and
    attr.value = itemID;                                //  setting it to itemID (datatime id)   
    element.setAttributeNode(attr);

    // Creates the new item on dom, inside 'list-container' div after the clearBtn div 
    element.innerHTML = 
        "<p class='item'>" + quantity + "x: " + groceryInput.value + 
        "</p><button class='single-remove-btn' onclick='RemoveSingleItem(" + itemID + 
        ")'><img src='img/bin.png' /></button>";

    list.appendChild(element);

    AddToLocalStorage(itemID, groceryInput.value, quantity);
}

function AddToLocalStorage(id: string, value: string, quantity: string) {
    let _item: Items = {itemID: id, itemValue: value, itemQuantity: quantity}
    itemsList.push(_item);
    //
    // TO COMPLETE
    //
}

function RemoveFromLocalStorage(id: string, value: string) {
    //
    // TO COMPLETE
    //
}

function BackToDefault() {
    groceryInput.value = "";
    groceryInput.focus();
    searchInput.value = "";
}

function RemoveSingleItem(id: string) {
    let anchor: HTMLDivElement = document.querySelector('div[data-id=\'' + id + '\']');
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
    let items: Element[] = Array.from(document.querySelectorAll('.list'));
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
    let searchValue: string = searchInput.value.toUpperCase();
    /*let ind = itemsList.find();
    RemoveHighlight(items, searchValue);
    itemsList.forEach(item => { 
        if (item.innerHTML.toUpperCase() === searchValue) { 
            Highlight(item, searchValue); 
           flag++;
        }
    }); */
    if (flag == 0) alert("0 Items found for: " + searchValue);
    //items.filter(item => item === val ? console.log(item) : console.log("0"))
}