export const rawPackages = [
	'sass',
	'sharp',
	'@tailwindcss/aspect-ratio',
	'@tailwindcss/line-clamp',
	'@tailwindcss/forms',
	'tailwindcss-golden-ratio',
	'@next/font',
	'vercel',
	'react-icons',
	'class-variance-authority'
];

export const packageArray = rawPackages.sort();

export const packages = packageArray.join(' ');

export default packages;
