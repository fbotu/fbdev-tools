/**
 * Input prompt example
 */

import inquirer from 'inquirer';
// import chalkPipe from 'chalk-pipe';

const questions = [
	{
		type: 'input',
		name: 'message',
		message: "What's your message?"
	}
];

export const gpush = () => {
	inquirer.prompt(questions).then(answers => {
		// console.log(JSON.stringify(answers, null, '  '));
		console.log(answers);
	});
};

export default gpush;
