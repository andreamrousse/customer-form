<script>
	import { enhance } from '$app/forms';
	let isSubmitting = $state(false);
	let successMessage = $state('');

	const { form } = $props();
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
				<option value="United States">United States</option>
				<option value="Canada">Canada</option>
				<option value="United Kingdom">United Kingdom</option>
				<option value="Australia">Australia</option>
				<option value="Germany">Germany</option>
				<option value="France">France</option>
				<option value="Japan">Japan</option>
				<option value="India">India</option>
				<option value="Brazil">Brazil</option>
				<option value="Mexico">Mexico</option>
				<option value="Other">Other</option>
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
		padding: 2rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	h1 {
		color: #333;
		margin-bottom: 0.5rem;
	}

	p {
		color: #666;
		margin-bottom: 2rem;
	}

	.alert {
		padding: 1rem;
		margin-bottom: 1.5rem;
		border-radius: 4px;
		font-weight: 500;
	}

	.alert-success {
		background-color: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.alert-error {
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #333;
	}

	input,
	select {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: inherit;
	}

	input:focus,
	select:focus {
		outline: none;
		border-color: #0066cc;
		box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
	}

	input:disabled,
	select:disabled {
		background-color: #f5f5f5;
		cursor: not-allowed;
		opacity: 0.6;
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: #0066cc;
		color: white;
		font-weight: 600;
		font-size: 1rem;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	button:hover:not(:disabled) {
		background-color: #0052a3;
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.admin-link {
		text-align: center;
		margin-top: 2rem;
		font-size: 0.9rem;
	}

	.admin-link a {
		color: #0066cc;
		text-decoration: none;
	}

	.admin-link a:hover {
		text-decoration: underline;
	}
</style>
