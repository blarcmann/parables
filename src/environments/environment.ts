// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// BASE_URL: 'http://back.stellarshare.com/v1',

export const environment = {
	production: false,
	isMockEnabled: true, // You have to switch this, when your real back-end is done
	authTokenKey: 'authce9d77b308c149d5992a80073637e4d5',
	// BASE_URL: 'http://3.18.101.76:3073/v1',
	BASE_URL: 'http://159.89.85.116/v1',
	firebase: {
		apiKey: 'AIzaSyANb3KqWvUn-iVKq9JqC4KXCxYgSru71wg',
		authDomain: 'strada-crm.firebaseapp.com',
		databaseURL: 'https://strada-crm.firebaseio.com',
		projectId: 'strada-crm',
		storageBucket: '',
		messagingSenderId: '244695737586'
	}
};
