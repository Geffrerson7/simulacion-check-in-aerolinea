import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 9000

app.listen(PORT, () => console.log(`Server init at http://localhost:${PORT}`))

module.exports=app;