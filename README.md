# 🐾 Pokémon

A simple JavaScript application that fetches and displays Pokémon data using the **PokéAPI**.  
This project demonstrates the use of **Fetch API**, **async/await**, and **DOM manipulation** in JavaScript.

---

## 🚀 Features
- Fetches Pokémon data (name, image, type, and abilities) from the PokéAPI.  
- Displays Pokémon details dynamically on the webpage.  
- Handles invalid Pokémon names gracefully with error messages.  
- Clean and minimal UI built with HTML, CSS, and JavaScript.

---

## 🧠 Concepts Used
- **Fetch API** for HTTP requests  
- **Async/Await** for asynchronous operations  
- **JavaScript DOM Manipulation**  
- **Error Handling**  
- Basic **HTML/CSS Layout**

---

## 🧩 Tech Stack
| Technology | Description |
|-------------|-------------|
| **HTML5** | Structure and layout |
| **CSS3** | Styling and design |
| **JavaScript (ES6+)** | Logic, Fetch API, and interactivity |
| **PokéAPI** | Free Pokémon RESTful API |

---

## ⚙️ Installation & Setup
1. **Clone this repository**  
   ```bash
   git clone https://github.com/1stAlphaDemon/pokemon.git
   ```
2. **Navigate into the project directory**  
   ```bash
   cd pokemon
   ```
3. **Open the project**  
   Simply open `index.html` in your browser — no server setup needed.

---

## 🕹️ How to Use
1. Enter the name of a Pokémon (e.g., `pikachu`, `25`) in the input box.  
2. Click the **Search** button.
3. Cliack the **Clear** button to clear any filter and reload.
4. Click any type to filter accordingly.
5. Change sort to sort accordigly.
6. Click any single card to see more details.
7. The app will display Pokémon details such as:
   - Name  
   - Image  
   - Type(s)  
   - Abilities  

---

## 🧪 Example
```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 🧰 Possible Improvements
- Add search suggestions or autocomplete.  
- Show Pokémon stats and evolution chain.  
- Use a modern UI framework (React, Vue, or Svelte).  
- Cache fetched data with localStorage.  

---

## 💡 Credits
- **PokéAPI:** [https://pokeapi.co/](https://pokeapi.co/)  
- Developed by **1stAlphaDemon**
