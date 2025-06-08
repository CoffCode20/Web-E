var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const categoryMap = {
    Television: 'tv',
    Audio: 'audio',
    Laptop: 'laptop',
    Mobile: 'mobile',
    Gaming: 'gaming',
};
export function fetchAndRenderProducts(containerId_1) {
    return __awaiter(this, arguments, void 0, function* (containerId, page = 1, itemsPerPage = 30, searchTerm = '', category = '', filter = '') {
        const container = document.getElementById(containerId);
        if (!container)
            return;
        container.innerHTML = `
        <section class="flex items-center justify-center h-screen w-full" id="loader">
            <div class="h-5 w-5 mr-2.5 rounded-full bg-[#b3d4fc] animate-[pulse_1.5s_infinite_ease-in-out_-0.3s]"></div>
            <div class="h-5 w-5 mr-2.5 rounded-full bg-[#b3d4fc] animate-[pulse_1.5s_infinite_ease-in-out_-0.1s]"></div>
            <div class="h-5 w-5 mr-2.5 rounded-full bg-[#b3d4fc] animate-[pulse_1.5s_infinite_ease-in-out_0.1s]"></div>
            <div class="h-5 w-5 mr-2.5 rounded-full bg-[#b3d4fc] animate-[pulse_1.5s_infinite_ease-in-out]"></div>
            <div class="h-5 w-5 rounded-full bg-[#b3d4fc] animate-[pulse_1.5s_infinite_ease-in-out]"></div>
        </section>
    `;
        try {
            const res = yield fetch("https://fakestoreapi.in/api/products?limit=150");
            if (!res.ok)
                throw new Error("Failed to fetch data");
            const data = yield res.json();
            let products = Array.isArray(data) ? data : data.products || data.data || [];
            // Filter by category if provided
            if (category && categoryMap[category]) {
                products = products.filter((p) => p.category.toLowerCase() === categoryMap[category]);
            }
            if (searchTerm) {
                products = products.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            // Apply additional filter logic
            products = products.filter((product) => {
                const finalPrice = product.price * (1 - product.discount / 100);
                if (filter === "cheaper")
                    return finalPrice < 150;
                if (filter === "expensive")
                    return finalPrice > 150.01;
                if (filter === "popular")
                    return product.discount > 7;
                return true;
            });
            const totalPages = Math.ceil(products.length / itemsPerPage);
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedProducts = products.slice(startIndex, endIndex);
            const paginationHTML = `
            <nav aria-label="Page navigation" class="mt-4 flex justify-center items-center space-x-2">
                <a href="#/page/${page > 1 ? page - 1 : 1}" class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Previous</a>
                ${Array.from({ length: totalPages }, (_, i) => `
                    <a href="#/page/${i + 1}" class="px-3 py-1 ${page === i + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-gray-300">
                        ${i + 1}
                    </a>
                `).join('')}
                <a href="#/page/${page < totalPages ? page + 1 : totalPages}" class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Next</a>
            </nav>
        `;
            container.innerHTML = `
          <section class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-4" data-aos="zoom-in-right">
            ${paginatedProducts.map((product) => {
                const finalPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
                const discountLabel = product.discount > 0
                    ? `<p class="text-sm text-green-600">${product.discount}% off</p>`
                    : '';
                const originalPrice = product.discount > 0
                    ? `<p class="text-sm line-through text-gray-400">$${product.price.toFixed(2)}</p>`
                    : '';
                return `
                <div class="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition" data-product-id="${product.id}" onclick="showProductDetails(${product.id})">
                  <img src="${product.image}" alt="${product.title}" class="h-48 w-full object-cover rounded-t-lg">
                  <div class="p-2">
                    <h2 class="text-lg font-semibold line-clamp-1">${product.title}</h2>
                    <p class="text-sm text-gray-500">${product.category}</p>
                    <p class="text-blue-600 font-bold mt-2">$${finalPrice}</p>
                    ${originalPrice}
                    ${discountLabel}
                  </div>
                </div>`;
            }).join('')}
          </section>
          ${paginationHTML}
        `;
            if (typeof AOS !== 'undefined')
                AOS.init({ duration: 1000 });
            document.querySelectorAll('a[href^="#/page"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    var _a, _b;
                    e.preventDefault();
                    const page = parseInt(((_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.split('/')[2]) || '1');
                    const category = ((_b = window.location.hash.split('/category/')[1]) === null || _b === void 0 ? void 0 : _b.split('/')[0]) || '';
                    fetchAndRenderProducts('app', page, itemsPerPage, '', category);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
        }
        catch (error) {
            console.error(error);
            container.innerHTML = '<p class="text-red-500 text-center">Failed to load products. Please try again later.</p>';
        }
    });
}
export function fetchProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://fakestoreapi.in/api/products/${id}`);
            const data = yield res.json();
            return data.product;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
