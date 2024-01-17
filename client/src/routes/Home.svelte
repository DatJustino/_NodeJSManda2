<script>
	export let name = "Guest";
</script>

<main>
	<h1>Welcome to our website, {name}!</h1>
	<p>Thank you for visiting. We hope you enjoy your stay.</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
		font-family: Arial, sans-serif;
	}

	h1 {
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
	}

	nav {
		margin-top: 2rem;
	}

	a {
		margin-right: 1rem;
		text-decoration: none;
		color: blue;
	}
</style>
