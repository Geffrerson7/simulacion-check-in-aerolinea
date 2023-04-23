import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT 

app.listen(PORT, () => console.log(`Server init at http://localhost:${PORT}`))

module.exports=app;