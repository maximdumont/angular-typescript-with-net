import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { PeopleComponent } from "./components/people/people.component"

@NgModule({
    declarations: [
        AppComponent,
        PeopleComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'people', pathMatch: 'full' },
            { path: 'people', component:PeopleComponent},
            { path: '**', redirectTo: 'people' }
        ])
    ]
})
export class AppModuleShared {
}
