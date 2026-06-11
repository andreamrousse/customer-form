import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { submissions } from '$lib/server/db/schema';

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

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
