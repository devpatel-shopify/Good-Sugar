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
            this.setQuery();
            this.buildData();
            this.init();

        }

        async buildData() {
            this.searchData = JSON.parse(document.querySelector("#search_results").innerText);
            this.searchData.search_terms = this.searchData.results.map((t => { let r = t.search_terms.split(","); return r = r.reduce(((t, r) => t.concat(r.trim().replace(" ", "-").toLowerCase())), []), r })).flat();
            this.searchData.search_terms = (Array.from(new Set(this.searchData.search_terms))).toString();
            this.searchData.products = this.searchData.results.map((t => { let r = []; return t.products.length > 0 && (r = t.products, r = r.map((t => `products/${t}`))), r })).flat();
            this.searchData.products = Array.from(new Set(this.searchData.products));
        }

        setQuery() {
            let currentURL = new URL(window.location.href), searchParams = new URLSearchParams(currentURL.search);
            this.originalQuery = searchParams.get("q");
            this.query = searchParams.get("q").replaceAll(" ", "-").toLowerCase().trim();
        }

        init() {
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
                fragContent.innerHTML += `<li class="grid__item"><div class="card article-card card--standard article-card__image--medium card--text ratio" style="--ratio-percent: 100%;"><div class="card__inner  color-background-2 gradient" style="--ratio-percent: 100%;"><div class="card__content center"><div class="card__information"><h3 class="card__heading h4"><a href="${i.link}" class="article-link full-unstyled-link">${i.title}</a></h3></div></div></div></div></li>`;
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
            this.resultsText.classList.add("hidden");
            this.emptyText.classList.remove("hidden");
            this.emptyContainer.classList.remove("hidden");
            this.resultsContainer.classList.add("hidden");
        }
        async getSearchResults(queryKey) {
            let searchResults = { "products": [], "articles": [] };
            if (this.searchData["search_terms"].indexOf(queryKey) > -1) {
                this.searchData.results.map((({ search_terms: s, products: e, articles: r }) => { s.replaceAll(" ", "-").toLowerCase().trim().indexOf(queryKey) > -1 && e && (searchResults.products.push(...e), r && searchResults.articles.push(...r)) }));
                let productsArray = Array.from(new Set(searchResults.products)), articlesArray = Array.from(new Set(searchResults.articles)).filter((value, index, self) => index === self.findIndex((t) => (t.title === value.title && t.link === value.link)));
              console.log(articlesArray);
                let searchCount = productsArray.length + articlesArray.length;
                document.title = `Search: ${searchCount} results found for "${this.query} - Good Sugar"`;


                let productsContent = await this.buildProducts(productsArray);
                let articlesContent = await this.buildArticles(articlesArray);
                this.resultsContainer.insertAdjacentHTML("beforeend", productsContent.querySelector(".content").innerHTML);
                this.resultsContainer.insertAdjacentHTML("beforeend", articlesContent.querySelector(".content").innerHTML);
                this.showResults(this.originalQuery);
            } else {
                this.hideResults()
            }

            // Check if array as same objects

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