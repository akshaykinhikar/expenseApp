import mongoose from 'mongoose';

const { Schema } = mongoose;

type Expenditure = {
    id?: string,
    name: { type: String, required: true },
    category: { type: string, required: true },
    dueDate: { type: Date, required: true },
    paymentMethod: { type: string, required: true },
    payee: { type: String, required: true },
    notes: { type: String, required: false },
    recurring: { type: string, required: true },
    tags:{ type: string, required: false },
    status: { type: Boolean, required: true },
    // userId: { type: string, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
    income: { type: Number, default: 0, required: false },


};

const expenditureSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    dueDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    payee: { type: String, required: true },
    notes: { type: String, required: false },
    recurring: { type: String, enum: ['Once', 'Daily', 'Monthly', 'Quarterly', 'Yearly'], required: true },
    
    tags:{ type: String, required: false },
    status: { type: Boolean, default: false, required: true },
    // userId: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
    income: { type: Number, default: 0, required: false },
});

const Expenditure = mongoose.model<Expenditure & mongoose.Document>('Expenditure', expenditureSchema);
export default Expenditure;