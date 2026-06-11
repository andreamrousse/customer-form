<script>
	import { enhance } from '$app/forms';

	const { data } = $props();

	function formatDate(date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="container">
	<div class="header">
		<h1>Customer Submissions</h1>
		<form method="POST" action="?/signOut" use:enhance>
			<button type="submit" class="sign-out-btn">Sign Out</button>
		</form>
	</div>

	<p class="user-info">Welcome, {data.user.name || data.user.email}</p>

	{#if data.submissions.length === 0}
		<div class="empty-state">
			<p>No submissions yet.</p>
		</div>
	{:else}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Country</th>
						<th>Submitted</th>
					</tr>
				</thead>
				<tbody>
					{#each data.submissions as submission (submission.id)}
						<tr>
							<td>{submission.name}</td>
							<td>{submission.email}</td>
							<td>{submission.country}</td>
							<td>{formatDate(submission.createdAt)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<p class="count">Total submissions: {data.submissions.length}</p>
	{/if}

	<p class="back-link">
		<a href="/">Back to registration form</a>
	</p>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: var(--spacing-xl);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xl);
		gap: var(--spacing-xl);
	}

	h1 {
		color: var(--color-text);
		margin: 0;
		flex: 1;
		font-size: var(--font-size-lg);
	}

	.sign-out-btn {
		padding: var(--spacing-xs) var(--spacing-md);
		background-color: var(--color-danger);
		color: white;
		font-weight: 600;
		border: none;
		border-radius: var(--border-radius);
		cursor: pointer;
		transition: background-color 0.2s;
		white-space: nowrap;
	}

	.sign-out-btn:hover {
		background-color: var(--color-danger-hover);
	}

	.user-info {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
		font-size: 0.95rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: var(--color-gray-lighter);
		background-color: var(--color-gray-light);
		border-radius: var(--border-radius);
	}

	.table-wrapper {
		overflow-x: auto;
		margin-bottom: var(--spacing-xl);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background-color: var(--color-table-header-bg);
	}

	th {
		padding: var(--spacing-md);
		text-align: left;
		font-weight: 600;
		color: var(--color-text);
		border-bottom: 2px solid var(--color-border);
	}

	td {
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border-subtle);
		color: #555;
	}

	tr:hover {
		background-color: var(--color-hover-bg);
	}

	.count {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-xl);
	}

	.back-link {
		text-align: center;
		font-size: 0.9rem;
	}

	.back-link a {
		color: var(--color-primary);
		text-decoration: none;
	}

	.back-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.header {
			flex-direction: column;
			align-items: stretch;
		}

		.sign-out-btn {
			width: 100%;
		}

		th,
		td {
			padding: var(--spacing-sm);
			font-size: 0.9rem;
		}
	}
</style>
