#!/usr/bin/env node

/**
 * fbdev
 * fbdev helper
 *
 * @author FBDev <https://francisbotu.com>
 */

import { exec } from 'node:child_process';
import clearConsole from 'clear';
import figlet from 'figlet';
import gradient from 'gradient-string';
import ora from 'ora';
import inquirer from 'inquirer';

import init from './utils/init.js';
import cli from './utils/cli.js';
import log from './utils/log.js';

import { packages, packageArray } from './data/packages.mjs';

const spinner = ora('Installation In Progress');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const Log = log => {
	process.stdout.write(log);
};

const Heading = message => {
	figlet(`${message}`, function (err, data) {
		console.log(gradient.pastel.multiline(data));
	});

	setTimeout(() => {
		console.log(`\n   ${packageArray.join('\n   ')}`);
		console.log(`\n`);
	}, 1000);
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	// * Variables
	let userInstaller;

	// Ask the user's package installer and install the packages
	if (input.includes('npm')) {
		inquirer
			.prompt([
				{
					type: 'checkbox',
					message: 'Select your package manager',
					name: 'installer',
					choices: [
						{
							name: 'npm'
						},
						{
							name: 'yarn'
						},
						{
							name: 'pnpm'
						}
					],
					validate(answer) {
						if (answer.length < 1 || answer.length > 1) {
							return 'Please select one option.';
						}
						return true;
					}
				}
			])
			.then(answers => {
				Log(`\nYou have selected ${answers.installer[0]}\n`);

				const expr = answers.installer[0];
				switch (expr) {
					case 'npm':
						userInstaller = `${expr} install`;
						break;
					case 'yarn':
						userInstaller = `${expr} add`;
						break;
					case 'pnpm':
						userInstaller = `${expr} add`;
						break;
					default:
						userInstaller = `npm install`;
				}

				// Log(userInstaller);

				Heading('Installing the following packages:');

				setTimeout(() => {
					if (input.includes('npm') && userInstaller) {
						spinner.start();
						exec(
							`${userInstaller} ${packages}`,
							(error, stdout, stderr) => {
								if (error) {
									console.error(`exec error: ${error}`);
									return;
								}
								console.log('\n');

								console.log(`${stdout}`);
								console.error(`${stderr}`);
								process.exit();
							}
						);
						Log(userInstaller);
					} else Log('No installer selected');

					process.on('exit', function () {
						input.includes('npm') &&
							spinner.succeed('Successfully Installed');
					});
				}, 2000);
			});
	}

	// ! If no arguments are passed
	!input ? console.log('No args specified\n\n') : 'null';

	debug && log(flags);
})();
