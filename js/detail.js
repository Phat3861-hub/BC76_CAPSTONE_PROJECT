window.onload = function () {
  loadProductFromURL();

  document.addEventListener("click", function (e) {
    if (
      e.target.closest("a") &&
      e.target.closest("a").href.includes("productid")
    ) {
      e.preventDefault();

      const urlParams = new URL(e.target.closest("a").href).searchParams;
      const productId = urlParams.get("productid");

      window.location.href = `?productid=${productId}`;
    }
  });

  window.addEventListener("popstate", loadProductFromURL);
};

function loadProductFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productid");

  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error("Product ID not found in the URL");
  }
}

function fetchProductDetails(productId) {
  axios
    .get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`)
    .then((response) => {
      const product = response.data.content;
      renderProductDetails(product);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}

function renderProductDetails(product) {
  document.querySelector(".main_img img").src = product.image;
  document.querySelector(".info_title h1").textContent = product.name;
  document.querySelector(".info_price").textContent = `$${product.price}`;
  document.querySelector(".info_available span").textContent =
    product.quantity > 0 ? "IN STOCK" : "OUT OF STOCK";
  document.querySelector(".info_size span").textContent = product.size;
  document.querySelector(".description_content img").src = product.image;
}
