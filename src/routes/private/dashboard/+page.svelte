<script lang="ts">
	import { BookCard, BookCategory, StarRating } from '$components';
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
	<BookCategory
		booksToDisplay={userContext.getHighestRatedBooks()}
		categoryName={'Your favorite books'}
	/>
	<BookCategory
		booksToDisplay={userContext.getUreadBooks()}
		categoryName={'Recently added, unread books'}
	/>
	<BookCategory
		booksToDisplay={allBooks.slice(0, 10)}
		categoryName={`Your favorite books from your favorite genre: ${userContext.getFavoriteGenre()}`}
	/>
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
