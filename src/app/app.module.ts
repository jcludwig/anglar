import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BedazzleDirective } from './bedazzle.directive';
import { FooComponent } from './foo/foo.component';
import { VisualComponent } from './visual/visual.component';
import { GeneratorComponent } from './generator/generator.component';

@NgModule({
  declarations: [
    AppComponent,
    BedazzleDirective,
    FooComponent,
    VisualComponent,
    GeneratorComponent
  ],
  imports: [
    BrowserModule,
        RouterModule.forRoot([{
      path: 'foo',
      component: FooComponent,
    }, {
      path: 'lazy',
      loadChildren: 'app/my-lazy-module/my-lazy-module.module#MyLazyModuleModule'
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
