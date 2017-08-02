const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  _owner: ObjectId,
  subscription: ObjectId,
  order: String,
  due: Date,
  recurring: Boolean,
  gst: Number,
  qst: Number,
  amount: Number,
  paid: Boolean,
  convertible: Boolean,
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    discount: Boolean,
  }],
}, {
  collection: 'invoice',
  sequence: 'no',
});

schema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
  indexFields: true,
});

const seq = schema.get('sequence');

if (seq) {
  console.log(`sequence on "${seq}"`);
  schema.plugin(mongooseSequence, {
    id: `test_${seq}`,
    inc_field: seq,
    collection_name: 'sequence',
  });
}

// Add schema to internal list
module.exports = mongoose.model('Invoice', schema);
