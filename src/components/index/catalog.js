function initCatalog() {
    const catalog = {
        items: [],
        container: null,
        basket: null,
        url: 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json',
        init(basket) {
            this.container = document.querySelector('#catalog');
            this.basket = basket;

            //async
            this._get(this.url)
            .then(catalog => {
                this.items = catalog;
                this._render();
                this._handleEvents();
            });
        },

        _get(url) {
            return fetch(url).then(d => d.json()); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
        },
        _render() {
            let htmlStr = '';

            this.items.forEach((item, i) => {
                htmlStr += renderCatalogTemplate(item, i);
            });
            this.container.innerHTML = htmlStr;
        },

        _handleEvents() {
            this.container.addEventListener('click', event => {
                if(event.target.name == 'add') {
                    // console.log('КУПЛЕНО!')
                    let id = event.target.dataset.id; //from data-id
                    let item = this.items.find(el => el.productId == id);
                    basket.add(item)
                }
            });
        }
    };

    return catalog;
}

function renderCatalogTemplate(item) {
    return `
        <div class="featuredItem">
            <div class="featuredImgWrap">
                <div class="featuredBuy">
                    <button 
                        name="add"
                        data-id="${item.productId}"
                    >
                        <img src="../src/assets/images/addToCart.png" alt="">
                        Add to Cart
                    </button>
                </div>
                <img class="featuredProduct" src="${item.productImg}" alt="">
            </div>
            <div class="featuredNameAndPrice">
                <div class="featuredItemName">
                    ${item.productName}
                </div>
                <div class="featuredItemPrice">$${item.productPrice}</div>
            </div>
        </div>
    `
}
class Catalog {
    items = []
    container = null
    basket = null
    url = 'https://raw.githubusercontent.com/kellolo/static/master/JSON/catalog.json'

    constructor(basket) {
        this.container = document.querySelector('#catalog');
        this.basket = basket;

        //async
        this._get(this.url)
        .then(catalog => {
            this.items = catalog;
            this._render();
            this._handleEvents();
        });
    }
    
    async _get(url) {
        const d = await fetch(url);
        return await d.json(); //сделает запрос за джейсоном, дождется ответа и преобразует джейсон в объект, который вернется из данного метода
    }

    _render() {
        let htmlStr = '';

        this.items.forEach((item, i) => {
            htmlStr += this.renderCatalogTemplate(item, i);
        });
        this.container.innerHTML = htmlStr;
    }

    _handleEvents() {
        this.container.addEventListener('click', event => {
            if(event.target.name == 'add') {
                // console.log('КУПЛЕНО!')
                let id = event.target.dataset.id; //from data-id
                let item = this.items.find(el => el.productId == id);
                basket.add(item)
            }
        });
    }
    renderCatalogTemplate(item) {
        return `
            <div class="featuredItem">
                <div class="featuredImgWrap">
                    <div class="featuredBuy">
                        <button 
                            name="add"
                            data-id="${item.productId}"
                        >
                            <img src="../src/assets/images/addToCart.png" alt="">
                            Add to Cart
                        </button>
                    </div>
                    <img class="featuredProduct" src="${item.productImg}" alt="">
                </div>
                <div class="featuredNameAndPrice">
                    <div class="featuredItemName">
                        ${item.productName}
                    </div>
                    <div class="featuredItemPrice">$${item.productPrice}</div>
                </div>
            </div>
        `
    }
}
const catalog = new Catalog(basket)