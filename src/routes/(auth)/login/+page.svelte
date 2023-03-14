<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form class="p-2" action="?/login" method="POST">
	<div class="space-y-2 place-items-center grid p-2 border-2 rounded-lg border-surface-500">
		<h1 class="text-3xl font-extrabold">Login</h1>
		<div>
			<label for="username" class="label"> Username </label>
			<input class="form-input" type="text" name="username" id="username" required />
		</div>
		<div>
			<label for="password" class="label"> Password </label>
			<input class="form-input" type="password" name="password" id="password" required />
		</div>
		{#if form?.invalid}
			<span class="font-bold text-red-500">Username and password is required.</span>
		{/if}

		{#if form?.credentials}
			<span class="font-bold text-red-500">Bad username or password.</span>
		{/if}
		<button type="submit" class="btn bg-surface-500/30 btn-lg font-bold uppercase">Login</button>
	</div>
</form>
