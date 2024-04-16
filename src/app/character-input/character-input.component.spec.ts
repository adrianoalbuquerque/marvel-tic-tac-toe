import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CharacterInputComponent } from './character-input.component';
import { MarvelService } from '../service/service.service';
import { of, throwError } from 'rxjs';

describe('CharacterInputComponent', () => {
  let component: CharacterInputComponent;
  let fixture: ComponentFixture<CharacterInputComponent>;
  let marvelService: MarvelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterInputComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [MarvelService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterInputComponent);
    component = fixture.componentInstance;
    marvelService = TestBed.inject(MarvelService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve emitir o evento nameEntered quando characterName não estiver vazio', () => {
    spyOn(marvelService, 'getCharacterThumbnail').and.returnValue(of('thumbnail-url'));
    spyOn(component.nameEntered, 'emit');

    component.characterName = 'HULK';
    component.onInputChange();

    expect(marvelService.getCharacterThumbnail).toHaveBeenCalledWith('HULK');
    expect(component.hero).toBe('thumbnail-url');
    expect(component.nameEntered.emit).toHaveBeenCalledWith('HULK');
    expect(component.errorMessage).toBe('');
  });

  it('Deve definir errorMessage quando getCharacterThumbnail falhar', () => {
    spyOn(marvelService, 'getCharacterThumbnail').and.returnValue(throwError('Error'));

    component.characterName = 'Personagem não encontrado.';
    component.onInputChange();

    expect(marvelService.getCharacterThumbnail).toHaveBeenCalledWith('Personagem não encontrado.');
    expect(component.hero).toBe('');
    expect(component.errorMessage).toBe('Error');
  });

  it('Deve limpar characterName quando a entrada setError for definida', () => {
    component.characterName = 'HULK';
    component.setError = 'Error Message';

    expect(component.errorMessage).toBe('Error Message');
    expect(component.characterName).toBe('');
  });
});
