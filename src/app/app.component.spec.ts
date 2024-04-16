import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve emitir uma mensagem de erro se os personagens forem iguais', () => {
    spyOn(component.error, 'emit');
    component.players('Iron Man', 1);
    component.players('Iron Man', 2);
    expect(component.errorMessage).toEqual('Os personagens não podem ser iguais');
    expect(component.error.emit).toHaveBeenCalledWith('Os personagens não podem ser iguais');
  });

  it('Não deve emitir uma mensagem de erro se os personagens forem diferentes', () => {
    spyOn(component.error, 'emit');
    component.players('Iron Man', 1);
    component.players('Thor', 2);
    expect(component.errorMessage).toEqual('');
    expect(component.error.emit).toHaveBeenCalledWith('');
  });
});
