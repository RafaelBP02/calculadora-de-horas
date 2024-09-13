import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let autorizacaoService: AutorizacaoService
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports:[
        RouterModule.forRoot([]),
        HttpClientTestingModule]
        ,
      providers:[AutorizacaoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    autorizacaoService = TestBed.inject(AutorizacaoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar mensagem de logado', () => {
    spyOn(autorizacaoService,'autenticado').and.returnValue(true);
    autorizacaoService.decodedUser = 'fakeUser';

    fixture.detectChanges();

    expect(component.mostraNomeUsuario()).toBeTruthy;
    fixture.detectChanges();

    expect(component.mensagemLogin).toContain('fakeUser');
  })
});
