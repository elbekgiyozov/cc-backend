import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

let laptops = ["Dell", "Mac", "Lenovo"];

// GET /laptops
app.get("/laptops", (req, res) => {
  const { message, error } = req.query;

  res.send(`
    <html>
      <head>
        <title>Noutbuk CRUD</title>
      </head>
      <body>
        <h2>Noutbuk royxati</h2>

        ${message ? `<p class="success">${message}</p>` : ""}
        ${error ? `<p class="error">${error}</p>` : ""}

        <ul>
          ${laptops
            .map(
              (l) => `
            <li>
              ${l}
              <form style="display:inline" method="POST" action="/laptops/delete">
                <input type="hidden" name="name" value="${l}" />
                <button>x</button>
              </form>
            </li>
          `,
            )
            .join("")}
        </ul>

        <h3>Yangi noutbuk qoshish</h3>

        <form method="POST" action="/laptops">
          <input name="name" placeholder="Noutbuk nomi" />
          <button>Qoshish</button>
        </form>
      </body>
    </html>
  `);
});

// POST /laptops - qoshish
app.post("/laptops", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.redirect("/laptops?error=Noutbuk nomini yozing");
  }

  if (name.length < 2) {
    return res.redirect("/laptops?error=Kamida 2 ta harf");
  }

  if (laptops.includes(name)) {
    return res.redirect("/laptops?error=Allaqachon qoshilgan");
  }

  laptops.push(name);

  res.redirect("/laptops?message=Noutbuk qoshildi");
});

// POST /laptops/delete - ochirish
app.post("/laptops/delete", (req, res) => {
  const { name } = req.body;

  laptops = laptops.filter((l) => l !== name);

  res.redirect("/laptops?message=Ochirildi");
});

// server
app.listen(4200, () => {
  console.log("Server running on http://localhost:4200/laptops");
});
