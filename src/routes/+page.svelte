<script>
	import { enhance } from '$app/forms';
	let isSubmitting = $state(false);
	let successMessage = $state('');

	const { form, data } = $props();
</script>

<div class="container">
	<h1>Customer Registration</h1>
	<p>Sign up to get in touch with us. We'd love to hear from you!</p>

	{#if successMessage}
		<div class="alert alert-success">
			{successMessage}
		</div>
	{/if}

	{#if form?.error}
		<div class="alert alert-error">
			{form.error}
		</div>
	{/if}

	<form
		method="POST"
		use:enhance={() => {
			isSubmitting = true;
			return async ({ result }) => {
				isSubmitting = false;
				if (result.type === 'success') {
					successMessage = 'Thank you for registering! We will be in touch soon.';
					document.querySelector('form')?.reset();
					setTimeout(() => {
						successMessage = '';
					}, 5000);
				}
			};
		}}
	>
		<div class="form-group">
			<label for="name">Full Name *</label>
			<input
				type="text"
				id="name"
				name="name"
				required
				placeholder="John Doe"
				disabled={isSubmitting}
			/>
		</div>

		<div class="form-group">
			<label for="email">Email Address *</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				placeholder="you@example.com"
				disabled={isSubmitting}
			/>
		</div>

		<div class="form-group">
			<label for="country">Country *</label>
			<select id="country" name="country" required disabled={isSubmitting}>
				<option value="">Select a country</option>
				{#each data.countries as country (country.name)}
					<option value={country.name}>{country.flag} {country.name}</option>
				{/each}
			</select>
		</div>

		<button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Submitting...' : 'Register'}
		</button>
	</form>

	<p class="admin-link">
		<a href="/admin/submissions">View submissions (admin only)</a>
	</p>
</div>

<style>
	.container {
		max-width: 500px;
		margin: 0 auto;
		padding: var(--spacing-xl);
	}

	h1 {
		color: var(--color-text);
		margin-bottom: var(--spacing-xs);
		font-size: var(--font-size-lg);
	}

	p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-lg);
	}

	.alert {
		padding: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
		border-radius: var(--border-radius);
		font-weight: 500;
	}

	.alert-success {
		background-color: var(--color-success-bg);
		color: var(--color-success-text);
		border: 1px solid var(--color-success-border);
	}

	.alert-error {
		background-color: var(--color-error-bg);
		color: var(--color-error-text);
		border: 1px solid var(--color-error-border);
	}

	.form-group {
		margin-bottom: var(--spacing-lg);
	}

	label {
		display: block;
		margin-bottom: var(--spacing-xs);
		font-weight: 600;
		color: var(--color-text);
	}

	input,
	select {
		width: 100%;
		padding: var(--spacing-sm);
		font-size: var(--font-size-base);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		font-family: inherit;
	}

	input:focus,
	select:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
	}

	input:disabled,
	select:disabled {
		background-color: var(--color-disabled-bg);
		cursor: not-allowed;
		opacity: 0.6;
	}

	button {
		width: 100%;
		padding: var(--spacing-sm);
		background-color: var(--color-primary);
		color: white;
		font-weight: 600;
		font-size: var(--font-size-base);
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover:not(:disabled) {
		background-color: var(--color-primary-hover);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.admin-link {
		text-align: center;
		margin-top: var(--spacing-xl);
		font-size: 0.9rem;
	}

	.admin-link a {
		color: var(--color-primary);
		text-decoration: none;
	}

	.admin-link a:hover {
		text-decoration: underline;
	}
</style>
