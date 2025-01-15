<script lang="ts">
	import type { Snippet } from 'svelte';

	interface BasicProps {
		children: Snippet;
		isSecondary?: boolean;
		isDanger?: boolean;
		isMenu?: boolean;
	}

	interface ButtonProps extends BasicProps {
		onclick?: (e: MouseEvent) => void;
		href?: never;
		type?: 'submit' | 'button';
	}

	interface LinkProps extends BasicProps {
		href: string;
		onclick?: never;
	}

	type ComponentProps = ButtonProps | LinkProps;

	let { children, href, onclick, isSecondary, isDanger, isMenu, ...props }: ComponentProps =
		$props();
</script>

{#if href}
	<a
		{href}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-danger={isDanger}
		class:btn-menu={isMenu}
	>
		{@render children()}
	</a>
{:else}
	<button
		{...props}
		{onclick}
		class="btn"
		class:btn-secondary={isSecondary}
		class:btn-danger={isDanger}
		class:btn-menu={isMenu}
	>
		{@render children()}
	</button>
{/if}

<style>
	a {
		display: block;
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}

	.btn {
		padding: 0.375rem 0.75rem;
		min-width: 230px;
		text-align: center;
		background-color: black;
		color: white;
		border: white;
		border-radius: 8px;
		font-weight: normal;
		font-size: 22px;
	}

	.btn-secondary {
		background-color: white;
		color: black;
		border: black;
	}

	.btn-danger {
		background-color: red;
	}

	.btn-menu {
		min-width: 150px;
		padding: 8px 20px;
	}
</style>
