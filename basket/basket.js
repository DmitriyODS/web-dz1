import '../style.css'

const itemsLst = [
    {
        id: 1,
        title: "Товар 1",
        describe: "Какое-то понятное описание 1",
        imgURL: "https://images.unsplash.com/photo-1711843250811-a7d0bb485a42?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 123,
    },
    {
        id: 2,
        title: "Товар 2",
        describe: "Какое-то понятное описание 2",
        imgURL: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 564,
    },
    {
        id: 3,
        title: "Товар 3",
        describe: "Какое-то понятное описание 3",
        imgURL: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 12,
    },
    {
        id: 4,
        title: "Товар 4",
        describe: "Какое-то понятное описание 4",
        imgURL: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 1230,
    },
    {
        id: 5,
        title: "Товар 5",
        describe: "Какое-то понятное описание 5",
        imgURL: "https://images.unsplash.com/photo-1529699263800-6030cf843dc1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 1234,
    },
    {
        id: 6,
        title: "Товар 6",
        describe: "Какое-то понятное описание 6",
        imgURL: "https://plus.unsplash.com/premium_photo-1669646471848-6da5b67fbc09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 1235,
    },
    {
        id: 7,
        title: "Товар 7",
        describe: "Какое-то понятное описание 7",
        imgURL: "https://images.unsplash.com/photo-1617360547704-3da8b5363369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 3265,
    },
    {
        id: 8,
        title: "Товар 8",
        describe: "Какое-то понятное описание 8",
        imgURL: "https://images.unsplash.com/photo-1623668514914-ab262971bc88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 4560,
    },
];

let userData = {
    likesGoodsIDs: [],
    buyLst: {},
    selectedLst: [],
};

function SaveData() {
    const jsonStr = JSON.stringify(userData);
    localStorage.setItem('user-data', jsonStr);
}

function LoadData() {
    const jsonStr = localStorage.getItem('user-data');
    if (jsonStr) {
        userData = JSON.parse(jsonStr);
    }
}

function SwitchLike(itemID) {
    if (userData.likesGoodsIDs.includes(itemID)) {
        userData.likesGoodsIDs = userData.likesGoodsIDs.filter(function (item) {
            return item !== itemID;
        });
    } else {
        userData.likesGoodsIDs.push(itemID);
    }
    SaveData();
    Render();
}

function InCart(itemID) {
    if (userData.buyLst[itemID]) {
        userData.buyLst[itemID] += 1;
    } else {
        userData.buyLst[itemID] = 1;
    }

    SaveData();
    Render();
}

function ClearCart() {
    userData.buyLst = {};
    userData.selectedLst = [];
    SaveData();
    Render();
}

window.SwitchLike = SwitchLike;
window.InCart = InCart;
window.ClearCart = ClearCart;

function SumCart() {
    LoadData();
    let resSum = 0;

    userData.selectedLst.forEach((it) => {
        const item = itemsLst[parseInt(it) - 1];
        resSum += userData.buyLst[parseInt(it)] * item.price;
    })

    return resSum;
}

function OnChangeCount(element) {
    userData.buyLst[element.name] = element.value;
    SaveData();
    Render();
}

function OnChecked(element) {
    if (element.checked && !userData.selectedLst.includes(element.name)) {
        userData.selectedLst.push(element.name)
    } else {
        userData.selectedLst = userData.selectedLst.filter((it) => it !== element.name);
    }

    console.log(userData.selectedLst)
    SaveData();
    Render();
}

window.OnChangeCount = OnChangeCount;
window.OnChecked = OnChecked;

function Render() {
    tableContent.innerText = '';

    for (let key in userData.buyLst) {
        if (userData.buyLst.hasOwnProperty(key)) {
            const item = itemsLst[key - 1];
            const isCheck = userData.selectedLst.includes(key) ? 'checked' : '';

            tableContent.insertAdjacentHTML('beforeend', `
            <tr class="text-center">
                <td>
                    <p class="font-bold text-[1.5rem]">${item.title}</p>
                </td>
                <td>
                    <figure class="mask mask-squircle w-[8rem] m-auto">
                        <img src="${item.imgURL}"
                             alt="Shoes"/>
                    </figure>
                </td>
                <td>
                    <p class="font-bold text-[1.5rem]">${item.price} руб.</p>
                </td>
                <td>
                    <label>
                        <input
                        name="${item.id}"
                        type="number" value="${userData.buyLst[key]}" min="1"
                               class="input input-bordered input-primary max-w-[4rem]"
                               onchange="OnChangeCount(this)"
                               />
                    </label>
                </td>
                <th>
                    <label>
                        <input name="${item.id}" type="checkbox" class="checkbox" onchange="OnChecked(this)"/>
                    </label>
                </th>
            </tr>
            `)
        }
    }

    countLikes.innerText = userData.likesGoodsIDs.length.toString();
    resSum.innerText = `Итого: ${SumCart()} руб.`
}

const tableContent = document.getElementById('table-content');
const countLikes = document.getElementById('count-likes');
const resSum = document.getElementById('res-sum');
LoadData();
Render();
