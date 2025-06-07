import { fetchProductById } from '../dist/api/fetchAndRenderProducts.js';

async function showProductDetails(productId) {
    const product = await fetchProductById(productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50";
    modal.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-lg w-[90%] md:w-[80%] max-h-[90vh] overflow-y-auto p-6 relative animate-fade-in">
          <button class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-4xl" id="closeModal">&times;</button>
          <div class="flex flex-col lg:flex-row gap-4">
            <img src="${product.image}" alt="${product.title}" class="w-full lg:w-[300px] h-auto object-contain rounded">
            <div class="flex-1">
              <h2 class="text-xl font-semibold mb-2">${product.title}</h2>
              <p class="text-sm text-gray-600 mb-2">${product.brand} • ${product.model} • ${product.color}</p>
              <div class="text-lg font-bold text-blue-600 mb-2">
                $${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </div>
              ${
                product.discount > 0
                  ? `<p class="text-sm line-through text-gray-400">$${product.price.toFixed(2)}</p>
                    <p class="text-sm text-green-600">${product.discount}% off</p>`
                  : ""
              }
              <p class="text-gray-800 mb-4 whitespace-pre-line">${product.description}</p>
              <button class="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ✅ Make it global for onclick="showProductDetails(...)"
window.showProductDetails = showProductDetails;
