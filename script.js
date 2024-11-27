document.addEventListener("DOMContentLoaded", function() {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartCount();
        console.log(cart); // Muestra el contenido del carrito en la consola
    }

    function updateCartCount() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalQuantity;
    }

    // Mostrar el contenido del carrito
    const cartButton = document.querySelector('#cart button');
    cartButton.addEventListener('click', () => {
        // Crea el modal
        const cartModal = document.createElement('div');
        cartModal.classList.add('cart-modal');
        cartModal.innerHTML = `
            <h2>Carrito de compras</h2>
            <ul id="cart-items"></ul>
            <button id="close-cart">Cerrar</button>
        `;
        document.body.appendChild(cartModal);

        // Agrega los productos al modal
        const cartItemsList = cartModal.querySelector('#cart-items');
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Tu carrito está vacío.</li>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
                    <button data-index="${index}">Eliminar</button>
                `;
                cartItemsList.appendChild(cartItem);
            });
        }

        // Agrega evento de clic a los botones "Eliminar"
        const deleteButtons = cartModal.querySelectorAll('button[data-index]');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                removeFromCart(index);
                updateCartDisplay(cartItemsList);
            });
        });

        // Agrega evento de clic al botón "Cerrar"
        const closeButton = cartModal.querySelector('#close-cart');
        closeButton.addEventListener('click', () => {
            cartModal.remove();
        });
    });

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartCount();
        console.log(cart); // Muestra el contenido del carrito en la consola
    }

    function updateCartDisplay(cartItemsList) {
        cartItemsList.innerHTML = ''; // Limpia la lista
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Tu carrito está vacío.</li>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('li');
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
                    <button data-index="${index}">Eliminar</button>
                `;
                cartItemsList.appendChild(cartItem);
            });
        }
    }

    // Funcionalidad del menú portátil
    document.getElementById('menu-toggle').addEventListener('click', function() {
        const navbar = document.getElementById('navbar');
        navbar.style.display = (navbar.style.display === 'block') ? 'none' : 'block';
    });
});
