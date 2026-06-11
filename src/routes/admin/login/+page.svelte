<script>
	import { enhance } from '$app/forms';
	let isSubmitting = $state(false);

	const { form } = $props();
</script>

<div class="container">
	<h1>Admin Login</h1>
	<p>Sign in to view customer submissions.</p>

	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<form
		method="POST"
		action="?/signIn"
		use:enhance={() => {
			isSubmitting = true;
			return async ({ update }) => {
				isSubmitting = false;
				update();
			};
		}}
	>
		<div class="form-group">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				placeholder="admin@example.com"
				disabled={isSubmitting}
			/>
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				required
				placeholder="••••••••"
				disabled={isSubmitting}
			/>
		</div>

		<button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Signing in...' : 'Sign In'}
		</button>
	</form>

	<p class="back-link"><a href="/">Back to registration form</a></p>
</div>

<style>
	.container {
		max-width: 400px;
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

	.alert-error {
		padding: 1rem;
		margin-bottom: 1.5rem;
		border-radius: 4px;
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
		font-weight: 500;
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

	input {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-family: inherit;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #0066cc;
		box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
	}

	input:disabled {
		background-color: #f5f5f5;
		opacity: 0.6;
		cursor: not-allowed;
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

	.back-link {
		text-align: center;
		margin-top: 1.5rem;
		font-size: 0.9rem;
	}

	.back-link a {
		color: #0066cc;
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}
</style>
