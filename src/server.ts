import app from "./app";
import {AppDataSource} from "./data-source";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected.")

    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`)
    })
  })
  .catch((err) => console.error(err));

