import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type MessageDocument = Message & Document

@Schema()
export class Message {
    @Prop()
    message: string

    @Prop()
    sender: string
}
export const MessageSchema = SchemaFactory.createForClass(Message)