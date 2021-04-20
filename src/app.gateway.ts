import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(4001)
export class AppGateway implements OnGatewayConnection{

@WebSocketServer()
wss

handleConnection(client) {
  client.emit('connection','successfully connected to the server');

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
}

}
