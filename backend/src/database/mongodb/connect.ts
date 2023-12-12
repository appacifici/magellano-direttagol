import mongoose from 'mongoose';
import dotenv   from 'dotenv';

const result = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
if (result.error) {
    console.log( result.error );
}

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://mongodb:27017/livescore', {
            
        });
        console.log('Mongoose connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB');        
        process.exit(1);
    }
};

export default connectMongoDB;
