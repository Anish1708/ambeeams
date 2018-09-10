const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollutionSchema = new Schema({
    pm_level: {type: String},
    added_at: {type: String}
})

const PollutionData = mongoose.model('pollution_data', PollutionSchema);
module.exports = PollutionData;