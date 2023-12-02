import mongoose, { Model }                      from 'mongoose';
import connectMongoDB                           from '../database/mongodb/connect';
import { ICompetition, CompetitionSchema }      from '../database/mongodb/models/Competition';
import { TeamType,ITeam,TeamSchema }            from '../database/mongodb/models/Team';
import { CountryType, ICountry, CountrySchema } from '../database/mongodb/models/Country';
import { MatchType,IMatch,MatchSchema }         from '../database/mongodb/models/Match';
import { StandingType, IStanding, StandingSchema }  from '../database/mongodb/models/Standing';
import { Feed,
         FORMAT_FEED,
         SOURCE_FEED,
        FeedArrayType}                          from '../database/mongodb/models/Feed';

connectMongoDB();

const feedsToInsert:FeedArrayType = [
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'scores',       endPoint: 'http://livescore-api.com/api-client/scores/history.json',        format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'competitions', endPoint: 'https://livescore-api.com/api-client/competitions/list.json',    format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'live',         endPoint: 'https://livescore-api.com/api-client/scores/live.json',          format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'countries',    endPoint: 'https://livescore-api.com/api-client/countries/list.json',       format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'matches',      endPoint: 'https://livescore-api.com/api-client/fixtures/matches.json',     format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'teams',        endPoint: 'https://livescore-api.com/api-client/teams/list.json',           format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'federations',  endPoint: 'https://livescore-api.com/api-client/federations/list.json',     format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'standings',    endPoint: 'https://livescore-api.com/api-client/competitions/standings.json',  format: FORMAT_FEED.JSON }
];

Feed.insertMany(feedsToInsert)
    .then((docs) => {
        console.log('Feeds inserted successfully:', docs);
    })
    .catch((err) => {
        console.error('Error inserting feeds:', err);
    });


// COMPETITION
const Country:      Model<ICountry>     = mongoose.model<ICountry>('Country', CountrySchema);
const Competition:  Model<ICompetition> = mongoose.model<ICompetition>('Competition', CompetitionSchema);
const Team:         Model<ITeam>        = mongoose.model<ITeam>('Team', TeamSchema);
const Match:        Model<IMatch>       = mongoose.model<IMatch>('Match', MatchSchema);
const Standing:     Model<IStanding>    = mongoose.model<IStanding>('Standing', StandingSchema);

// const newFeed = new Feed({
//     source: SOURCE_FEED.LIVE_SCORE_API_COM,
//     name: 'History',
//     endPoint: 'http://livescore-api.com/api-client/scores/history.json',
//     format: FORMAT_FEED.JSON
// });

// newFeed.save().then((savedFeed: FeedType) => {
//     console.log('Feed saved successfully:', savedFeed);
// }).catch((err: Error) => {
//     console.error('Error saving the feed:', err);
// });