const mongoose = require("mongoose")

mongoose.
connect(
    "mongodb+srv://"
    + process.env.DB_USER_PASS +
    "@cluster0.iodcc.mongodb.net/checkEnterprise"
)