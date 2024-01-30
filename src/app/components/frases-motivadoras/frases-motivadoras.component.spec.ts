import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrasesMotivadorasComponent } from './frases-motivadoras.component';

describe('FrasesMotivadorasComponent', () => {
  let component: FrasesMotivadorasComponent;
  let fixture: ComponentFixture<FrasesMotivadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrasesMotivadorasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrasesMotivadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
