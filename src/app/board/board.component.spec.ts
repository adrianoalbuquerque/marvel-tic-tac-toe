import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Deve definir os nomes dos jogadores nas alterações de entrada', () => {
    component.player1 = 'GAMBIT';
    component.player2 = 'JEAN GREY';
    fixture.detectChanges();

    expect(component.player1).toEqual('GAMBIT');
    expect(component.player2).toEqual('JEAN GREY');
  });

  it('Deve fazer um movimento válido e trocar o jogador atual', () => {
    const player1 = component.player_1;
    const index = 0;

    component.move(index, player1);
    fixture.detectChanges();

    expect(component.board[index]).toEqual('x');
    expect(component.currentPlayer).toEqual(component.player_2);
    expect(component.moveCounter).toEqual(1);
  });

  it('Não deve permitir movimentos inválidos em casas ocupadas', () => {
    const player1 = component.player_1;
    const index = 0;

    component.move(index, player1);
    fixture.detectChanges();

    expect(component.move(index, player1)).toBeFalsy();
  });

  it('Deve reiniciar o jogo e emitir um evento de vencedor claro', () => {
    const spyClearWinner = spyOn(component.clearWinner, 'emit');
    const player1 = component.player_1;

    component.move(0, player1);
    fixture.detectChanges();

    component.resetGame();
    fixture.detectChanges();

    expect(spyClearWinner).toHaveBeenCalled();
  });
});
