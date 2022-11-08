const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const middleware = require("./middleware/middleware");
const connectDB = require("./config/db");
const router = require("./router/routes");
const swaggerUI = require('swagger-ui-express')
const fs = require('fs')
const YAML = require('yaml')

//api docs
const file = fs.readFileSync('./docs/swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
//init express
const app = express();
//init express json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// docs
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
// enviromwnt variable
const url = process.env.API_URL;
const port = process.env.PORT;
//middleware
middleware(app);
connectDB();
//router
app.use(`${url}`, router);

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}
app.get('/api/v1/health', (req, res) => {
	res.send('Health is ok!')
})
//listen to server
app.listen(port, () =>
  console.log(`Server Running on port ${port}`.bgYellow.black)
);
