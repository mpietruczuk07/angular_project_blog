import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPostsComponent } from './print-posts.component';

describe('PrintPostsComponent', () => {
  let component: PrintPostsComponent;
  let fixture: ComponentFixture<PrintPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
