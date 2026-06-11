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
		padding: var(--spacing-xl);
	}

	h1 {
		color: var(--color-text);
		margin-bottom: var(--spacing-xs);
		font-size: var(--font-size-lg);
	}

	p {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	.alert-error {
		padding: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
		border-radius: var(--border-radius);
		background-color: var(--color-error-bg);
		color: var(--color-error-text);
		border: 1px solid var(--color-error-border);
		font-weight: 500;
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

	input {
		width: 100%;
		padding: var(--spacing-sm);
		font-size: var(--font-size-base);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
		font-family: inherit;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: var(--color-primary);
		box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
	}

	input:disabled {
		background-color: var(--color-disabled-bg);
		opacity: 0.6;
		cursor: not-allowed;
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

	.back-link {
		text-align: center;
		margin-top: var(--spacing-lg);
		font-size: 0.9rem;
	}

	.back-link a {
		color: var(--color-primary);
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}
</style>
