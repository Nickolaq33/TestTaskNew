"use strict";
exports.__esModule = true;
var data = require("./data.js");
var Games = /** @class */ (function () {
    function Games(data) {
        this.categories = data.categories;
        this.games = data.games;
        this.merchants = data.merchants;
        this.merchantsCurrencies = data.merchantsCurrencies;
        console.log(this.getSupportMerchantsByCurr("EUR"));
    }
    Games.prototype.getTagsFromCategories = function () {
        var tagsList = this.categories.reduce(function (arr, el) {
            if (el.Tags) {
                arr.push.apply(arr, el.Tags);
            }
            return arr;
        }, []);
        tagsList = Array.from(new Set(tagsList));
        return tagsList;
    };
    Games.prototype.getCategoriesByTag = function (tagName) {
        var categoriesList = [];
        this.categories.forEach(function (el) {
            if (el.Tags.includes(tagName)) {
                categoriesList.push(el);
            }
        });
        return categoriesList;
    };
    Games.prototype.getNameCategoriesByLang = function (lang) {
        var nameCategorisList = [];
        this.categories.forEach(function (el) {
            nameCategorisList.push(el.Name[lang]);
        });
        return nameCategorisList;
    };
    Games.prototype.getGamesWithDemo = function () {
        var gamesList = this.games.filter(function (el) {
            return !!el.hasDemo;
        });
        return gamesList;
    };
    Games.prototype.getGamesByMerchant = function (merchantID) {
        var gamesList = this.games.filter(function (el) {
            return el.MerchantID == merchantID;
        });
        return gamesList;
    };
    Games.prototype.getSupportMerchantsByCurr = function (currCod) {
        var _this = this;
        var merchantsList = [];
        var _tempList = this.merchantsCurrencies.filter(function (el) {
            return el.Currencies.includes(currCod);
        });
        _tempList.forEach(function (el) {
            if (_this.merchants[el.IDMerchant]) {
                merchantsList.push(_this.merchants[el.IDMerchant]);
            }
        });
        return merchantsList;
    };
    return Games;
}());
exports.Games = Games;
var test = new Games(data);
