import express from "express";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// get req.body
app.use(express.json())
app.use(express.urlencoded({extended : true}))


//sanitize request data
app.use(mongoSanitize());

//morgan
if (process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"))
}

// enable cookie parser
app.use(cookieParser())

//gzip compression
app.use(compression());

//file upload
app.use(
    fileUpload({
        useTempFiles: true,
    })
)

// cors
app.use(cors())

// routes
app.use("/api/v1",routes)

export default app;
