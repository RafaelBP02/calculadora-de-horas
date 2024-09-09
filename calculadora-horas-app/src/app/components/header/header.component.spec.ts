import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let autorizacaoService: AutorizacaoService
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports:[HttpClientTestingModule],
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
});
