 const BASE_URL = 'http://127.0.0.1:8000'; // Your FastAPI backend
    const tableBody = document.getElementById("productTableBody");

    async function loadProducts() {
      try {
        const res = await fetch(`${BASE_URL}/products`);
        const products = await res.json();

        tableBody.innerHTML = ""; // Clear previous

        products.forEach(product => {
          const tr = document.createElement("tr");

          tr.innerHTML = `
            <td><img src="${BASE_URL}/${product.image}" alt="${product.name}" /></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td class="action-buttons">
              <button class="btn edit-btn" onclick="editProduct('${product.id}')">Edit</button>
              <button class="btn delete-btn" onclick="deleteProduct('${product.id}')">Delete</button>
            </td>
          `;

          tableBody.appendChild(tr);
        });
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }

    function editProduct(id) {
      // Redirect to edit page or open modal
      alert("Edit product: " + id);
    }

    function deleteProduct(id) {
      if (confirm("Are you sure you want to delete this product?")) {
        fetch(`${BASE_URL}/products/${id}`, {
          method: 'DELETE'
        }).then(() => {
          alert("Deleted!");
          loadProducts();
        }).catch(err => {
          alert("Failed to delete");
          console.error(err);
        });
      }
    }

    // Load on page load
    loadProducts();

    function addProduct() {
    window.open('admin.html', '_blank');
}

function editProduct() {
    window.open('editProduct.html', '_blank');
}
