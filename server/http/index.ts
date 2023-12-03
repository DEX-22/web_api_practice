// 

// export default app
// import {relative} as mod from "https://deno.land/std@0.208.0/path/relative.ts";
import express from "npm:express@4";

const app = express();
// import { fromFileUrl } from "https://deno.land/std@0.208.0/path/posix/from_file_url.ts";
// const relPath = relative('../../','./public')
// const p = fromFileUrl(relPath);
app.use(express.static('./public'))
// app.get("/", (request, response) => {
//   response.body("Hello from Express!");
// });




app.listen(3000);