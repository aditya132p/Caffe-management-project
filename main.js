gsap.from("#Welcome", {
    x: -500,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "ease"
});
gsap.from("#img-slide", {
    x: 500,
    opacity: 0,
    scale: 1.2,
    duration: 1,
    ease: "ease"
});

var mainPage = document.querySelector("#main");
var inpName = document.querySelector("#home-Name");
var inpEmail = document.querySelector("#home-email");
var btn2 = document.querySelector("#homebtn");
var obj = {
    userName: "",
    userEmail: "",
    tableNo: "",
    itemName: "",
    addOn: "",
    price: 0,
    qty: "",
    total_Price: 0,
    customerMsg: "",
};

localStorage.setItem("AdminName", "admin");
localStorage.setItem('AdminEmail', 'pawar@gmail.com');

btn2.addEventListener("click", () => {
    if (inpName.value === '' || inpEmail.value === "") {
        inpName.style.border = inpName.value === '' ? "1.4px solid red" : "1.4px solid green";
        inpEmail.style.border = inpEmail.value === '' ? "1.4px solid red" : "1.4px solid green";
        return;
    }
    if (inpName.value === localStorage.getItem("AdminName") || inpEmail.value === localStorage.getItem("AdminEmail")) {
        stafPage();
    } else {
        sessionStorage.setItem("userName", inpName.value);
        sessionStorage.setItem("userEmail", inpEmail.value);
        redirect();
    }
});

var id = 1;
var order = [];
const cafeMenu = [
    { itemName: "Espresso", price: 80 },
    { itemName: "Americano", price: 100 },
    { itemName: "Latte", price: 150 },
    { itemName: "Cappuccino", price: 150 },
    { itemName: "Mocha", price: 170 },
    { itemName: "Macchiato", price: 130 },
    { itemName: "Flat White", price: 150 },
    { itemName: "Iced Coffee", price: 120 },
    { itemName: "Hot Chocolate", price: 130 },
    { itemName: "Tea", price: 50 },
    { itemName: "Herbal Tea", price: 80 },
    { itemName: "Chai Latte", price: 100 },
    { itemName: "Smoothie", price: 200 },
    { itemName: "Scone", price: 60 },
    { itemName: "Croissant", price: 100 },
    { itemName: "Muffin", price: 80 },
    { itemName: "Bagel", price: 80 },
    { itemName: "Sandwich", price: 180 },
    { itemName: "Salad", price: 200 },
    { itemName: "Soup", price: 120 }
];

var clutter = `<option value="">None</option>`;

if (sessionStorage.getItem("userName")) {
    redirect();
}

function redirect() {
    gsap.from("#Welcome", {
        x: 500,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut"
    });
    gsap.from("#img-slide", {
        x: -500,
        opacity: 0,
        duration: 0.8,
        ease: "power2"
    });

    var userName = sessionStorage.getItem("userName");
    mainPage.innerHTML = `
    <div class="main w-full min-h-screen bg-slate-950 flex px-16">
        <div class="w-2/4 py-20 flex items-center flex-col gap-11">
            <div class="card w-96 h-[40rem] bg-slate-50 rounded-lg py-5 px-8 border flex gap-4 justify-center flex-col border-slate-500">
                <div class="flex flex-col mt-4 gap-1">
                    <label for="tableNo">Table no</label>
                    <select class="w-full h-10 rounded-md border outline-none px-2" onchange="handleChange(event, 'tableNo')" id="tableNo">
                        <option value="">Not Selected</option>
                        <option value="tableNo-1">1</option>
                        <option value="tableNo-2">2</option>
                        <option value="tableNo-3">3</option>
                        <option value="tableNo-4">4</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="itemName">Item Name</label>
                    <select class="w-full h-10 rounded-md border outline-none px-2" onchange="handleChange(event, 'itemName')" id="itemName">
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="category">Add on</label>
                    <select class="w-full h-10 hover:bg-purple-50 rounded-md border outline-none px-2" onchange="handleChange(event, 'addOn')" id="add-on">
                        <option value="">None</option>
                        <option class="hover:bg-blue-300" value="Vanilla Cream">Vanilla Cream</option>
                        <option value="Chocolate Cream">Chocolate Cream</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="qty">Quantity</label>
                    <input class="w-full h-10 rounded-md border outline-none px-2" onchange="handleQuantityChange(event)" type="number" id="qty">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="qty">Price</label>
                    <input class="w-full h-10 rounded-md border text-green-500 outline-none px-2" disabled type="number" id="price">
                </div>
                <div class="flex flex-col gap-1">
                    <label for="customerMsg">Customer Message</label>
                    <textarea class="w-full h-20 py-2 rounded-md border outline-none px-2 resize-none" onchange="handleChange(event, 'customerMsg')" id="customerMsg"></textarea>
                </div>
                <button class="px-3 bg-slate-900 text-slate-50 rounded-md py-2 mb-3" onclick="btn()">Submit</button>
            </div>
            <a onclick="logout()" class="text-red-500 bg-slate-300 rounded-md border px-4 py-2 font-bold ">logout</a>
        </div>
        <div class="w-2/4 flex items-start">
            <img class="w-full pt-20 sticky top-0 rounded-md" src="./Group 1.png">
        </div>
    </div>
    `;

    var selectInp = document.getElementById("itemName");
    cafeMenu.forEach((menu, idx) => {
        clutter += `<option value="${menu.itemName}" data_price="${menu.price}" id="${idx}">${menu.itemName}</option>`;
    });
    selectInp.innerHTML = clutter;
}

function logout() {
    sessionStorage.clear();
    window.location.reload();
}

function stafPage() {
    mainPage.innerHTML = `
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Table No</th>
                    <th scope="col" class="px-6 py-3">Client name</th>
                    <th scope="col" class="px-6 py-3">Product name</th>
                    <th scope="col" class="px-6 py-3">Add On</th>
                    <th scope="col" class="px-6 py-3">Customer Msg</th>
                    <th scope="col" class="px-6 py-3">Qty</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Total Price</th>
                </tr>
            </thead>
            <tbody id="tbody"></tbody>
        </table>
    </div>`;

    var getData = localStorage.getItem("obj");
    var dataParse = JSON.parse(getData);
    var row = document.querySelector("#tbody");
    dataParse.forEach((elem) => {
        row.innerHTML += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${elem.tableNo}</th>
            <td class="px-6 py-4">${elem.userName}</td>
            <td class="px-6 py-4">${elem.itemName}</td>
            <td class="px-6 py-4">${elem.addOn}</td>
            <td class="px-6 py-4">${elem.customerMsg}</td>
            <td class="px-6 py-4">${elem.qty}</td>
            <td class="px-6 py-4">${elem.price}</td>
            <td class="px-6 py-4">${elem.total_Price}</td>
        </tr>`;
    });
}

function handleChange(event, field) {
    const value = event.target.value;
    obj[field] = value;
    obj['userName'] = sessionStorage.getItem("userName");
    obj['userEmail'] = sessionStorage.getItem("userEmail");
    if (field === 'itemName' || field === 'qty') {
        updatePrice();
    }
}

function handleQuantityChange(event) {
    obj['qty'] = event.target.value;
    updatePrice();
}

function updatePrice() {
    var priceInp = document.getElementById('price');
    var qtyInp = document.getElementById('qty');
    cafeMenu.forEach((c) => {
        if (c.itemName === obj['itemName']) {
            obj['price'] = c.price;
            priceInp.value = Number(qtyInp.value) * c.price;
            obj['total_Price'] = Number(priceInp.value);
        }
    });
}

function btn() {
    const newObj = { id: id++, ...obj };
    order.push(newObj);
    localStorage.setItem('obj', JSON.stringify(order));
    resetForm();
}

function resetForm() {
    var tableInp = document.getElementById('tableNo');
    var priceInp = document.getElementById('price');
    var addOn = document.getElementById("add-on");
    var selectInp = document.getElementById("itemName");
    var qtyInp = document.getElementById('qty');
    var msgInp = document.getElementById('customerMsg');
    tableInp.value = "";
    selectInp.value = "";
    addOn.value = "";
    priceInp.value = "";
    qtyInp.value = "";
    msgInp.value = "";
    obj = {
        tableNo: "",
        itemName: "",
        price: 0,
        total_Price: 0,
        addOn: "",
        qty: "",
        customerMsg: "",
    };
}
