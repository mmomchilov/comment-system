import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './firstPage/firstPage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmCancelModal } from './modals/confirm-cancel';
import { SecondPageComponent } from './secondPage/secondPage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SimpleInputComponent } from './generics/simpleInput';
import { JsonPath } from './generics/genericServices/jsonpath/jsonPath.service';
// import { SubHeader } from './generics/subHeader/subHeader.component';
import { TreeExplorerComponent } from './generics/tree/treeExplorer';
import { TreeNodeComponent } from './generics/tree/treeNode';
import { ContentContainerComponent } from './generics/contentContainer';
import { PanelViewComponent } from './generics/panelView';
import { TabsModule } from 'ngx-bootstrap/tabs';


const appRoutes: Routes = [
  { path: 'firstPage', component: FirstPageComponent },
  { path: 'secondPage', component: SecondPageComponent },

  {
    path: '',
    redirectTo: '/firstPage',
    pathMatch: 'full'
  },
  { path: '**', component: FirstPageComponent }
];
@NgModule({
  declarations: [
    // SubHeader,
    PanelViewComponent,
    ContentContainerComponent,
    TreeNodeComponent,
    TreeExplorerComponent,
    ConfirmCancelModal,
    SecondPageComponent,
    FirstPageComponent,
    AppComponent,
    SimpleInputComponent
  ],
  imports: [
    TabsModule,
    TabsModule.forRoot(),

    RouterModule.forRoot(
      appRoutes
      //  ,{ enableTracing: true } // <-- debugging purposes only
    ),
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgxEchartsModule
  ],
  entryComponents: [
    ConfirmCancelModal
  ],
  providers: [CommonModule, JsonPath],
  bootstrap: [AppComponent]
})
export class AppModule { }
