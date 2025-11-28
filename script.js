// File: script.js
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// Funzione per mostrare i prodotti sulla pagina
function renderProducts(products) {
    const gallery = document.getElementById('product-gallery');
    gallery.innerHTML = ''; 

    if (!products || products.length === 0) {
        gallery.innerHTML = '<p>Nessun prodotto trovato. Controlla il database!</p>';
        return;
    }

    products.forEach(product => {
        const statusText = product.disponibilita > 0 
            ? `<span class="in-stock">Disponibile (${product.disponibilita} rimanenti)</span>`
            : `<span class="out-of-stock">Esaurito</span>`;

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.nome}</h3>
            <p><strong>Prezzo:</strong> €${product.prezzo.toFixed(2)}</p>
            <p>${statusText}</p>
            <button ${product.disponibilita === 0 ? 'disabled' : ''}>Aggiungi al Carrello</button>
        `;
        gallery.appendChild(card);
    });
}

// Funzione principale che fa la richiesta all'API
async function loadProducts() {
    // ⚠️ IMPORTANTE: Sostituisci [IL_TUO_DOMINIO] con l'URL che Vercel ti darà!
    // Vercel creerà un dominio come: https://luce-pura-candele.vercel.app
    // L'API sarà: https://luce-pura-candele.vercel.app/api/products

    const vercelDomain = 'https://[IL_TUO_DOMINIO].vercel.app'; 
    const apiURL = `${vercelDomain}/api/products`; 
    
    try {
        const response = await fetch(apiURL);
        
        if (!response.ok) {
            throw new Error(`Errore API: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        renderProducts(data); 

    } catch (error) {
        console.error("Errore nel caricamento dei prodotti:", error);
        document.getElementById('product-gallery').innerHTML = 
            `<p class="out-of-stock">❌ Errore nel caricamento del catalogo. Assicurati che l'URL API in script.js sia corretto e che il database sia accessibile.</p>`;
    }
}