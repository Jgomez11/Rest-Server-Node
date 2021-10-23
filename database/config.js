const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    console.log("bd online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar Base de datos");
  }
};

module.exports = {
  dbconnection,
};
