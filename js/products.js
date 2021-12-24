/*
====================== 
Category Products
======================
*/
const getProducts = async ()=>{
    try {
        const results = await fetch('https://github.com/DylanYoan/Responsive-Ecommerce/blob/main/data/products.json');
        const data = await results.json();
        const products = data.products;
        return products;
    } catch (err) {
        console.log(err);
    }
};

// Load Products
window.addEventListener("DOMContentLoaded", async () => {
    const products = await getProducts();
    displayProductItems(products);
});

const CategoryCenter = document.querySelector('.category__center');

// Display Products
const displayProductItems = items =>{
    let displayProduct = items.map(product=>
        `<div class="product category__product">
        <div class="product__header">
            <img src=${product.image} alt="Samsung 2 Img"  />
        </div>
        <div class="product__footer">
            <h3>${product.title}</h3>
            <div class="rating">
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
                <svg>
                    <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                </svg>
            </div>
            <div class="product__price">
                <h4>${product.price}</h4>
                <a href="#">
                    <button type="button" class="product__btn">
                        Add to cart
                    </button>
                </a>
            </div>
            <ul>                                                      <a href="#">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-eye"></use>
                    </svg>
                        
                </a>
                <a href="#">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                        </svg>
                </a>
                <a href="#">
                    <svg>
                        <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                        </svg>
                </a>
            </ul>
        </div>
    </div>`
    );
    displayProduct = displayProduct.join("");
    if (CategoryCenter) {
        CategoryCenter.innerHTML = displayProduct;
    }
};

// Filtering
const filterBtn = document.querySelectorAll('.filter-btn');
const CategoryContainer = document.getElementById('category');

if (CategoryContainer) {
    CategoryContainer.addEventListener("click", async e => {
        const target = e.target.closest(".section__title");
        if (!target) return;

        const id = target.dataset.id;
        const products = await getProducts();

        if (id) {
            // remove active from buttons
            Array.from(filterBtn).forEach(btn => {
                btn.classList.remove("active");
            });
            target.classList.add("active");

            // Load Products
            let menuCategory = products.filter(product => {
                if(product.category == id) {
                    return product;
                }
            });

            if(id == 'All Products'){
                displayProductItems(products)
            } else {
                displayProductItems(menuCategory);
            }
        }
    });
}
