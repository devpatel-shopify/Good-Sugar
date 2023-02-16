class PredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.cachedResults = {};
    this.input = this.querySelector('input[type="search"]');
    this.predictiveSearchResults = this.querySelector('[data-predictive-search]');
    this.isOpen = false;
    this.buildData();
    this.setupEventListeners();
  }

  async buildData() {
    let _this = this;
    if (!document.querySelector("#search_results")) {
      console.error("JSON for search is missing, predictive search won't be able to function");
      return;
    }
    this.searchData = JSON.parse(document.querySelector("#search_results").innerText);
    this.searchData.search_terms = this.searchData.results.map((t => { let r = t.search_terms.split(","); return r = r.reduce(((t, r) => t.concat(r.trim().replace(" ", "-").toLowerCase())), []), r })).flat();
    this.searchData.search_terms = Array.from(new Set(this.searchData.search_terms));
    this.searchData.products = this.searchData.results.map((t => { let r = []; return t.products.length > 0 && (r = t.products, r = r.map((t => `products/${t}`))), r })).flat();
    this.searchData.products = Array.from(new Set(this.searchData.products));
  }

  setupEventListeners() {
    const form = this.querySelector('form.search');
    form.addEventListener('submit', this.onFormSubmit.bind(this));

    this.input.addEventListener('input', debounce((event) => {
      this.onChange(event);
    }, 300).bind(this));
    this.input.addEventListener('focus', this.onFocus.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.addEventListener('keyup', this.onKeyup.bind(this));
    this.addEventListener('keydown', this.onKeydown.bind(this));
  }

  getQuery() {
    return this.input.value.trim();
  }

  onChange() {
    this.debounceTime = false;
    const searchTerm = this.getQuery();

    if (!searchTerm.length) {
      this.close(true);
      return;
    }
    if (this.debounceTime) clearTimeout(this.debounceTime);
    let _this = this;
    setTimeout(() => _this.getSearchResults(searchTerm), 750);
    // this.getSearchResults(searchTerm);
  }

  onFormSubmit(event) {
    if (!this.getQuery().length || this.querySelector('[aria-selected="true"] a')) event.preventDefault();
  }

  onFocus() {
    const searchTerm = this.getQuery();

    if (!searchTerm.length) return;

    if (this.getAttribute('results') === 'true') {
      this.open();
    } else {
      this.getSearchResults(searchTerm);
    }
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  onKeyup(event) {
    if (!this.getQuery().length) this.close(true);
    event.preventDefault();

    switch (event.code) {
      case 'ArrowUp':
        this.switchOption('up')
        break;
      case 'ArrowDown':
        this.switchOption('down');
        break;
      case 'Enter':
        this.selectOption();
        break;
    }
  }

  onKeydown(event) {
    // Prevent the cursor from moving in the input when using the up and down arrow keys
    if (
      event.code === 'ArrowUp' ||
      event.code === 'ArrowDown'
    ) {
      event.preventDefault();
    }
  }

  switchOption(direction) {
    if (!this.getAttribute('open')) return;

    const moveUp = direction === 'up';
    const selectedElement = this.querySelector('[aria-selected="true"]');
    const allElements = this.querySelectorAll('li');
    let activeElement = this.querySelector('li');

    if (moveUp && !selectedElement) return;

    this.statusElement.textContent = '';

    if (!moveUp && selectedElement) {
      activeElement = selectedElement.nextElementSibling || allElements[0];
    } else if (moveUp) {
      activeElement = selectedElement.previousElementSibling || allElements[allElements.length - 1];
    }

    if (activeElement === selectedElement) return;

    activeElement.setAttribute('aria-selected', true);
    if (selectedElement) selectedElement.setAttribute('aria-selected', false);

    this.setLiveRegionText(activeElement.textContent);
    this.input.setAttribute('aria-activedescendant', activeElement.id);
  }

  selectOption() {
    const selectedProduct = this.querySelector('[aria-selected="true"] a, [aria-selected="true"] button');

    if (selectedProduct) selectedProduct.click();
  }

  async getSearchResults(searchTerm) {
    let searchResults = { "products": [], "articles": [] };
    this.searchCount = 0;
    let frag = document.createDocumentFragment(), fetchedContent = document.createElement('div');
    async function _buildProductItems(e) { let t = e.map((e => fetch(`${window.Shopify.routes.root}products/${e}?view=search_item`).then((e => e.text())))), r = await Promise.all(t); frag.appendChild(fetchedContent); for (let e of r) { let t = document.createElement("div"); t.innerHTML = e, t.querySelector(".search-item-wrapper") && (fetchedContent.innerHTML += t.querySelector(".search-item-wrapper").innerHTML) } }
    async function _buildArticleItems(e) { for (let i of e) fetchedContent.innerHTML += `<li id="predictive-search-option-" class="predictive-search__list-item" role="option" aria-selected="false"><a href="${i.link}" class="predictive-search__item predictive-search__item--link link link--text" tabindex="-1"><img class="predictive-search__image"  src="//cdn.shopify.com/s/files/1/0680/9331/3298/products/gs_temp-product_01_Desktop_35cb8729-15a9-4bcf-990e-79a456410c79.png?v=1675187158&width=150"  alt="${i.title}"  width="50"  height="44.063647490820074"><div class="predictive-search__item-content"><h3 class="predictive-search__item-heading h5">${i.title}</h3> </div></a></li>` }

    if (!document.querySelector("#search_results")) {
      return;
    }


    const queryKey = searchTerm.replace(" ", "-").toLowerCase();
    // this.setLiveRegionLoadingState();

    if (this.cachedResults[queryKey]) {
      this.renderSearchResults(this.cachedResults[queryKey]);
      return;
    }
    if (this.searchData["search_terms"].indexOf(queryKey) > -1) {
      this.searchData.results.map((({ search_terms: s, products: e, articles: r }) => { s.replaceAll(" ", "-").toLowerCase().trim().indexOf(queryKey) > -1 && e && (searchResults.products.push(...e), r && searchResults.articles.push(...r)) }));
      this.searchCount = searchResults.products.length + searchResults.articles.length;
      console.log(this.searchCount);
      await _buildProductItems(searchResults.products);
      await _buildArticleItems(searchResults.articles);
      fetchedContent.innerHTML += `<li id="predictive-search-option-search-keywords" class="predictive-search__list-item more-result" role="option"><button class="predictive-search__item predictive-search__item--term link link--text h5 animate-arrow" tabindex="-1">${window.searchStrings.searchFor.replace("{{ terms }}", queryKey)}<svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" class="icon icon-arrow" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor"></path></svg></button></li> `;
      this.cachedResults[queryKey] = `<ul id="predictive-search-results-list" class="predictive-search__results-list list-unstyled" role="listbox" aria-labelledby="predictive-search-products">${fetchedContent.innerHTML}</ul>`;
      this.renderSearchResults(`<ul id="predictive-search-results-list" class="predictive-search__results-list list-unstyled" role="listbox" aria-labelledby="predictive-search-products">${fetchedContent.innerHTML}</ul>`);
    }
    // fetch(`${routes.predictive_search_url}?q=${encodeURIComponent(searchTerm)}&${encodeURIComponent('resources[type]')}=product&${encodeURIComponent('resources[limit]')}=4&section_id=predictive-search`)
    //   .then((response) => {
    //     if (!response.ok) {
    //       var error = new Error(response.status);
    //       this.close();
    //       throw error;
    //     }

    //     return response.text();
    //   })
    //   .then((text) => {
    //     const resultsMarkup = new DOMParser().parseFromString(text, 'text/html').querySelector('#shopify-section-predictive-search').innerHTML;
    //     this.cachedResults[queryKey] = resultsMarkup;
    //     this.renderSearchResults(resultsMarkup);
    //   })
    //   .catch((error) => {
    //     this.close();
    //     throw error;
    //   });
  }

  setLiveRegionLoadingState() {
    this.statusElement = this.statusElement || this.querySelector('.predictive-search-status');
    this.loadingText = this.loadingText || this.getAttribute('data-loading-text');

    this.setLiveRegionText(this.loadingText);
    this.setAttribute('loading', true);
  }

  setLiveRegionText(statusText) {
    this.statusElement.setAttribute('aria-hidden', 'false');
    this.statusElement.textContent = statusText;

    setTimeout(() => {
      this.statusElement.setAttribute('aria-hidden', 'true');
    }, 1000);
  }

  renderSearchResults(resultsMarkup) {
    this.predictiveSearchResults.innerHTML = resultsMarkup;
    this.predictiveSearchResults.querySelectorAll(".predictive-search__list-item:not(.more-result)").forEach((element, index) => index > 5 && element.remove());
    this.setAttribute('results', true);

    // this.setLiveRegionResults();
    this.open();
  }

  setLiveRegionResults() {
    this.removeAttribute('loading');
    this.setLiveRegionText(this.querySelector('[data-predictive-search-live-region-count-value]').textContent);
  }

  getResultsMaxHeight() {
    this.resultsMaxHeight = window.innerHeight - document.getElementById('shopify-section-header').getBoundingClientRect().bottom;
    return this.resultsMaxHeight;
  }

  open() {
    this.predictiveSearchResults.style.maxHeight = this.resultsMaxHeight || `${this.getResultsMaxHeight()}px`;
    this.setAttribute('open', true);
    this.input.setAttribute('aria-expanded', true);
    this.isOpen = true;
  }

  close(clearSearchTerm = false) {
    if (clearSearchTerm) {
      this.input.value = '';
      this.removeAttribute('results');
    }

    const selected = this.querySelector('[aria-selected="true"]');

    if (selected) selected.setAttribute('aria-selected', false);

    this.input.setAttribute('aria-activedescendant', '');
    this.removeAttribute('open');
    this.input.setAttribute('aria-expanded', false);
    this.resultsMaxHeight = false
    this.predictiveSearchResults.removeAttribute('style');

    this.isOpen = false;
  }
}

customElements.define('predictive-search', PredictiveSearch);
