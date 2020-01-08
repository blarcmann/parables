export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': []
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: 'dashboard',
					bullet: 'dot',
				},
				{
					title: 'Parables',
					page: 'parables/parables',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-pie-chart-3',
				},

				{
					title: 'Adverts',
					root: true,
					icon: 'flaticon2-rhombus',
					page: 'adverts/adverts',
					bullet: 'dot',
				},
				{
					title: 'Quiz',
					page: 'quizes/quizes',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-delivery-package',
				}
				// {
				// 	title: 'Quiz',
				// 	page: 'computations',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon-users',
				// 	submenu: [
				// 		{
				// 			title: 'Recurring expenditure',
				// 			page: 'computations/recurring-expenditure',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon-users',
				// 		},
				// 		{
				// 			title: 'Capital expenditure',
				// 			page: 'computations/capital-expenditure',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon-chat-1',
				// 		},
				// 		{
				// 			title: 'Expenses/TurnoverRatio',
				// 			page: 'computations/expenses-turnover',
				// 			root: true,
				// 			bullet: 'dot',
				// 			icon: 'flaticon-graphic-2',
				// 		},
				// 		{
				// 			title: 'ICT/ maturity score',
				// 			page: 'computations',
				// 			bullet: 'dot',
				// 			icon: 'flaticon2-digital-marketing',
				// 			root: true,
				// 		}
				// 	]
				// },
				// {
				// 	title: 'Access logs',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon-graphic-2',
				// 	page: 'logs'
				// },
				// {
				// 	title: 'Organization Settings',
				// 	page: 'organizations',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon-signs-1',
				// },
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
