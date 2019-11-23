const data = require("./data.js");

interface data {
    categories: object[];
    games: object[];
    merchants: object;
    merchantsCurrencies: object[];
}

export class Games {
    public categories: object[];
    public games: object[];
    public merchants: any;
    public merchantsCurrencies: object[];

    constructor(data: data) {
        this.categories = data.categories;
        this.games = data.games;
        this.merchants = data.merchants;
        this.merchantsCurrencies = data.merchantsCurrencies;
        console.log(this.getSupportMerchantsByCurr("EUR"));
    }

    public getTagsFromCategories(): string[] {
        let tagsList: any = this.categories.reduce((arr: any[], el: any) => {
            if (el.Tags) {
                arr.push(...el.Tags);
            }
            return arr;
        }, []);
        tagsList = Array.from(new Set(tagsList));
        return tagsList;
    }

    public getCategoriesByTag(tagName: string): object[] {
        let categoriesList: any = [];
        this.categories.forEach((el: any) => {
            if (el.Tags.includes(tagName)) {
                categoriesList.push(el);
            }
        });
        return categoriesList;
    }

    public getNameCategoriesByLang(lang: string): string[] {
        let nameCategorisList: any = [];
        this.categories.forEach((el: any) => {
            nameCategorisList.push(el.Name[lang]);
        });
        return nameCategorisList;
    }

    public getGamesWithDemo(): object[] {
        let gamesList: object[] = this.games.filter((el: any) => {
            return !!el.hasDemo;
        });
        return gamesList;
    }

    public getGamesByMerchant(merchantID: string | number): object[] {
        let gamesList: object[] = this.games.filter((el: any) => {
            return el.MerchantID == merchantID;
        });
        return gamesList;
    }

    public getSupportMerchantsByCurr(currCod: string | number): object[] {
        let merchantsList: object[] = [];
        let _tempList: object[] = this.merchantsCurrencies.filter((el: any) => {
                return el.Currencies.includes(currCod);
            }
        );
        _tempList.forEach((el: any) => { 
            if(this.merchants[el.IDMerchant]) {
                 merchantsList.push(this.merchants[el.IDMerchant]);
            }
        });
        return merchantsList;
    }
}

const test = new Games(data);
