import mongoose, { Document, Schema } from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Feed Schema and Model
const FeedSchema = new Schema({
    name: { type: String, required: true, maxlength: 255 },
    endPoint: { type: String, required: true, maxlength: 255 },
    format: { type: String, required: true, enum: ['VALUE1', 'VALUE2', 'VALUE3'] } // example enum values for "valore da costanti di classe"
});
const Feed = mongoose.model('Feed', FeedSchema);

// Country Schema and Model
const CountrySchema = new Schema({
    externalId: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 255 },
    isReal: { type: Number, required: true, min: 0, max: 1 } // Assuming isReal is either 0 or 1
});
const Country = mongoose.model('Country', CountrySchema);

// Competition Schema and Model
const CompetitionSchema = new Schema({
    externalId: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 255 },
    isReal: { type: Number, required: true, min: 0, max: 1 } // Assuming isReal is either 0 or 1
});
const Competition = mongoose.model('Competition', CompetitionSchema);

// Team Schema and Model
const TeamSchema = new Schema({
    name: { type: String, required: true, maxlength: 255 },
    countryId: { type: Schema.Types.ObjectId, ref: 'Country', required: true } 
});
const Team = mongoose.model('Team', TeamSchema);

// Match Schema and Model
const MatchSchema = new Schema({
    competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true },
    teamHome: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    teamAway: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    timeMatch: { type: Number },
    dateMatch: { type: Date, required: true }
});
const Match = mongoose.model('Match', MatchSchema);

// Export models if you want to use them in other files.
module.exports = { Feed, Country, Competition, Team, Match };