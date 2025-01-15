<script lang="ts">
	import Button from '$components/Button.svelte';
</script>

<header>
	<a href="/">
		<img
			class="logo"
			src={'https://res.cloudinary.com/dz6c3v3tr/image/upload/v1735773584/navLogo_119x48_mbb5db.png'}
			alt="logo"
		/>
	</a>
	<nav>
		<ul>
			<li>
				<Button isMenu={true} href="/register">Create Account</Button>
			</li>
			<li>
				<Button isMenu={true} isSecondary={true} href="/login">Login</Button>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 4vw;
	}

	ul {
		display: flex;
		column-gap: 24px;
	}

	.logo {
		height: 72px;
	}
</style>
