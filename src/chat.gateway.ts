import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets"
import { CreateMessageDto } from "./dto/create-message-dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./schemas/message.schema"

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }

    @WebSocketServer()
    server;

    private count: number = 0;

    @SubscribeMessage("new-message-to-server")
    handleMessage(@MessageBody() message: CreateMessageDto): void {
        const newMessage = new this.messageModel(message)
        newMessage.save()
        this.server.emit("new-message-to-client", newMessage)
    }

    public async handleDisconnect(client: any): Promise<void> {
        this.count -= 1;
        console.log(`Disconnected: ${this.count} connections`);
    }

    public async handleConnection(client: any, ...args: any[]): Promise<void> {
        this.count += 1;
        console.log(`Connected: ${this.count} connections`);
        const messages = await this.messageModel.find().exec()
        client.emit('all-messages-to-client', messages);
    }
}