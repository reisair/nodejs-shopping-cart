const Product = require("../models/product");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopping");

const products = [
    new Product({
        imagePath: "http://daxushequ.com/data/out/43/img59910826.jpg",
        title: "Dota 2",
        description: "MMORPG",
        price: 12
    }),
    new Product({
        imagePath: "https://bnetproduct-a.akamaihd.net//79/5c8570d050e162e091b699bea4c7bcd8-battle-for-azeroth-en-clipped-1200x536.png",
        title: "World of Warcraft - Battle for Azeroth",
        description: "MMORPG",
        price: 40
    }),
    new Product({
        imagePath: "http://nakleykiavto.ru.images.1c-bitrix-cdn.ru/upload/iblock/a46/a461ff51dc0fac0dcd8a21db9196426a.png?1448436942327680",
        title: "World of Warcraft",
        description: "MMORPG",
        price: 20
    })
];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}