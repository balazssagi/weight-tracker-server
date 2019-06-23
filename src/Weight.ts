import mongoose from 'mongoose'

interface Weight extends mongoose.Document {
    weight: number
}

const weightSchema = new mongoose.Schema({
    weight: Number
})

const Weight = mongoose.model<Weight>('Weight', weightSchema);

export {
    Weight
}