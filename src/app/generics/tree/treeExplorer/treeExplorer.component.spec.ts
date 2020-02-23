import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeExplorerComponent } from './treeExplorer.component';

describe('EditableTableComponent', () => {
  let component: TreeExplorerComponent;
  let fixture: ComponentFixture<TreeExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeExplorerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
