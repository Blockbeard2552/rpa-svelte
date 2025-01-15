<script lang="ts">
	import hero from '$assets/hero.png';
	import { Button } from '$components';
</script>

<div class="hero-image" style="background-image: url({hero});">
	<section class="default-margin hero">
		<div class="hero-text">
			<h1>RPA Cargo</h1>
			<h3>Quality enclosed cargo trailers custom built to your specifications</h3>
			<h4 class="mt-l">
				We can design and build an enclosed cargo trailer for you in less than 2 weeks
			</h4>
			<h4 class="mb-s">Five Year Warranty</h4>
			<Button href="/register">Sign Up</Button>
		</div>
	</section>
</div>

<style>
	.hero {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		height: 100vh;
		margin-top: -100px;
		padding-top: 200px;
	}

	.hero-image {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 100vw;
		opacity: 85%;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		color: white;
	}
</style>
