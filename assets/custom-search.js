(function () {

    class CustomSearch {
        constructor() {
            if (!document.querySelector("#search_results")) {
                console.error("JSON for search is missing, predictive search won't be able to function");
                return;
            }
            this.container = document.querySelector(".custom-search");
            this.resultsContainer = this.container.querySelector("#SearchResults");
            this.emptyContainer = this.container.querySelector("#EmptySearch");
            this.resultsText = this.container.querySelector(".result-found");
            this.emptyText = this.container.querySelector(".result-empty");
            console.log("Custom Search");

            this.buildData();
            this.init();
        }

        async buildData() {
            this.searchData = JSON.parse(document.querySelector("#search_results").innerText);
            this.searchData.search_terms = this.searchData.results.map((t => { let r = t.search_terms.split(","); return r = r.reduce(((t, r) => t.concat(r.trim().replace(" ", "-").toLowerCase())), []), r })).flat();
            this.searchData.search_terms = Array.from(new Set(this.searchData.search_terms));
            this.searchData.products = this.searchData.results.map((t => { let r = []; return t.products.length > 0 && (r = t.products, r = r.map((t => `products/${t}`))), r })).flat();
            this.searchData.products = Array.from(new Set(this.searchData.products));
        }

        getQuery() {
            let currentURL = new URL(window.location.href), searchParams = new URLSearchParams(currentURL.search);
            return searchParams.get("q");
        }

        init() {
            this.query = this.getQuery();
            this.getSearchResults(this.query);
        }

        async buildProducts(e) {
            let frag = document.createDocumentFragment(), fragContent = document.createElement("div");
            fragContent.setAttribute("class", "content");
            let t = e.map((e) => fetch(`${window.Shopify.routes.root}products/${e}?view=search_item`).then((e) => e.text()));
            frag.appendChild(fragContent);
            let r = await Promise.all(t);
            for (let e of r) {
                let t = document.createElement("div");
                (t.innerHTML = e), t.querySelector(".main-search-item") && (fragContent.innerHTML += t.querySelector(".main-search-item").innerHTML);
            }
            return frag;

        }
        async buildArticles(e) {
            let frag = document.createDocumentFragment(), fragContent = document.createElement("div");
            fragContent.setAttribute("class", "content");
            frag.appendChild(fragContent);
            for (let i of e) {
                // fragContent.innerHTML += `<li id="predictive-search-option-" class="predictive-search__list-item" role="option" aria-selected="false"><a href="${i.link}" class="predictive-search__item predictive-search__item--link link link--text" tabindex="-1"><img class="predictive-search__image"  src="//cdn.shopify.com/s/files/1/0680/9331/3298/products/gs_temp-product_01_Desktop_35cb8729-15a9-4bcf-990e-79a456410c79.png?v=1675187158&width=150"  alt="${i.title}"  width="50"  height="44.063647490820074"><div class="predictive-search__item-content"><h3 class="predictive-search__item-heading h5">${i.title}</h3> </div></a></li>`;
                fragContent.innerHTML += `
                <li class="grid__item">
                    <div class="card article-card card--standard article-card__image--medium card--text" style="--ratio-percent: 100%;">
                        <div class="card__inner  color-background-2 gradient" style="--ratio-percent: 100%;">
                            <div class="card__content">
                                <div class="card__information">
                                    <h3 class="card__heading h2">
                                        <a href="${i.link}" class="full-unstyled-link">
                                            ${i.title}
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                `
            }
            return frag;
        }

        showResults(query) {
            this.resultsText.innerHTML = `${window.searchStrings.searchResultFound.replace("{{ terms }}", query)}`;
            this.resultsText.classList.remove("hidden");
            this.emptyText.classList.add("hidden");
            this.emptyContainer.classList.add("hidden");
            this.resultsContainer.classList.remove("hidden");
        }
        hideResults() {
            // this.resultsText.innerHTML = `${window.searchStrings.searchResultFound.replace("{{ terms }}", query)}`;
            this.resultsText.classList.add("hidden");
            this.emptyText.classList.remove("hidden");
            this.emptyContainer.classList.remove("hidden");
            this.resultsContainer.classList.add("hidden");
        }
        async getSearchResults(queryKey) {
            let searchResults = { "products": [], "articles": [] };
            if (this.searchData["search_terms"].indexOf(queryKey) > -1) {
                this.searchData.results.map((({ search_terms: s, products: e, articles: r }) => { s.replaceAll(" ", "-").toLowerCase().trim().indexOf(queryKey) > -1 && e && (searchResults.products.push(...e), r && searchResults.articles.push(...r)) }));
                let productsContent = await this.buildProducts(searchResults.products);
                let articlesContent = await this.buildArticles(searchResults.articles);
                console.log(productsContent);
                console.log(articlesContent);
                this.resultsContainer.insertAdjacentHTML("beforeend", productsContent.querySelector(".content").innerHTML);
                this.resultsContainer.insertAdjacentHTML("beforeend", articlesContent.querySelector(".content").innerHTML);
                this.showResults(queryKey);
                // = `${productsContent.innerHTML} ${articlesContent.innerHTML}`;
            } else {
                this.hideResults()
            }
        }
    }
    new CustomSearch();
    // console.log("Custom Search");
    // let currentURL = new URL(window.location.href);
    // let searchParams = new URLSearchParams(currentURL.search);
    // let queryKey = searchParams.get("q");
    // console.log(queryKey);
    // searchParams.forEach((value, key) => {
    //     console.log(value, key);
    // });
})();