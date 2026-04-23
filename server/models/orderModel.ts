import mongoose, {Document, Model, Schema} from "mongoose";

export interface IOrder extends Document{
    courseId: string;
    userId: string;
    payment_info: Record<string, unknown>;
}

const orderSchema = new Schema<IOrder>({
     courseId: {
         type: String,
         required: true
     },
     userId:{
        type: String,
        required: true
     },
     payment_info:{
          type: Schema.Types.Mixed,
          required: true,
     },
},{timestamps: true});

const OrderModel: Model<IOrder> = mongoose.model('Order', orderSchema);

export default OrderModel;