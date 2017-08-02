const mongoose = require('mongoose');
const Invoice = require('./invoice');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/seqtest', { useMongoClient: true })
  .then(() => {
    const invoice = new Invoice({});
    return invoice.save();
  })
  .then((doc) => {
    console.log(doc);
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
  });
