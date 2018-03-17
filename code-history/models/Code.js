var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CodeSchema = new Schema({
    code: { type: String, required: true },
    syntax: { type: String, required: true },
    name: { type: String, default: 'Unnamed' }
}, { timestamps: true });

const Code = mongoose.model('Code', CodeSchema, 'codes');

module.exports = Code;

