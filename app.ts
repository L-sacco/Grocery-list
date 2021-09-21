const form = document.querySelector(".grocery-form") as HTMLInputElement;
const input = document.getElementById("grocery-input") as HTMLInputElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLInputElement;
const list = document.querySelector(".list") as HTMLInputElement;
const clearBtn = document.querySelector(".clear-tbn") as HTMLInputElement;

const itemID = new Date().getTime().toString();
form.addEventListener("submit", AddItem);

function AddItem(ev) {
    ev.preventDefault();
    console.log(itemID);
    console.log(input.value);
    if(input.value) {
        CreateElement(input.value);
    }
}

function CreateElement(value) {
    let elem = document.createElement('div') as HTMLDivElement;
    const attr = document.createAttribute('data-id');
    attr.value = itemID;
    elem.setAttributeNode(attr);
    elem.innerHTML = '<div class="list">' + input.value + '</div><button class="clear-btn">Clear list</button>';
    list.appendChild(elem);
}