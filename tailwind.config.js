/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			backColor: '#121212',
			containerColor: '#1E1E1E',
			textColor: '#E0E0E0',
			linkColor: '#BB86FC',
			buttonPrimaryColor: '#03DAC6',
			buttonPrimaryTextColor: '#121212',
			buttonSecondaryColor: '#BB86FC',
			buttonSecondaryTextColor: '#FFFFFF',
			errorColor: '#CF6679',
			successColor: '#03DAC6',
			warningColor: '#FDD835',
			infoColor: '#2196F3',
		},
		boxShadow: {
			primaryShadow: '0 0 5px #03DAC6',
			primaryShadowHover: '0 0 10px #03DAC6',
			secondaryShadow: '0 0 5px #BB86FC',
			secondaryShadowHover: '0 0 10px #BB86FC',
		},
	},
	plugins: [],
}
