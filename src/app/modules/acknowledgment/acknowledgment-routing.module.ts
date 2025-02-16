import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcknowledgmentPageComponent } from './components/acknowledgment-page/acknowledgment-page.component';
const routes: Routes = [
  { path: '', component: AcknowledgmentPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcknowledgmentRoutingModule {}
