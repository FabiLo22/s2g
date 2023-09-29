import { Injectable } from '@nestjs/common';

const OBSWebSocket = require('obs-websocket-js');

@Injectable()
export class ObsService {
  private obs: any = new OBSWebSocket();

  constructor() {
    this.connectToOBS();
  }

  async update(settings, streams) {
    await this.muteAll();
    await this.hideAll();

    switch(settings.scene) {
      case 'starting':
        await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'starting', render: true });
        await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'Background', render: true });
      break;
      case 'ending':
        await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'ending', render: true });
        await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'Background', render: true });
      break;
      case 'chatting':
        this.chatting(settings, streams);
      break;
      case 'solo':
        this.solo(settings, streams);
      break;
      case 'splitscreen':
        this.splitscreen(settings, streams);
      break;
    }
  }

  async splitscreen(settings, streams) {
    await this.unmuteActiveCams(streams);
    switch(streams.length) {
      case 1:   
      case 2:
        await this.sendToOBS('SetSceneItemProperties', { 
          'scene-name': 'cam-sources',
          item: 'cam-' + streams[0],
          position: {
            x: -500,
            y: 399
          },
          scale: {
            x: 1,
            y: 1
          }
        });

        await this.sendToOBS('SetSceneItemProperties', { 
          'scene-name': 'cam-sources',
          item: 'cam-' + streams[1],
          position: {
            x: 460,
            y: 399
          },
          scale: {
            x: 1,
            y: 1
          }
        });        

        await this.sendToOBS('SetSceneItemProperties', { 'scene-name': 'srt-sources',  item: 'SRT-' + streams[0],
          position: {
            x: 0,
            y: 0
          },
          scale: {
            x: 1,
            y: 1
          },
          crop: {
            top: 0,
            bottom: 0,
            left: 480,
            right: 480
          }
        });
        await this.sendToOBS('SetSceneItemProperties', { 'scene-name': 'srt-sources',  item: 'SRT-' + streams[1],
          position: {
            x: 960,
            y: 0
          },
          scale: {
            x: 1,
            y: 1
          },
          crop: {
            top: 0,
            bottom: 0,
            left: 480,
            right: 480
          }
        });        
      break;
      case 3:
        await this.sendToOBS('SetSceneItemProperties', { 
          'scene-name': 'cam-sources',
          item: 'cam-' + streams[0],
          position: {
            x: -600,
            y: 399
          },
          scale: {
            x: 1,
            y: 1
          }
        });

        await this.sendToOBS('SetSceneItemProperties', { 
          'scene-name': 'cam-sources',
          item: 'cam-' + streams[1],
          position: {
            x: 0,
            y: 399
          },
          scale: {
            x: 1,
            y: 1
          }
        }); 

        await this.sendToOBS('SetSceneItemProperties', { 
          'scene-name': 'cam-sources',
          item: 'cam-' + streams[2],
          position: {
            x: 690,
            y: 399
          },
          scale: {
            x: 1,
            y: 1
          }
        }); 

        await this.sendToOBS('SetSceneItemProperties', { 'scene-name': 'srt-sources',  item: 'SRT-' + streams[0],
          position: {
            x: 0,
            y: 0
          },
          scale: {
            x: 1,
            y: 1
          },
          crop: {
            top: 0,
            bottom: 0,
            left: 640,
            right: 640
          }
        });
        await this.sendToOBS('SetSceneItemProperties', { 'scene-name': 'srt-sources',  item: 'SRT-' + streams[1],
          position: {
            x: 640,
            y: 0
          },
          scale: {
            x: 1,
            y: 1
          },
          crop: {
            top: 0,
            bottom: 0,
            left: 640,
            right: 640
          }
        });
        await this.sendToOBS('SetSceneItemProperties', { 'scene-name': 'srt-sources',  item: 'SRT-' + streams[2],
          position: {
            x: 1280,
            y: 0
          },
          scale: {
            x: 1,
            y: 1
          },
          crop: {
            top: 0,
            bottom: 0,
            left: 640,
            right: 640
          }
        });               
      break;      
    }

    await this.sendToOBS('SetMute', { source: 'SRT-' + streams[0], mute: false });
  }

  async solo(settings, streams) {
    await this.unmuteActiveCams(streams);
    let x = 0;
    let y = 0;
console.log(settings.orientation);
    switch(streams.length) {
      case 4:
        x = settings.orientation === 'horizontal' ? 352 : -725;
        y = settings.orientation === 'horizontal' ? 399 : 500;         
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[3], x, y });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[3], 'x-scale': 1, 'y-scale': 1, rotation: 0 });        
      case 3:
        x = settings.orientation === 'horizontal' ? -10 : -725;
        y = settings.orientation === 'horizontal' ? 399 : 200;         
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[2], x, y });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[2], 'x-scale': 1, 'y-scale': 1, rotation: 0 });
      case 2:
        x = settings.orientation === 'horizontal' ? -370 : -725;
        y = settings.orientation === 'horizontal' ? 399 : -100;         
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], x, y });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], 'x-scale': 1, 'y-scale': 1, rotation: 0 });
      case 1:
        x = settings.orientation === 'horizontal' ? -730 : -725;
        y = settings.orientation === 'horizontal' ? 399 : -400; 
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], x, y });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], 'x-scale': 1, 'y-scale': 1, rotation: 0 });
      break;    
    }

    let sceneItems = await this.sendToOBS('GetSceneItemList', { sceneName: 'srt-sources' });
    let sceneItemsMapped = sceneItems.sceneItems.reverse().map(item => { return { id: item.itemId, name: item.sourceName } });
    let newOrder = [];

    newOrder.push(...sceneItemsMapped.splice(sceneItemsMapped.indexOf(sceneItemsMapped.find(item => item.name == 'SRT-' + settings.streamer)),1));
    newOrder.push(...sceneItemsMapped);

    await this.sendToOBS('ReorderSceneItems', { 'scene': 'srt-sources', items: newOrder });

    await this.sendToOBS('SetSceneItemProperties', { 
      'scene-name': 'srt-sources',
      item: 'SRT-' + settings.streamer,
      position: {
        x: 0,
        y: 0
      },
      scale: {
        x: 1,
        y: 1
      },
      crop: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    });
    await this.sendToOBS('SetMute', { source: 'SRT-' + settings.streamer, mute: false });      
  }

  async chatting(settings, streams) {
    await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'BackgroundCam', render: true });
    await this.unmuteActiveCams(streams);

    switch(streams.length) {
      case 2:
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], x: -950, y: -500 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], x: 20, y: -500 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
      break;
      case 3:
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], x: -950, y: -500 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], x: 20, y: -500 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[2], x: -465, y: -42 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[2], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
      break;
      case 4:
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], x: -950, y: -500 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[0], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], x: 20, y: -500 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[1], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[2], x: -950, y: -42 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[2], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });
        await this.sendToOBS('SetSceneItemPosition', { 'scene-name': 'cam-sources', item: 'cam-' + streams[3], x: 20, y: -42 });
        await this.sendToOBS('SetSceneItemTransform', { 'scene-name': 'cam-sources', item: 'cam-' + streams[3], 'x-scale': 1.5, 'y-scale': 1.5, rotation: 0 });               
      break;
    }
  }

  async connectToOBS() {
    this.obs = new OBSWebSocket();

    try {
      await this.obs.connect({
        address: '192.168.1.69:4444',
        password: 'kner#2021'
      })      
    } catch (err) {
      console.log(err);
    }
    
    this.obs.on('error', err => {
      console.error('socket error:', err);
    });    
  }

  async sendToOBS(command, payload) {
    if(!this.obs._connected) {
      await this.connectToOBS();
    }

    let data = null;

    try {
      data = await this.obs.send(command, payload);     
    } catch (err) {
      console.log(err);
    }

    return data;
  }
  
  async resetAllSRTSources() {

  }

  async hideAll() {
    await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'starting', render: false });
    await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'ending', render: false });
    await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'Background', render: false });
    await this.sendToOBS('SetSceneItemRender', { 'scene-name': 'stage', source: 'BackgroundCam', render: false });
  }

  async muteAll() {
    await this.sendToOBS('SetMute', { source: 'SRT-Fabi', mute: true });
    await this.sendToOBS('SetMute', { source: 'SRT-Boreece', mute: true });
    await this.sendToOBS('SetMute', { source: 'SRT-Dergon', mute: true });
    await this.sendToOBS('SetMute', { source: 'SRT-Wiesel', mute: true });
    await this.sendToOBS('SetMute', { source: 'cam-Fabi', mute: true });
    await this.sendToOBS('SetMute', { source: 'cam-Boreece', mute: true });
    await this.sendToOBS('SetMute', { source: 'cam-Dergon', mute: true });
    await this.sendToOBS('SetMute', { source: 'cam-Wiesel', mute: true });     
  }
  
  async unmuteActiveCams(streamers) {
    await Promise.all(streamers.map(async (streamer) => {
      await this.sendToOBS('SetMute', { source: 'cam-' + streamer, mute: false });
    }));
  }
}
