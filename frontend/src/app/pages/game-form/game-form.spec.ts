import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameForm } from './game-form';

describe('GameForm', () => {
  let component: GameForm;
  let fixture: ComponentFixture<GameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameForm],
    }).compileComponents();

    fixture = TestBed.createComponent(GameForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
