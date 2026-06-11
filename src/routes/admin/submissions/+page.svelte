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
		padding: 2rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		gap: 2rem;
	}

	h1 {
		color: #333;
		margin: 0;
		flex: 1;
	}

	.sign-out-btn {
		padding: 0.5rem 1rem;
		background-color: #dc3545;
		color: white;
		font-weight: 600;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
		white-space: nowrap;
	}

	.sign-out-btn:hover {
		background-color: #c82333;
	}

	.user-info {
		color: #666;
		margin-bottom: 2rem;
		font-size: 0.95rem;
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: #999;
		background-color: #f9f9f9;
		border-radius: 4px;
	}

	.table-wrapper {
		overflow-x: auto;
		margin-bottom: 2rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background-color: #f5f5f5;
	}

	th {
		padding: 1rem;
		text-align: left;
		font-weight: 600;
		color: #333;
		border-bottom: 2px solid #ddd;
	}

	td {
		padding: 1rem;
		border-bottom: 1px solid #e9e9e9;
		color: #555;
	}

	tr:hover {
		background-color: #fafafa;
	}

	.count {
		font-size: 0.9rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.back-link {
		text-align: center;
		font-size: 0.9rem;
	}

	.back-link a {
		color: #0066cc;
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
			padding: 0.75rem;
			font-size: 0.9rem;
		}
	}
</style>
