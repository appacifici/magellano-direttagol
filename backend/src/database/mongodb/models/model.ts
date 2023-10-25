import mongoose, { Document, Schema } from 'mongoose';
import connectMongoDB from '../connect';

connectMongoDB();


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

export {  Team, Match };