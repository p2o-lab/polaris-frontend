import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';

@Injectable()
export class WebsocketService {
  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    try {
        const ws = new WebSocket(url);
        ws.onopen = () => {
            console.log('WebSocket open');
        };

        const observable = Observable.create(
            (obs: Observer<MessageEvent>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            });
        const observer = {
            next: (data: any) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return Subject.create(observer, observable);
    } catch (e) {
      console.log('Could not connect to websocket of server', e);
      return Subject.create(undefined, undefined);
    }
  }

}

export const
    websocketServiceStub = { connect: (url) => Subject.create(undefined, undefined)};
