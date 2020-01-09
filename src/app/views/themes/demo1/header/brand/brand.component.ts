// Angular
import { AfterViewInit, Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService, ToggleOptions } from '../../../../../core/_base/layout';
import { HtmlClassService } from '../../html-class.service';
import { Location } from '@angular/common';

@Component({
	selector: 'kt-brand',
	templateUrl: './brand.component.html',
	styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit, AfterViewInit {
	// Public properties
	headerLogo: string;
	setBackground = '';
	headerStickyLogo: string;
	brandIcon = './assets/media/logos/logo.png';
	orgDetails;
	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-aside--minimize',
		togglerState: 'kt-aside__brand-aside-toggler--active'
	};

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param htmlClassService: HtmlClassService
	 */
	constructor(private layoutConfigService: LayoutConfigService, private location: Location, public htmlClassService: HtmlClassService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.setBackground = '#2c2e3e';
		this.headerLogo = this.layoutConfigService.getLogo();
		this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
	}

	/**
	 * On destroy
	 */
	ngAfterViewInit(): void {
	}
}
