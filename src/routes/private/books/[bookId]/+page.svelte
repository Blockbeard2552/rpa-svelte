<script lang="ts">
	import { Button, StarRating } from '$components';
	import { getUserState, type Book } from '$lib/state/user-state.svelte';
	import Icon from '@iconify/svelte';

	interface BookPageProps {
		data: {
			book: Book;
		};
	}

	let { data }: BookPageProps = $props();
	let userContext = getUserState();
	let book = $derived(userContext.getBookById(data.book.id) || data.book);
	let isEditMode = $state(false);

	let title = $state(data.book.title);
	let author = $state(data.book.author);
	let description = $state(data.book.description || '');
	let genre = $state(data.book.genre || '');

	function goBack() {
		history.back();
	}

	async function toggleEditModeAndSaveToDatabase() {
		if (isEditMode) {
			await userContext.updateBook(book.id, {
				title,
				author,
				description,
				genre
			});
		}

		isEditMode = !isEditMode;
	}

	async function updateReadingStatus() {
		const hasStartedReading = Boolean(book.started_reading_on);
		const currentTimeStamp = new Date().toISOString();

		if (hasStartedReading) {
			await userContext.updateBook(book.id, { finished_reading_on: currentTimeStamp });
		} else {
			await userContext.updateBook(book.id, { started_reading_on: currentTimeStamp });
		}
	}

	async function updateDatabaseRating(newRating: number) {
		await userContext.updateBook(book.id, { rating: newRating });
	}
</script>

{#snippet bookInfo()}
	<h2 class="book-title mt-m">{book.title}</h2>
	<p class="book-author">{book.author}</p>
	<h4 class="mt-m mb-xs semi-bold">Your Rating</h4>
	<StarRating value={book.rating || 0} {updateDatabaseRating} />
	<p class="small-font">
		Click to {book.rating ? 'change' : 'give'} rating
	</p>
	{#if book.description}
		<h4 class="mt-m mb-xs semi-bold">Description</h4>
		<p class="mb-m">{book.description}</p>
	{:else}
		<h4 class="mt-m mb-xs semi-bold">No description yet.</h4>
		<button class="block mb-m" onclick={() => console.log('Toggle on the edit mode')}>
			<p>Click to add one.</p>
		</button>
	{/if}
	{#if !book.finished_reading_on}
		<Button isSecondary={Boolean(book.started_reading_on)} onclick={updateReadingStatus}>
			{book.started_reading_on ? 'I finished reading this book!' : 'I started reading this book.'}
		</Button>
	{/if}
	{#if book.genre}
		<h4 class="mt-m mb-xs semi-bold">Genre</h4>
		<p>{book.genre}</p>
	{/if}
{/snippet}

{#snippet editFields()}
	<form>
		<input class="input input-title mt-m mb-xs" bind:value={title} type="text" name="title" />
		<div class="input-author">
			<input class="input" bind:value={author} type="text" name="author" />
		</div>
		<h4 class="mt-m mb-xs semi-bold">Your Rating</h4>
		<StarRating value={book.rating || 0} {updateDatabaseRating} />
		<p class="small-font">
			Click to {book.rating ? 'change' : 'give'} rating
		</p>
		<h4 class="mt-m mb-xs semi-bold">Description</h4>
		<textarea
			class="text-area"
			bind:value={description}
			name="description"
			placeholder="Give a description."
		></textarea>
		{#if !book.finished_reading_on}
			<Button isSecondary={Boolean(book.started_reading_on)} onclick={updateReadingStatus}>
				{book.started_reading_on ? 'I finished reading this book!' : 'I started reading this book.'}
			</Button>
		{/if}
		{#if book.genre}
			<h4 class="mt-m mb-xs semi-bold">Genre</h4>
			<p>{book.genre}</p>
		{/if}
		<h4 class="mt-m mb-xs semi-bold">Genre</h4>
		<input class="input" type="text" bind:value={genre} name="genre" />
	</form>
{/snippet}

<div class="book-page">
	<button onclick={goBack} aria-label="Go Back">
		<Icon icon="ep:back" width={40} />
	</button>
	<div class="book-container">
		<div class="book-info">
			{#if isEditMode}
				{@render editFields()}
			{:else}
				{@render bookInfo()}
			{/if}
			<div class="buttons-container mt-m">
				<Button isSecondary={true} onclick={toggleEditModeAndSaveToDatabase}>
					{isEditMode ? 'Save changes' : 'Edit'}
				</Button>
				<Button isDanger={true} onclick={() => console.log('Delete the book')}>Delete</Button>
			</div>
		</div>
		<div class="book-cover">
			{#if book.cover_image}
				<img src={book.cover_image} alt={book.title} />
			{:else}
				<button class="add-cover">
					<Icon icon="bi:camera-fill" width={'40'} />
					<p>Add Cover</p>
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.book-container {
		display: flex;
		justify-content: flex-start;
	}

	.book-info {
		width: 50%;
	}

	.book-cover {
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 15px;
		min-height: 400px;
		min-width: 350px;
		max-width: 450px;
		margin-left: 80px;
	}

	.book-cover img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}

	.add-cover {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.input {
		padding: 8px 4px;
		width: 100%;
	}

	.text-area {
		width: 100%;
	}

	.input-title {
		font-size: 60px;
		font-weight: bold;
		font-family: 'EB Garamond', serif;
	}

	.input-author {
		display: flex;
		align-items: center;
	}
</style>
