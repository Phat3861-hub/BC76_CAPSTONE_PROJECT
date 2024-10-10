const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn/api/Product",
  timeout: 30000,
});

// Fetch and render products for Best Sellers, New Arrivals, and Top Trending
function getDataProduct() {
  http
    .get("/")
    .then((res) => {
      const allProducts = res.data.content;

      const bestSellers = allProducts.slice(0, 8);
      const newArrivals = allProducts.slice(8, 16);
      const topTrending = allProducts.slice(16, 18);

      renderDataProduct(bestSellers, "pills-bestSeller");
      renderDataProduct(newArrivals, "pills-newArrival");
      renderDataProduct(topTrending, "pills-topTrending");
    })
    .catch((err) => {
      console.error("Error fetching product data:", err);
    });
}

// Render products in specific tab containers
function renderDataProduct(products, containerId) {
  let content = "";
  for (let product of products) {
    const { id, name, price, image } = product;
    content += `
      <div class="col-6 col-sm-6 col-xl-3">
        <div class="product_item">
          <div class="product_item_img">
            <a href="./html/detail.html?productid=${id}" class="item_img">
              <img src="${image}" alt="${name}" />
            </a>
          </div>
          <div class="product_item_info">
            <a href="#" class="product_name">${name}</a>
          </div>
          <div class="product_price d-flex justify-content-between">
            <p>$${price}</p>
            <div class="product_button d-flex align-items-center">
              <a class="btn_check" href="#"><i class="fa-solid fa-check"></i></a>
              <a class="btn_heart" href="#"><i class="fa-regular fa-heart"></i></a>
              <a class="btn_plus" href="#"><i class="fa-solid fa-plus"></i></a>
            </div>  
          </div>
        </div>
      </div>
    `;
  }

  const container = document.querySelector(
    `#${containerId} .product_item_container`
  );
  if (container) {
    container.innerHTML = content;
  } else {
    console.error(`Container with ID ${containerId} not found.`);
  }
}

function getProductData() {
  http
    .get("/")
    .then((response) => {
      const products = response.data.content;
      renderProductCarousel(products);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
}

// Render products in the Owl Carousel
function renderProductCarousel(products) {
  let content = "";

  products.forEach((product) => {
    const { id, name, price, image } = product;
    content += `
      <div class="product_item">
        <div class="product_info">
          <a href="./html/detail.html?productid=${id}">
            <img src="${image}" height="350" alt="${name}" />
          </a>
          <span>
            <a href="./html/detail.html?productid=${id}">${name}</a>
          </span>
          <p>$${price}</p>
        </div>
        <div class="group_button">
          <div class="product_icon_first">
            <a class="addToCart" href="#" data-toggle="tooltip" data-original-title="Select Options">
              <i class="fa-solid fa-check"></i>
            </a>
          </div>
          <div class="product_icon_second">
            <a class="addToWishList" href="#" data-toggle="tooltip" data-original-title="Add to wishlist">
              <i class="fa-regular fa-heart"></i>
            </a>
          </div>
          <div class="product_icon_three">
            <a class="quickView" href="#" data-toggle="tooltip" data-original-title="Quick View">
              <i class="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  });

  const carouselContainer = $("#owl-product");
  carouselContainer.html(content); // Chèn nội dung mới vào container

  // Phá hủy Owl Carousel cũ (nếu có) trước khi khởi tạo lại
  carouselContainer.trigger("destroy.owl.carousel");
  carouselContainer.find(".owl-stage-outer").children().unwrap();
  carouselContainer.removeClass("owl-center owl-loaded owl-text-select-on");
  // Khởi tạo lại Owl Carousel với các sản phẩm mới
  carouselContainer.owlCarousel({
    loop: true,
    autoWidth: true,
    items: 3,
    dots: true,
    animateOut: "fadeOut",
  });
}

function getRepresentProduct() {
  http
    .get("/")
    .then((res) => {
      const representProducts = res.data.content.slice(0, 3); // Limit to 3 products
      renderRepresentProduct(representProducts);
    })
    .catch((err) => {
      console.error("Error fetching represent product data:", err);
    });
}

// Function to render the represent products in the section
function renderRepresentProduct(products) {
  let content = "";
  products.forEach((product) => {
    const { id, name, price, image } = product;
    content += `
      <div class="col-12 col-sm-12 col-md-12 col-xl-6 col-xxl-4">
        <div class="represent_item wow animate__animated animate__zoomIn">
          <div class="represent_img">
            <img src="${image}" alt="${name}" />
          </div>
          <div class="represent_text">
            <p class="text_title">MEN - ON | SWISS PERFORMANCE</p>
            <h3>${name}</h3>
            <p class="text_price">$${price}</p>
            <a href="./html/detail.html?productid=${id}">SHOP NOW >></a>
          </div>
        </div>
      </div>
    `;
  });

  const representContainer = document.querySelector(".represent_content");
  if (representContainer) {
    representContainer.innerHTML = content;
  } else {
    console.error("Represent container not found.");
  }
}

// Call functions to fetch and display products in tabs and carousel
getDataProduct(); // For tabs
getProductData(); // For Owl Carousel
getRepresentProduct();
