import mongoose from 'mongoose'

interface Weight extends mongoose.Document {
    weight: number
    date: Date
}

const weightSchema = new mongoose.Schema({
    weight: Number,
    date: Date
})

const Weight = mongoose.model<Weight>('Weight', weightSchema);

export {
    Weight
}