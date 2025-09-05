const API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// import { GoogleGenerativeAI } from "@google/generative-ai";
// const ai = new GoogleGenAI({});
// const ai = new GoogleGenerativeAI("AIzaSyCGsJRSBlgxwhTyAFldsDH76N4bfBbDJmY");

let ingredients = document.getElementById('ingredients');
let difficulty = document.getElementById('difficulty');
let time = document.getElementById('time');
let generate_recipe = document.getElementById('generate-recipe');
let recipe_card = document.getElementById('recipe-card');
let recipe_loading = document.getElementById('recipe-loading');
let recipe_text = document.getElementById('recipe-text');
let close_recipe = document.getElementById('close-recipe');

generate_recipe.addEventListener('click', async () => {
  let ingredients_value = ingredients.value;
  let difficulty_value = difficulty.value;
  let time_value = time.value;

  if (!ingredients_value.trim() || !difficulty_value.trim() || !time_value.trim()) {
    return;
  }

  recipe_card.style.display = "block";

  let message = `
Kamu adalah asisten chef. 
Tugasmu adalah membuat resep masakan berdasarkan input berikut:

- Bahan-Bahan: ${ingredients_value}
- Tingkat Kesulitan: ${difficulty_value}
- Durasi: ${time_value} menit

Utamakan resep masakan Indonesia.

Aturan penting:
1. Periksa bahan yang diberikan. Jika ada bahan yang bukan termasuk bahan masakan (contoh: kayu, plastik, batu, kertas, dan sejenisnya), maka jangan buat resep. 
   Balas dengan format: "❌ [nama bahan] bukan termasuk bahan masakan."
2. Jika semua bahan valid, buat resep sesuai bahan (tidak ada bahan tambahan selain bahan yang diberikan), tingkat kesulitan, dan durasi.
3. Untuk output jangan berisi kalimat pembuka atau penutup, melainkan gunakan format berikut:
   Nama Hidangan:
   Bahan-Bahan:
   Langkah-Langkah:
  `;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: [{ role: "user", content: message }]
    })
  });

  // const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  // const result = await model.generateContent(message);

  const ai_recipe_raw = await response.json();
  const ai_recipe_final = ai_recipe_raw.choices[ 0 ].message.content;
  recipe_loading.style.display = "none";
  recipe_text.innerHTML = ai_recipe_final;
  close_recipe.style.display = "block";
})

close_recipe.addEventListener('click', () => {
  recipe_card.style.display = "none";
  recipe_loading.style.display = "block";
  ingredients.value = "";
  difficulty.value = "";
  time.value = "";
  close_recipe.style.display = "none";
})

// model: "google/gemini-2.0-flash-exp:free"