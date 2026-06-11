import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { submissions } from '$lib/server/db/schema';
import { env } from '$env/dynamic/private';

type CountryEntry = { flag: string; name: string };

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export const load: PageServerLoad = async () => {
	let countries: CountryEntry[] = [];
	try {
		const res = await fetch(`${env.REST_COUNTRIES_URL}/countries/flag/unicode`);
		if (res.ok) {
			const json = await res.json();
			countries = (json.data as { name: string; unicodeFlag: string }[])
				.map((c) => ({ flag: c.unicodeFlag, name: c.name }))
				.sort((a, b) => a.name.localeCompare(b.name));
		}
	} catch (e) {
		console.error('Failed to fetch countries:', e);
	}
	return { countries };
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const name = formData.get('name')?.toString().trim() ?? '';
		const email = formData.get('email')?.toString().trim() ?? '';
		const country = formData.get('country')?.toString() ?? '';

		// Validation
		if (!name) {
			return fail(400, { error: 'Name is required' });
		}
		if (!email) {
			return fail(400, { error: 'Email is required' });
		}
		if (!isValidEmail(email)) {
			return fail(400, { error: 'Please enter a valid email address' });
		}
		if (!country) {
			return fail(400, { error: 'Country is required' });
		}

		try {
			await db.insert(submissions).values({
				name,
				email,
				country
			});
			return { success: true };
		} catch (error) {
			console.error('Error inserting submission:', error);
			return fail(500, { error: 'Failed to submit form. Please try again.' });
		}
	}
};
