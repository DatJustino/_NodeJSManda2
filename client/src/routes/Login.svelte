<!-- src/routes/Login.svelte -->
<script>
	import { isAuthenticated } from "./stores/auth.js";
	let email = "";
	let password = "";
	let error = "";
	let isLoading = false;
	let isLoggedIn = false;

	async function handleSubmit() {
		isLoading = true;
		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
				credentials: "include",
			});

			if (response.ok) {
				console.log("Login successful");
				isAuthenticated.set(true);
				isLoggedIn = true; //userstore
			} else {
				const data = await response.json();
				error = data.message;
				console.error("Login error:", error);
			}
		} catch (err) {
			error = "Network error";
			console.error("Network error:", err);
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="container">
	<form class="form" on:submit|preventDefault={handleSubmit}>
		<input type="text" placeholder="Email" bind:value={email} />
		<input type="password" placeholder="Password" bind:value={password} />
		<button type="submit" disabled={isLoading}>Login</button>
		{#if isLoading}
			<p>Loading...</p>
		{/if}
		{#if error}
			<p class="error">{error}</p>
		{/if}
		{#if isLoggedIn}
			<p class="success">Login successful!</p>
		{/if}
	</form>
</div>

<style>
	p {
		color: rgb(182, 27, 136);
	}
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #f5f5f5;
	}

	.form input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.form button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: #fff;
		cursor: pointer;
	}

	.error {
		color: red;
		margin-top: 0.5rem;
	}

	.success {
		color: green;
		margin-top: 0.5rem;
	}
</style>
