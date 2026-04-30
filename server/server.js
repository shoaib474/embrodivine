import "dotenv/config";
import app from "./src/app.js";
import Connection from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

Connection();

app.get("/", (req, res) => res.status(403).send("Forbidden"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 

