<script>
	import Home from "./routes/Home.svelte";
	import Register from "./routes/Register.svelte";
	import Login from "./routes/Login.svelte";
	import MembersOnly from "./routes/MembersOnly.svelte";
	import { isAuthenticated } from "./routes/stores/auth.js";

	let currentPage = "home";
</script>

<nav>
	<button on:click={() => (currentPage = "home")}>Home</button>
	<button on:click={() => (currentPage = "register")}>Register</button>
	<button on:click={() => (currentPage = "login")}>Login</button>
	<button on:click={() => (currentPage = "membersOnly")}>Members Only</button>
</nav>

{#if currentPage === "home"}
	<Home />
{:else if currentPage === "register"}
	<Register />
{:else if currentPage === "login"}
	<Login />
{:else if currentPage === "membersOnly"}
	{#if $isAuthenticated}
		<MembersOnly />
	{:else}
		<p>You must be logged in to view this page.</p>
	{/if}
{/if}
