document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {
            name: "Classic Americano",
            price: 4.50,
            image: "./img/americano.jpg",
            description: "Bold, smooth & balanced coffee made with rich espresso and hot water.",
            category: "hot",
            type: "Hot Coffee"
        },
        {
            name: "Classic Cappuccino",
            price: 5.00,
            image: "./img/cappuccino.jpg",
            description: "Rich espresso topped with silky steamed milk and smooth foam.",
            category: "hot",
            type: "Hot Coffee"
        },
        {
            name: "Caramel Macchiato",
            price: 5.50,
            image: "./img/caramel-macchiato.jpg",
            description: "A creamy espresso drink with sweet caramel flavor and smooth milk.",
            category: "hot",
            type: "Hot Coffee"
        },
        {
            name: "Chocolate Mocha",
            price: 5.75,
            image: "./img/chocolatte.jpg",
            description: "A delicious combination of deep chocolate, rich espresso and creamy milk.",
            category: "hot",
            type: "Hot Coffee"
        },
        {
            name: "Cold Brew",
            price: 5.25,
            image: "./img/cold-brew.jpg",
            description: "Slow-brewed coffee with a smooth, chilled and refreshing taste.",
            category: "cold",
            type: "Cold Coffee"
        },
        {
            name: "Espresso",
            price: 3.75,
            image: "./img/espresso.jpg",
            description: "Intense, rich and aromatic espresso made from carefully roasted beans.",
            category: "hot",
            type: "Hot Coffee"
        },
        {
            name: "Classic Latte",
            price: 5.00,
            image: "./img/latte.jpg",
            description: "Smooth espresso blended with creamy steamed milk for a mellow taste.",
            category: "hot",
            type: "Hot Coffee"
        },
        {
            name: "Mocha",
            price: 5.50,
            image: "./img/mocha.jpg",
            description: "Velvety chocolate combined with rich coffee for a sweet and smooth cup.",
            category: "hot",
            type: "Hot Coffee"
        }
    ];


    let cart = JSON.parse(localStorage.getItem("breworaCart")) || [];


    function saveCart() {

        localStorage.setItem(
            "breworaCart",
            JSON.stringify(cart)
        );

        updateCartCount();
    }


    function updateCartCount() {

        const count = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );

        document
            .querySelectorAll(".cart-count")
            .forEach(element => {
                element.textContent = count;
            });
    }


    function showMessage(message) {

        const oldMessage =
            document.getElementById("brewora-message");

        if (oldMessage) {
            oldMessage.remove();
        }


        const messageBox =
            document.createElement("div");

        messageBox.id = "brewora-message";

        messageBox.className =
            "fixed bottom-6 right-6 z-[300] rounded-2xl bg-forest px-6 py-4 text-sm font-semibold text-white shadow-2xl";

        messageBox.textContent = message;

        document.body.appendChild(messageBox);


        setTimeout(() => {

            if (messageBox) {
                messageBox.remove();
            }

        }, 2200);
    }


    function addToCart(product, quantity) {

        const existing =
            cart.find(item => item.name === product.name);


        if (existing) {

            existing.quantity += quantity;

        } else {

            cart.push({
                ...product,
                quantity: quantity
            });

        }


        saveCart();

        showMessage(
            `${product.name} added to cart.`
        );
    }


function openProduct(product) {

    const oldModal =
        document.getElementById("product-modal");

    if (oldModal) {
        oldModal.remove();
    }


    const modal =
        document.createElement("div");

    modal.id = "product-modal";

    modal.className =
        "fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/50 px-3 py-5 backdrop-blur-sm sm:px-5 sm:py-8";


    modal.innerHTML = `

        <div class="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-cream shadow-2xl">

            <button
                id="close-product"
                type="button"
                class="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white text-espresso shadow-md transition-all duration-300 hover:bg-forest hover:text-white sm:right-5 sm:top-5 sm:h-10 sm:w-10">

                <i class="fa-solid fa-xmark"></i>

            </button>


            <div class="grid grid-cols-1 md:grid-cols-2">


                <!-- Product Image -->

                <div class="h-56 w-full sm:h-72 md:h-full">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="block h-full w-full object-cover">

                </div>


                <!-- Product Details -->

                <div class="flex flex-col justify-center p-6 sm:p-8 md:p-10">

                    <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-sage sm:text-xs">
                        ${product.type}
                    </p>


                    <h2 class="mt-2 font-[Playfair_Display] text-2xl font-semibold leading-tight text-espresso sm:mt-3 sm:text-3xl md:text-4xl">
                        ${product.name}
                    </h2>


                    <p class="mt-4 text-sm leading-6 text-espresso/60 sm:mt-5 sm:text-base sm:leading-7">
                        ${product.description}
                    </p>


                    <p class="mt-5 font-[Playfair_Display] text-2xl font-semibold text-forest sm:mt-6 sm:text-3xl">
                        $${product.price.toFixed(2)}
                    </p>


                    <div class="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">

                        <span class="text-sm font-medium text-espresso/60">
                            Quantity
                        </span>


                        <div class="flex items-center rounded-full border border-espresso/10 bg-white">

                            <button
                                id="quantity-minus"
                                type="button"
                                class="flex h-9 w-9 items-center justify-center rounded-full text-lg transition hover:bg-forest hover:text-white sm:h-10 sm:w-10">
                                −
                            </button>


                            <span
                                id="quantity-value"
                                class="w-9 text-center text-sm font-semibold sm:w-10">
                                1
                            </span>


                            <button
                                id="quantity-plus"
                                type="button"
                                class="flex h-9 w-9 items-center justify-center rounded-full text-lg transition hover:bg-forest hover:text-white sm:h-10 sm:w-10">
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        id="modal-add-cart"
                        type="button"
                        class="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#102B20] hover:shadow-lg sm:mt-7 sm:px-6 sm:py-3.5">

                        <i class="fa-solid fa-cart-plus"></i>

                        Add to Cart

                    </button>

                </div>

            </div>

        </div>
    `;


    document.body.appendChild(modal);


    let quantity = 1;


    const quantityValue =
        document.getElementById("quantity-value");


    document
        .getElementById("quantity-plus")
        .addEventListener("click", () => {

            quantity++;

            quantityValue.textContent =
                quantity;

        });


    document
        .getElementById("quantity-minus")
        .addEventListener("click", () => {

            if (quantity > 1) {
                quantity--;
            }

            quantityValue.textContent =
                quantity;

        });


    document
        .getElementById("close-product")
        .addEventListener("click", () => {

            modal.remove();

        });


    document
        .getElementById("modal-add-cart")
        .addEventListener("click", () => {

            addToCart(product, quantity);

            modal.remove();

        });


    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.remove();
        }

    });

}


    function setupProductButtons() {

        document
            .querySelectorAll("[data-add-cart]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const productName =
                        button.dataset.addCart;


                    const product =
                        products.find(
                            item => item.name === productName
                        );


                    if (product) {
                        openProduct(product);
                    }

                });

            });

    }


    function setupFilters() {

        const buttons =
            document.querySelectorAll(".filter-button");

        const cards =
            document.querySelectorAll(".coffee-card");


        if (!buttons.length || !cards.length) {
            return;
        }


        buttons.forEach(button => {

            button.addEventListener("click", () => {

                const filter =
                    button.dataset.filter;


                cards.forEach(card => {

                    if (
                        filter === "all" ||
                        card.dataset.category === filter
                    ) {

                        card.classList.remove("hidden");

                    } else {

                        card.classList.add("hidden");

                    }

                });


                buttons.forEach(item => {

                    item.classList.remove(
                        "bg-forest",
                        "text-white",
                        "font-semibold"
                    );

                    item.classList.add(
                        "border",
                        "border-espresso/10",
                        "bg-white",
                        "text-espresso/70",
                        "font-medium"
                    );

                });


                button.classList.remove(
                    "border",
                    "border-espresso/10",
                    "bg-white",
                    "text-espresso/70",
                    "font-medium"
                );


                button.classList.add(
                    "bg-forest",
                    "text-white",
                    "font-semibold"
                );

            });

        });

    }


    function createSearchResults(
        searchValue,
        resultsBox,
        closeSearch
    ) {

        if (!searchValue) {

            resultsBox.innerHTML = `
                <p class="px-5 py-4 text-sm text-espresso/45">
                    Search for your favorite coffee...
                </p>
            `;

            return;
        }


        const matches =
            products.filter(product => {

                const name =
                    product.name.toLowerCase();

                const description =
                    product.description.toLowerCase();

                const type =
                    product.type.toLowerCase();

                return (
                    name.includes(searchValue) ||
                    description.includes(searchValue) ||
                    type.includes(searchValue)
                );

            });


        if (matches.length === 0) {

            resultsBox.innerHTML = `
                <div class="px-5 py-7 text-center">

                    <i class="fa-solid fa-mug-hot text-xl text-sage"></i>

                    <p class="mt-3 text-sm text-espresso/50">
                        No coffee found.
                    </p>

                </div>
            `;

            return;
        }


        resultsBox.innerHTML =
            matches.map(product => `

                <button
                    type="button"
                    data-search-product="${product.name}"
                    class="flex w-full items-center gap-4 border-b border-espresso/5 px-4 py-3 text-left transition hover:bg-cream">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="h-14 w-14 shrink-0 rounded-xl object-cover">


                    <div class="min-w-0 flex-1">

                        <h3 class="font-[Playfair_Display] text-base font-semibold text-espresso">
                            ${product.name}
                        </h3>

                        <p class="mt-1 truncate text-xs text-espresso/50">
                            ${product.description}
                        </p>

                    </div>


                    <span class="shrink-0 text-sm font-semibold text-forest">
                        $${product.price.toFixed(2)}
                    </span>

                </button>

            `).join("");


        resultsBox
            .querySelectorAll("[data-search-product]")
            .forEach(result => {

                result.addEventListener("click", () => {

                    const productName =
                        result.dataset.searchProduct;


                    const product =
                        products.find(
                            item => item.name === productName
                        );


                    if (product) {

                        closeSearch();

                        openProduct(product);

                    }

                });

            });

    }


    function openHomepageSearch() {

        const oldSearch =
            document.getElementById("homepage-search");

        if (oldSearch) {
            oldSearch.remove();
            return;
        }


        const searchOverlay =
            document.createElement("div");

        searchOverlay.id = "homepage-search";

        searchOverlay.className =
            "fixed inset-0 z-[180] bg-black/40 px-5 py-24 backdrop-blur-sm";


        searchOverlay.innerHTML = `

            <div class="mx-auto w-full max-w-2xl">

                <div class="overflow-hidden rounded-3xl bg-cream shadow-2xl">

                    <div class="flex items-center gap-3 border-b border-espresso/10 bg-white px-5 py-4">

                        <i class="fa-solid fa-magnifying-glass text-forest"></i>


                        <input
                            id="homepageSearchInput"
                            type="search"
                            placeholder="Search coffee..."
                            autocomplete="off"
                            class="min-w-0 flex-1 bg-transparent text-sm text-espresso outline-none placeholder:text-espresso/35">


                        <button
                            id="close-homepage-search"
                            type="button"
                            aria-label="Close search"
                            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-espresso transition hover:bg-forest hover:text-white">

                            <i class="fa-solid fa-xmark"></i>

                        </button>

                    </div>


                    <div
                        id="homepage-search-results"
                        class="max-h-[60vh] overflow-y-auto">

                        <p class="px-5 py-5 text-sm text-espresso/45">
                            Search for your favorite coffee...
                        </p>

                    </div>

                </div>

            </div>
        `;


        document.body.appendChild(searchOverlay);


        const input =
            document.getElementById("homepageSearchInput");

        const results =
            document.getElementById("homepage-search-results");


        function closeSearch() {
            searchOverlay.remove();
        }


        document
            .getElementById("close-homepage-search")
            .addEventListener("click", closeSearch);


        searchOverlay.addEventListener("click", event => {

            if (event.target === searchOverlay) {
                closeSearch();
            }

        });


        input.addEventListener("input", () => {

            const value =
                input.value.toLowerCase().trim();

            createSearchResults(
                value,
                results,
                closeSearch
            );

        });


        input.focus();

    }


    function setupSearch() {

        const homepageButton =
            document.getElementById("searchButton");

        const shopButton =
            document.getElementById("shopSearchButton");


        if (homepageButton) {

            homepageButton.addEventListener(
                "click",
                openHomepageSearch
            );

        }


        if (shopButton) {

            const searchBox =
                document.getElementById("searchBox");

            const searchInput =
                document.getElementById("coffeeSearch");


            if (!searchBox || !searchInput) {
                return;
            }


            let resultsBox =
                document.getElementById("searchResults");


            if (!resultsBox) {

                resultsBox =
                    document.createElement("div");

                resultsBox.id =
                    "searchResults";

                resultsBox.className =
                    "mt-3 overflow-hidden rounded-2xl border border-espresso/10 bg-white shadow-lg";

                searchBox.appendChild(resultsBox);

            }


            shopButton.addEventListener("click", () => {

                searchBox.classList.toggle("hidden");


                if (!searchBox.classList.contains("hidden")) {

                    searchInput.value = "";

                    resultsBox.innerHTML = `
                        <p class="px-5 py-4 text-sm text-espresso/45">
                            Search for your favorite coffee...
                        </p>
                    `;

                    searchInput.focus();

                } else {

                    resultsBox.innerHTML = "";

                }

            });


            searchInput.addEventListener("input", () => {

                const value =
                    searchInput.value.toLowerCase().trim();


                createSearchResults(
                    value,
                    resultsBox,
                    () => {

                        searchBox.classList.add("hidden");

                        searchInput.value = "";

                        resultsBox.innerHTML = "";

                    }
                );

            });

        }

    }


    function openCart() {

        const oldCart =
            document.getElementById("cart-panel");


        if (oldCart) {

            oldCart.remove();

            return;
        }


        const panel =
            document.createElement("div");


        panel.id = "cart-panel";

        panel.className =
            "fixed inset-0 z-[250] bg-black/40 backdrop-blur-sm";


        panel.innerHTML = `

            <div class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">

                <div class="flex items-center justify-between border-b border-espresso/10 px-6 py-5">

                    <div>

                        <p class="text-xs font-bold uppercase tracking-[0.2em] text-sage">
                            Your Bag
                        </p>

                        <h2 class="mt-1 font-[Playfair_Display] text-2xl font-semibold">
                            Shopping Cart
                        </h2>

                    </div>


                    <button
                        id="close-cart"
                        type="button"
                        class="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:bg-forest hover:text-white">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                </div>


                <div
                    id="cart-items"
                    class="flex-1 overflow-y-auto px-6 py-6">
                </div>


                <div class="border-t border-espresso/10 px-6 py-6">

                    <div class="flex items-center justify-between">

                        <span class="text-sm text-espresso/60">
                            Total
                        </span>


                        <span
                            id="cart-total"
                            class="font-[Playfair_Display] text-2xl font-semibold text-forest">

                            $0.00

                        </span>

                    </div>


                    <button
                        id="checkout"
                        type="button"
                        class="mt-5 w-full rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#102B20]">

                        Checkout

                    </button>

                </div>

            </div>
        `;


        document.body.appendChild(panel);


        renderCart();


        document
            .getElementById("close-cart")
            .addEventListener("click", () => {

                panel.remove();

            });


        panel.addEventListener("click", event => {

            if (event.target === panel) {
                panel.remove();
            }

        });


        document
            .getElementById("checkout")
            .addEventListener("click", () => {

                if (cart.length === 0) {

                    showMessage(
                        "Your cart is empty."
                    );

                } else {

                    openCheckout();

                }

            });

    }


    function openCheckout() {

        const oldCheckout =
            document.getElementById("checkout-modal");

        if (oldCheckout) {
            oldCheckout.remove();
        }


        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });


        const checkoutModal =
            document.createElement("div");


        checkoutModal.id =
            "checkout-modal";


        checkoutModal.className =
            "fixed inset-0 z-[280] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm";


        checkoutModal.innerHTML = `

            <div class="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-cream shadow-2xl">

                <button
                    id="close-checkout"
                    type="button"
                    class="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-espresso shadow-md transition hover:bg-forest hover:text-white">

                    <i class="fa-solid fa-xmark"></i>

                </button>


                <div class="grid md:grid-cols-2">


                    <div class="p-7 sm:p-10">

                        <p class="text-xs font-bold uppercase tracking-[0.2em] text-sage">
                            Brewora
                        </p>


                        <h2 class="mt-2 font-[Playfair_Display] text-3xl font-semibold text-espresso">
                            Checkout
                        </h2>


                        <p class="mt-2 text-sm text-espresso/55">
                            Complete your details to place your order.
                        </p>


                        <form id="checkout-form" class="mt-7 space-y-5">


                            <div>

                                <label
                                    for="checkout-name"
                                    class="mb-2 block text-sm font-medium text-espresso">
                                    Full Name
                                </label>

                                <input
                                    id="checkout-name"
                                    type="text"
                                    required
                                    placeholder="Enter your full name"
                                    class="w-full rounded-2xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-forest">

                            </div>


                            <div>

                                <label
                                    for="checkout-email"
                                    class="mb-2 block text-sm font-medium text-espresso">
                                    Email Address
                                </label>

                                <input
                                    id="checkout-email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    class="w-full rounded-2xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-forest">

                            </div>


                            <div>

                                <label
                                    for="checkout-phone"
                                    class="mb-2 block text-sm font-medium text-espresso">
                                    Phone Number
                                </label>

                                <input
                                    id="checkout-phone"
                                    type="tel"
                                    required
                                    placeholder="03XX XXXXXXX"
                                    class="w-full rounded-2xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-forest">

                            </div>


                            <div>

                                <label
                                    for="checkout-address"
                                    class="mb-2 block text-sm font-medium text-espresso">
                                    Delivery Address
                                </label>

                                <textarea
                                    id="checkout-address"
                                    rows="3"
                                    required
                                    placeholder="Enter your delivery address"
                                    class="w-full resize-none rounded-2xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-forest"></textarea>

                            </div>


                            <div>

                                <label
                                    for="checkout-payment"
                                    class="mb-2 block text-sm font-medium text-espresso">
                                    Payment Method
                                </label>

                                <select
                                    id="checkout-payment"
                                    class="w-full rounded-2xl border border-espresso/10 bg-white px-4 py-3 text-sm text-espresso outline-none transition focus:border-forest">

                                    <option value="Cash on Delivery">
                                        Cash on Delivery
                                    </option>

                                    <option value="Credit/Debit Card">
                                        Credit / Debit Card
                                    </option>

                                </select>

                            </div>


                            <button
                                type="submit"
                                class="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#102B20] hover:shadow-lg">

                                <i class="fa-solid fa-check"></i>

                                Place Order

                            </button>


                        </form>

                    </div>


                    <div class="border-t border-espresso/10 bg-white p-7 md:border-l md:border-t-0 sm:p-10">

                        <p class="text-xs font-bold uppercase tracking-[0.2em] text-sage">
                            Order Summary
                        </p>


                        <h3 class="mt-2 font-[Playfair_Display] text-2xl font-semibold text-espresso">
                            Your Coffee
                        </h3>


                        <div class="mt-7 space-y-5">

                            ${cart.map(item => `

                                <div class="flex gap-4">

                                    <img
                                        src="${item.image}"
                                        alt="${item.name}"
                                        class="h-16 w-16 rounded-xl object-cover">

                                    <div class="min-w-0 flex-1">

                                        <div class="flex justify-between gap-3">

                                            <h4 class="font-[Playfair_Display] text-sm font-semibold text-espresso">
                                                ${item.name}
                                            </h4>

                                            <span class="shrink-0 text-sm font-semibold text-forest">
                                                $${(item.price * item.quantity).toFixed(2)}
                                            </span>

                                        </div>

                                        <p class="mt-1 text-xs text-espresso/50">
                                            Quantity: ${item.quantity}
                                        </p>

                                    </div>

                                </div>

                            `).join("")}

                        </div>


                        <div class="mt-8 border-t border-espresso/10 pt-6">

                            <div class="flex items-center justify-between">

                                <span class="text-sm text-espresso/60">
                                    Subtotal
                                </span>

                                <span class="font-semibold text-espresso">
                                    $${total.toFixed(2)}
                                </span>

                            </div>


                            <div class="mt-3 flex items-center justify-between">

                                <span class="text-sm text-espresso/60">
                                    Delivery
                                </span>

                                <span class="text-sm font-semibold text-forest">
                                    Free
                                </span>

                            </div>


                            <div class="mt-5 flex items-center justify-between border-t border-espresso/10 pt-5">

                                <span class="font-medium text-espresso">
                                    Total
                                </span>

                                <span class="font-[Playfair_Display] text-2xl font-semibold text-forest">
                                    $${total.toFixed(2)}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        `;


        document.body.appendChild(checkoutModal);


        document
            .getElementById("close-checkout")
            .addEventListener("click", () => {

                checkoutModal.remove();

            });


        checkoutModal.addEventListener("click", event => {

            if (event.target === checkoutModal) {
                checkoutModal.remove();
            }

        });


        document
            .getElementById("checkout-form")
            .addEventListener("submit", event => {

                event.preventDefault();


                const name =
                    document.getElementById("checkout-name").value.trim();

                const email =
                    document.getElementById("checkout-email").value.trim();

                const phone =
                    document.getElementById("checkout-phone").value.trim();

                const address =
                    document.getElementById("checkout-address").value.trim();

                const payment =
                    document.getElementById("checkout-payment").value;


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !address
                ) {

                    showMessage(
                        "Please fill in all required fields."
                    );

                    return;
                }


                const orderNumber =
                    "BRW-" +
                    Math.floor(
                        100000 + Math.random() * 900000
                    );


                checkoutModal.remove();


                const cartPanel =
                    document.getElementById("cart-panel");

                if (cartPanel) {
                    cartPanel.remove();
                }


                cart = [];

                saveCart();


                showOrderSuccess(
                    name,
                    orderNumber,
                    total,
                    payment
                );

            });

    }


    function showOrderSuccess(
        name,
        orderNumber,
        total,
        payment
    ) {

        const oldSuccess =
            document.getElementById("order-success");

        if (oldSuccess) {
            oldSuccess.remove();
        }


        const successModal =
            document.createElement("div");


        successModal.id =
            "order-success";


        successModal.className =
            "fixed inset-0 z-[300] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm";


        successModal.innerHTML = `

            <div class="w-full max-w-md rounded-3xl bg-cream p-8 text-center shadow-2xl sm:p-10">

                <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage/15 text-3xl text-forest">

                    <i class="fa-solid fa-check"></i>

                </div>


                <p class="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-sage">
                    Order Confirmed
                </p>


                <h2 class="mt-2 font-[Playfair_Display] text-3xl font-semibold text-espresso">
                    Thank You, ${name}!
                </h2>


                <p class="mt-4 leading-6 text-espresso/60">
                    Your Brewora coffee order has been placed successfully.
                </p>


                <div class="mt-7 rounded-2xl bg-white p-5 text-left">

                    <div class="flex items-center justify-between">

                        <span class="text-sm text-espresso/50">
                            Order Number
                        </span>

                        <span class="text-sm font-semibold text-forest">
                            ${orderNumber}
                        </span>

                    </div>


                    <div class="mt-4 flex items-center justify-between">

                        <span class="text-sm text-espresso/50">
                            Payment
                        </span>

                        <span class="text-sm font-semibold text-espresso">
                            ${payment}
                        </span>

                    </div>


                    <div class="mt-4 flex items-center justify-between border-t border-espresso/10 pt-4">

                        <span class="text-sm text-espresso/50">
                            Total
                        </span>

                        <span class="font-[Playfair_Display] text-xl font-semibold text-forest">
                            $${total.toFixed(2)}
                        </span>

                    </div>

                </div>


                <button
                    id="continue-shopping"
                    type="button"
                    class="mt-7 w-full rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#102B20]">

                    Continue Shopping

                </button>

            </div>
        `;


        document.body.appendChild(successModal);


        document
            .getElementById("continue-shopping")
            .addEventListener("click", () => {

                successModal.remove();

            });

    }


    function setupCart() {

        document
            .querySelectorAll(".fa-cart-shopping")
            .forEach(icon => {

                const cartLink =
                    icon.closest("a");


                if (!cartLink) {
                    return;
                }


                cartLink.addEventListener("click", event => {

                    event.preventDefault();

                    openCart();

                });

            });

    }


    function renderCart() {

        const container =
            document.getElementById("cart-items");

        const totalElement =
            document.getElementById("cart-total");


        if (!container || !totalElement) {
            return;
        }


        if (cart.length === 0) {

            container.innerHTML = `

                <div class="py-16 text-center">

                    <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-2xl text-forest">

                        <i class="fa-solid fa-mug-hot"></i>

                    </div>


                    <h3 class="mt-5 font-[Playfair_Display] text-2xl font-semibold">
                        Your cart is empty
                    </h3>


                    <p class="mt-2 text-sm text-espresso/55">
                        Add a coffee you love and it will appear here.
                    </p>

                </div>
            `;


            totalElement.textContent =
                "$0.00";

            return;
        }


        let total = 0;


        container.innerHTML = "";


        cart.forEach((item, index) => {

            total +=
                item.price * item.quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "mb-5 flex gap-4 border-b border-espresso/10 pb-5";


            itemElement.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="h-20 w-20 rounded-xl object-cover">


                <div class="min-w-0 flex-1">

                    <div class="flex items-start justify-between gap-3">

                        <div>

                            <h3 class="font-[Playfair_Display] font-semibold">
                                ${item.name}
                            </h3>

                            <p class="mt-1 text-sm font-semibold text-forest">
                                $${item.price.toFixed(2)}
                            </p>

                        </div>


                        <button
                            type="button"
                            data-remove="${index}"
                            class="text-espresso/40 transition hover:text-red-600">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>


                    <div class="mt-3 flex items-center gap-3">

                        <button
                            type="button"
                            data-minus="${index}"
                            class="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/10 bg-white">

                            −

                        </button>


                        <span class="min-w-5 text-center text-sm font-semibold">
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            data-plus="${index}"
                            class="flex h-8 w-8 items-center justify-center rounded-full border border-espresso/10 bg-white">

                            +

                        </button>

                    </div>

                </div>
            `;


            container.appendChild(itemElement);

        });


        totalElement.textContent =
            `$${total.toFixed(2)}`;


        container
            .querySelectorAll("[data-plus]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.plus);

                    cart[index].quantity++;

                    saveCart();

                    renderCart();

                });

            });


        container
            .querySelectorAll("[data-minus]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.minus);


                    if (cart[index].quantity > 1) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }


                    saveCart();

                    renderCart();

                });

            });


        container
            .querySelectorAll("[data-remove]")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.remove);

                    cart.splice(index, 1);

                    saveCart();

                    renderCart();

                });

            });

    }


    function setupMobileMenu() {

        const button =
            document.getElementById("mobileMenuButton");

        const menu =
            document.getElementById("mobileMenu");


        if (!button || !menu) {
            return;
        }


        button.addEventListener("click", () => {

            menu.classList.toggle("hidden");


            const icon =
                button.querySelector("i");


            if (menu.classList.contains("hidden")) {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            } else {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            }

        });

    }


    function setupNewsletter() {

        const form =
            document.getElementById("newsletterForm");

        const input =
            document.getElementById("emailInput");

        const message =
            document.getElementById("newsletterMessage");


        if (!form || !input || !message) {
            return;
        }


        form.addEventListener("submit", event => {

            event.preventDefault();


            if (!input.value.trim()) {

                message.textContent =
                    "Please enter your email.";

                message.classList.remove("hidden");

                return;
            }


            message.textContent =
                "Thank you! You are now subscribed to Brewora.";

            message.classList.remove("hidden");

            form.reset();

        });

    }


    document
        .querySelectorAll(".coffee-card")
        .forEach(card => {

            card.dataset.category =
                card.dataset.category || "hot";

        });


    setupProductButtons();

    setupFilters();

    setupSearch();

    setupCart();

    setupMobileMenu();

    setupNewsletter();

    updateCartCount();

});