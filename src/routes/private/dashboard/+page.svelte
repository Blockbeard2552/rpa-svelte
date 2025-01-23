<script lang="ts">
	import { BookCard } from '$components';
	import { getUserState } from '$lib/state/user-state.svelte';
	import Icon from '@iconify/svelte';

	let userContext = getUserState();
	let { userName, allBooks } = $derived(userContext);
</script>

<div class="dashboard">
	<div class="dashboard-header mb-m">
		<a href="/private/scan-shelf" class="add-book">
			<Icon icon="icons8:plus" width={'72'} height={'72'} />
			<p>Add Book</p>
		</a>
		<div class="headline">
			<h3 class="bold mb-xs">Welcome Back, {userName}</h3>
			<p>Here is some text.</p>
		</div>
	</div>
	{#each allBooks as book}
		<BookCard {book} />
	{/each}
	<!-- Book Categories -->
</div>

<style>
	.dashboard-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		width: 100%;
	}

	.add-book {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.add-book p {
		margin-left: 8px;
	}

	.headline {
		text-align: right;
		max-width: 30%;
		min-width: 300px;
	}
</style>
