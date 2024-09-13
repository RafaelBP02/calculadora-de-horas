import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { UtilitariosService } from './../../services/utilitarios/utilitarios.service';
import { FormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { NotificationFrontComponent } from './notification-front.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfigAlerta } from '../../models/ConfigAlerta';
import { mockOneAlert } from '../notification-config-data/notification-config-data.component.stub';
import { ConfigAlertaService } from '../../services/config-alerta.service';
import { By } from '@angular/platform-browser';
import { of, timer } from 'rxjs';
import { InputSwitchModule } from 'primeng/inputswitch';
import { API_ENDPOINTS } from '../../services/api-endpoints';

describe('NotificationFrontComponent', () => {
  let component: NotificationFrontComponent;
  let messageService: MessageService;
  let httpTestingController: HttpTestingController;
  let configAlertaService: ConfigAlertaService;
  let fixture: ComponentFixture<NotificationFrontComponent>;
  let utilitariosService: UtilitariosService;
  let autorizacaoService:AutorizacaoService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToastModule,
        InputSwitchModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      declarations: [NotificationFrontComponent],
      providers: [
          MessageService,
          UtilitariosService,
          AutorizacaoService,
          ConfigAlertaService
        ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationFrontComponent);
    utilitariosService = TestBed.inject(UtilitariosService);
    messageService = TestBed.inject(MessageService);
    configAlertaService = TestBed.inject(ConfigAlertaService);
    httpTestingController = TestBed.inject(HttpTestingController);
    autorizacaoService = TestBed.inject(AutorizacaoService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve receber o alerta configurado', () => {
    autorizacaoService.decodedUserId = 1;
    autorizacaoService.decodedUser = 'TestUser';

    fixture.detectChanges();

    component.ngOnInit();

    const request = httpTestingController.expectOne(
      (data) => data.url === `${API_ENDPOINTS.ALERTAS}/1` && data.method === 'GET'
    );

    request.flush(mockOneAlert);

    expect(component.configuracoesSalvas).toBeDefined();
    expect(component.botaoVisivel).toBeTrue();
  });

  it('deve ligar e deligar os alertas', fakeAsync(() => {
    spyOn(timer(0, 60000), 'subscribe').and.callThrough();
    spyOn<any>(component, 'calculaDiferencaMinutos').and.returnValue(false);

    component.LigaDesliga = true;
    component.tarefaRelogio();
    expect(component.intervalID).toBeTruthy;

    tick(1000);
    component.LigaDesliga = false;
    component.tarefaRelogio();
    expect(component.intervalID.closed).toBeTruthy;
    tick(1000);
    component.intervalID.unsubscribe();
  }));

  it('deve testar a diferenca de alerta', () => {
    expect(component['calculaDiferencaMinutos'](new Date('2024-01-01T06:58:00'), new Date('2024-01-01T07:00:00'), 2)).toBeTruthy();

    expect(component['calculaDiferencaMinutos'](new Date('2024-01-01T06:57:00'), new Date('2024-01-01T07:00:00'), 2)).toBeFalsy();

  });
});
