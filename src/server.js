import app from "./app.js"
import dotenv  from 'dotenv'
import { ROLE } from "./utils/constants.js";

dotenv.config()
const PORT = process.env.PORT || 5000



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})