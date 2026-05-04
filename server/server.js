import "dotenv/config";
import app from "./src/app.js";
import Connection from "./src/config/db.js";
import { connectRedis } from "./src/config/redis.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await Connection();

    await connectRedis();

    app.get("/", (req, res) => {
      res.status(200).json({
        status: "OK",
        message: "API is running",
      });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
