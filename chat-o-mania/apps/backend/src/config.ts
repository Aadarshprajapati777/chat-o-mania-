import mongoose, { ConnectOptions } from 'mongoose';

export const connectToDB = () => {
    mongoose.connect('...', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    } as ConnectOptions);
};

