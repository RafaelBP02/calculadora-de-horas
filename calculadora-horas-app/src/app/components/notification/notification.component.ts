import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})

//Adaptado de <https://github.com/hantsy/angular-spring-sse-sample/blob/master/GUIDE.md>
export class NotificationComponent implements OnInit, OnDestroy {
  messagem: string = '';
  messagens: string[] = [];
  user_id: number = 2;
  sub: Subscription;

  constructor(
    private zone: NgZone,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getMessages(): Observable<any> {
    return new Observable((observer) => {
      const source = new EventSource(
        `http://localhost:8080/alerts/${this.user_id}`
      );

      // Adiciona um EventListener específico para o evento "alert"
      source.addEventListener('alert', (event: MessageEvent) => {
        this.zone.run(() => {
          observer.next(event.data);
        });
      });

      source.onerror = (event) => {
        this.zone.run(() => {
          observer.error(event);
        });
      };

      return () => {
        source.close();
      };
    });
  }

  ngOnInit(): void {
    this.sub = this.getMessages().subscribe({
      next: (data) => {
        console.log(data);
        this.messageService.add({
          severity: 'info',
          summary: 'ATENÇÃO!',
          detail: `${data}`,
        });
        this.addMessage(data);
      },
      error: (err) => console.error(err),
    });
  }

  addMessage(msg: any) {
    this.messagens = [...this.messagens, msg];
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }

  // sendMessage() {
  //   console.log('sending message:' + this.messagem);
  //   this.http
  //     .post(`http://localhost:8080/alerts/${this.user_id}`, this.messagem)
  //     .subscribe({
  //       next: (data) => {
  //         console.log('next' + data);
  //       },
  //       error: (error) => console.log('erro' + error),
  //       complete: () => {
  //         console.log('complete');
  //         this.messagem = '';
  //       },
  //     });
  // }
}
