const mongoose = require('mongoose');
// mongoose.connect("mongodb+srv://neel:neel@cluster0.8plzm.mongodb.net/Assignment1?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );
// mongoose.connection.on("connected", function(){
//     console.log("Application is connected to Databse");
// })
// Connect to MongoDB
mongoose.connect("mongodb+srv://freakyluffy:Himanshu%402000@cluster0.vd8zb.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));
