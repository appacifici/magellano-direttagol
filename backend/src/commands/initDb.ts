import mongoose, { Document, Schema, Error } from 'mongoose';

import connectMongoDB from '../database/mongodb/connect';
import {Feed,FORMAT_FEED,SOURCE_FEED,FeedType,FeedArrayType} from '../database/mongodb/models/Feed';

connectMongoDB();

const feedsToInsert:FeedArrayType = [
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'scores', endPoint: 'http://livescore-api.com/api-client/scores/history.json', format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'competitions', endPoint: 'https://livescore-api.com/api-client/competitions/list.json', format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'live', endPoint: 'https://livescore-api.com/api-client/scores/live.json', format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'countries', endPoint: 'https://livescore-api.com/api-client/countries/list.json', format: FORMAT_FEED.JSON },
    { source: SOURCE_FEED.LIVE_SCORE_API_COM, name: 'matches', endPoint: 'https://livescore-api.com/api-client/fixtures/matches.json', format: FORMAT_FEED.JSON }
];

Feed.insertMany(feedsToInsert)
.then((docs) => {
    console.log('Feeds inserted successfully:', docs);
})
.catch((err) => {
    console.error('Error inserting feeds:', err);
});

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