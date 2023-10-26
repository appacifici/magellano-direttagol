import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://mongodb:27017/livescore', {
            
        });
        console.log('Mongoose connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB');
        // Exit process with failure
        process.exit(1);
    }
};

export default connectMongoDB;