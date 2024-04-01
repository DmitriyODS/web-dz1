import './style.css'

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

window.SwitchLike = SwitchLike;
window.InCart = InCart;

function SumCart() {
    LoadData();
    let resSum = 0;

    for (let key in userData.buyLst) {
        if (userData.buyLst.hasOwnProperty(key)) {
            resSum += userData.buyLst[key];
        }
    }

    return resSum;
}

function Render() {
    goods.innerHTML = '';
    itemsLst.forEach((it) => {
        goods.insertAdjacentHTML(
            'beforeend',
            `
<div class="card card-compact w-96 bg-base-100 shadow-xl h-max hover:ring-2 hover:ring-primary hover:scale-105 transition duration-200 cursor-pointer">
    <figure><img src="${it.imgURL}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">
            ${it.title}
        </h2>
        <p>${it.describe}</p>
        <div class="card-actions justify-end">
        <div class="badge badge-secondary h-full mr-auto text-[1.5rem] font-bold p-2 my-auto">${it.price} руб.</div>
            <button class="btn btn-primary btn-outline" onclick="SwitchLike(${it.id})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-6 h-6 data-[like=true]:fill-primary" data-like="${userData.likesGoodsIDs.includes(it.id).toString()}"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            </button>
            <button class="btn btn-primary" onclick="InCart(${it.id})">В корзину</button>
        </div>
    </div>
</div>
`
        );
    });

    countLikes.innerText = userData.likesGoodsIDs.length.toString();
    countBuy.innerText = SumCart().toString();
}

const goods = document.getElementById('goods-lst');
const countLikes = document.getElementById('count-likes');
const countBuy = document.getElementById('count-buy');
LoadData();
Render();
