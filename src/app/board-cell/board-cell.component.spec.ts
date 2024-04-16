import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardCellComponent } from './board-cell.component';

describe('BoardCellComponent', () => {
  let component: BoardCellComponent;
  let fixture: ComponentFixture<BoardCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Deve atualizar os nomes dos jogadores e placares de acordo com as mudanças de entrada', () => {
    component.player1 = 'THOR';
    component.player2 = 'HULK';
    component.scoreboard1 = 2;
    component.scoreboard2 = 1;
    fixture.detectChanges();

    expect(component.player1).toEqual('THOR');
    expect(component.player2).toEqual('HULK');
    expect(component.scoreboard1).toEqual(2);
    expect(component.scoreboard2).toEqual(1);
  });

  it('Deve definir o vencedor com base na entrada setWinner', () => {
    component.setWinner = { play: 'player1', name: 'THOR', count: 1 };
    fixture.detectChanges();

    expect(component.win).toEqual('THOR');
    expect(component.scoreboard1).toEqual(1);

    component.setWinner = { play: 'player2', name: 'HULK', count: 2 };
    fixture.detectChanges();

    expect(component.win).toEqual('HULK');
    expect(component.scoreboard2).toEqual(1);
  });

  it('should handle ties and clear winner state', () => {
    component.setWinner = { play: '', count: 0 };
    fixture.detectChanges();

    expect(component.win).toEqual('');

    component.clearWinner = true;

    expect(component.clearWinner).toEqual(true);
    expect(component.win).toEqual('');
  });
});
