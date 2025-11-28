// File: api/products.js (DA SALVARE DENTRO LA CARTELLA api/)

const mongoose = require('mongoose');

// Vercel inietta MONGO_URI come variabile d'ambiente
const MONGO_URI = process.env.MONGO_URI;

// Definiamo la struttura dei dati (Schema)
const ProductSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    prezzo: { type: Number, required: true },
    disponibilita: { type: Number, default: 0 },
    is_limitata: { type: Boolean, default: false },
    immagine_url: { type: String, required: true }
});

// Creiamo il modello, usando il nome 'prodotti' per la collezione nel DB
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema, 'prodotti');

// La funzione principale che Vercel esegue quando il tuo sito chiede i dati
module.exports = async (req, res) => {
    // Queste righe permettono al tuo frontend di accedere all'API (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Content-Type', 'application/json');

    if (!MONGO_URI) {
        return res.status(500).json({ error: 'Errore: Stringa di connessione non configurata su Vercel.' });
    }
    
    try {
        // Connessione a MongoDB Atlas
        await mongoose.connect(MONGO_URI);
        
        // Trova tutti gli elementi (i prodotti) nel database
        const products = await Product.find({});
        
        // Invia i prodotti al browser (al tuo script.js)
        res.status(200).json(products);

    } catch (error) {
        console.error("Errore di MongoDB:", error);
        res.status(500).json({ error: 'Impossibile recuperare i prodotti dal database.' });
    }
};