import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class AppService {
  constructor(private socket: SocketGateway) {}

  getHello(): string {
    console.log('request');
    return 'Hello World' + process.env.TEST;
  }

  addNewSdp(streamer, ip, sdp) {

    let portPosition = sdp.search('m=video');
    let port = sdp.substring(portPosition + 8, portPosition + 13);

    sdp = sdp.replace(new RegExp('c=IN (.*)\\r\\n', 'g'), `c=IN IP4 ${ip} \r\n`);
    sdp = sdp.replace(new RegExp('a=candidate(.*)\\r\\n', 'g'), ``);
    sdp = sdp.replace('a=end-of-candidates', `a=candidate:1 1 UDP 2122317567 ${ip} ${port} typ host\r\na=end-of-candidates`);
console.log(sdp);
    this.socket.newSdp.next({ streamer, sdp });
  }
}
