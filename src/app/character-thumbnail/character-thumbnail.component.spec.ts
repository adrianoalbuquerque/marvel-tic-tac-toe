import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterThumbnailComponent } from './character-thumbnail.component';

describe('CharacterThumbnailComponent', () => {
  let component: CharacterThumbnailComponent;
  let fixture: ComponentFixture<CharacterThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter entradas vazias de hero e characterName por padrão', () => {
    expect(component.hero).toBe('');
    expect(component.characterName).toBe('');
  });

  it('Deve receber usuário', () => {
    component.characterName = 'Thor';

    expect(component.characterName).toBe('Thor');
  });
});
