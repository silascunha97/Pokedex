import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePokemonComponent } from './home-page-pokemon.component';

describe('HomePagePokemonComponent', () => {
  let component: HomePagePokemonComponent;
  let fixture: ComponentFixture<HomePagePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePagePokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePagePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
