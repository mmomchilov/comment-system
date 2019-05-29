import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { SecondPageComponent } from './secondPage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
    declarations: [SecondPageComponent],
    providers: []
})

export class SecondPageModule {
}
