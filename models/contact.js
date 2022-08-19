const mongoose = require('mongoose');
// Schema Types available: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map.
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

// Collection name:
const contact = mongoose.model('Contact', contactSchema);
module.exports = contact;