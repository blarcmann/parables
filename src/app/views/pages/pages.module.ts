// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// NgBootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MyPageComponent } from './my-page/my-page.component';
import { LeadsModule } from './apps/leads/leads.module';
import { MdTasksModule } from './apps/md-tasks/md-tasks.module';
import { ReportsModule } from './apps/report/reports.module';
import { MeetingsModule } from './apps/meetings/meetings.module';
import { AssetsModule } from './apps/assets/assets.module';
import { ProfileModule } from './apps/profile/profile.module';
import { UsersModule } from './apps/users/users.module';
import { SalesModule } from './apps/sales/sales.module';
import { QuizesModule } from './apps/quiz/quizes.module';
import { ComputationsModule } from './apps/computations/computations.module';
import { ParablesModule } from './apps/parables/parables.module';
import { AdvertsModule } from './apps/adverts/adverts.module';

@NgModule({
	declarations: [MyPageComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		ParablesModule,
		LeadsModule,
		AssetsModule,
		MdTasksModule,
		ComputationsModule,
		ReportsModule,
		AdvertsModule,
		ProfileModule,
		UsersModule,
		SalesModule,
		QuizesModule,
		MeetingsModule
	],
	providers: []
})
export class PagesModule {
}
