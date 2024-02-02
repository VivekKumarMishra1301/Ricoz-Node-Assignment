import mongoose from 'mongoose';
const ticketSchema = new mongoose.Schema({
    email: {
        type: 'String',
        required: true
    },
    Category: {
        type: "String",
        required: true
    },
    SubCategory: {
        type: "String",
        required: true
    },
    Description: {
        type: "String",
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Tickets', ticketSchema);