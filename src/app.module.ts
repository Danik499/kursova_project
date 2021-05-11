import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose"
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from "./schemas/message.schema"
const uri = "mongodb+srv://daniel_shcherban:283014@kursova.gqvmi.mongodb.net/kursova?retryWrites=true&w=majority"
@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule { }
