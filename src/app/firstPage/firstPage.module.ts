import { NgModule } from '@angular/core';
import { FirstPageComponent } from './firstPage.component';
import { CommentServiceModule } from './firstPage.component';


@NgModule({
    imports: [CommentServiceModule],
    declarations: [FirstPageComponent]
})
export class FirstPageModule { }
