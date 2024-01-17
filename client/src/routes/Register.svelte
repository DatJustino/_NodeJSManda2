<!-- src/routes/Register.svelte -->
<script>
	let email = "";
	let password = "";
	let registrationStatus = "";

	async function register() {
		const response = await fetch("http://localhost:8080/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			registrationStatus = "success";
			console.log("User registered");
		} else {
			registrationStatus = "error";
			console.error("Registration failed");
		}
	}
</script>

<div class="container">
	<h1>Register</h1>
	<form class="form" on:submit|preventDefault={register}>
		<input
			class="form-input"
			type="email"
			bind:value={email}
			placeholder="Email"
		/>
		<input
			class="form-input"
			type="password"
			bind:value={password}
			placeholder="Password"
		/>
		<button class="form-button" type="submit">Register</button>
	</form>

	{#if registrationStatus === "success"}
		<p class="success">Registration successful!</p>
	{/if}

	{#if registrationStatus === "error"}
		<p class="error">Registration failed. Please try again.</p>
	{/if}
</div>

<style>
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

	.form-input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.form-button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: #fff;
		cursor: pointer;
	}

	.success {
		color: green;
		margin-top: 0.5rem;
	}

	.error {
		color: red;
		margin-top: 0.5rem;
	}
</style>
