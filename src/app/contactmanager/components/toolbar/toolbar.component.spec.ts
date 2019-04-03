import {Router, RouterModule} from "@angular/router";
import {ToolbarComponent} from "./toolbar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {MaterialModule} from "../../../shared/material.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialog, MatDialogModule, MatSelect} from "@angular/material";

import {Component, NgModule} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {NewContactDialogComponent} from "../new-contact-dialog/new-contact-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {UserService} from "../../services/user.service";
import {ContactmanagerAppComponent} from "../../contactmanager-app.component";
import {MainContentComponent} from "../main-content/main-content.component";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {BrowserAnimationBuilder} from "@angular/platform-browser/animations/src/animation_builder";

/*Tests for other than dialog reference*/
describe('ToolbarComponent [with mocks]', () => {
    let routerClient: Router;
    let toolbarComponent: ToolbarComponent;
    let comp: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the httpClient mocking service
        imports: [RouterTestingModule, MaterialModule, NoopAnimationsModule],
        // Provide the service-under-test
        providers: [ToolbarComponent]
      }).compileComponents().then( () => {
        fixture = TestBed.createComponent(ToolbarComponent);
        comp = fixture.componentInstance;
      });
      // Inject
      routerClient = TestBed.get(Router);
      toolbarComponent = TestBed.get(ToolbarComponent);

    });

    it('should create ToolBar Component', () => {
      expect(toolbarComponent).toBeDefined();
    });



/*    it('should call openAddContactDialog', () => {
      const mockMatDialog = TestBed.get(MatDialog);
      const mockMatSnackBar = TestBed.get(MatSnackBar);
      const mockuserService = jasmine.createSpyObj('UserService', ['addUser']);
      const res = new ToolbarComponent(mockMatDialog, mockMatSnackBar, routerClient);
      const mockDialogRef = mockMatSnackBar.open();
      /!*
          const mockDialogRefTwo = mockMatSnackBar.afterClosed().subscribe();
      *!/
      const mockNewContactDialogComponent =  jasmine.createSpyObj('NewContactDialogComponent', ['']);
      expect(toolbarComponent.openAddContactDialog()).toBeDefined();
    });*/

    /* TEST IT FROM HERE : http://angular-tips.com/blog/2018/02/testing-angular-material-dialog-templates/*/

    it('should call openSnackBar', () => {
      expect(toolbarComponent.openSnackBar('mock', 'mockAction')).toBeDefined();
    });
  });

/*Test for dialog ref*/
describe('InformationDialog', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;

  let noop: ComponentFixture<NoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ DialogTestModule ],
      providers: [
        { provide: OverlayContainer, useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }}
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);

  });

  it('shows information without details', () => {
    const config = {
      data: {
        title: 'User cannot be saved without an email',
        details: []
      }
    };
    dialog.open(NewContactDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const h2 = overlayContainerElement.querySelector('#mat-dialog-title-0');
    const button = overlayContainerElement.querySelector('button');

    expect(h2.textContent).toBe('User cannot be saved without an email');
    expect(button.textContent).toBe('Close');
  });

  it('shows an error message with some details', () => {

    const config = {
      data: {
        title: 'Validation Error - Not Saved',
        details: ['Need an email', 'Username already in use']
      }
    };
    dialog.open(NewContactDialogComponent, config);

    noop.detectChanges(); // Updates the dialog in the overlay

    const li = overlayContainerElement.querySelectorAll('li');
    expect(li.item(0).textContent).toContain('Need an email');
    expect(li.item(1).textContent).toContain('Username already in use');
  });
});

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  NewContactDialogComponent,
  NoopComponent,
  MatSelect
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NoopAnimationsModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NewContactDialogComponent
  ],
  entryComponents: [
    NewContactDialogComponent
  ]

})
class DialogTestModule { }
