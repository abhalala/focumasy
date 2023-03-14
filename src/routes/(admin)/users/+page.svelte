<script lang="ts">
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;

	let deleteUserConfirm = '';

	const { userList } = $page.data;
</script>

<div class="md:flex grid m-3 place-items-center">
	<form
		class="form"
		action="?/register"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				// rerun the `load` function for the page
				invalidateAll();

				// we apply the default action after re-running the load function
				await applyAction(result);
			};
		}}
	>
		<div class="space-y-5 place-items-center grid m-5 p-5 border-2 rounded-lg border-surface-500">
			<h1 class="text-3xl font-extrabold">Register</h1>
			<div>
				<label for="username" class="label"> Username </label>
				<input class="form-input" type="text" name="username" id="username" required />
			</div>
			<div>
				<label for="password" class="label"> Password </label>
				<input class="form-input" type="password" name="password" id="password" required />
			</div>
			<div>
				<label for="role" class="label">Role</label>
				<select class="form-select rounded-lg" name="role" id="role" required>
					<option>WORKER</option>
					<option>MANAGER</option>
					<option>ADMIN</option>
				</select>
			</div>
			{#if form?.user}
				<span class="font-bold text-red-500">Username is already taken.</span>
			{/if}
			{#if form?.success}
				<span class="font-bold text-green-500">User created successfully</span>
			{/if}
			<button type="submit" class="btn bg-surface-500/30 btn-lg font-bold uppercase"
				>Register</button
			>
		</div>
	</form>
	<div class="p-3 m-5 border-2 space-y-5 place-items-center grid rounded-lg border-surface-500">
		<h1 class="md:text-3xl sm:text-md font-extrabold">👨‍💼 Users</h1>
		{#if userList}
			<div
				class="rounded-lg border-2 border-surface-400 bg-surface-800 overflow-x-auto overflow-y-auto relative"
			>
				<table class="table-auto md:text-lg text-sm text-left w-auto">
					<thead class="uppercase md:text-xl text-sm text-accent-400">
						<tr>
							<th scope="col" class="md:py-3 md:px-6 py-1 px-2">Username</th>
							<th scope="col" class="md:py-3 md:px-6 py-1 px-2">Role</th>
							<th scope="col" class="md:py-3 md:px-6 py-1 px-2">Created At</th>
						</tr>
					</thead>
					<tbody class="text-surface-300">
						{#each userList as user}
							<tr>
								<th class="md:py-3 md:px-6 py-1 px-2 text-warning-300 md:whitespace-nowrap"
									>{user.username}</th
								>
								<td class="md:py-3 md:px-6 py-1 px-2 md:whitespace-nowrap"
									>{user.role.toLowerCase()}</td
								>
								<td class="md:py-3 md:px-6 py-1 px-2 md:whitespace-nowrap"
									>{user.createdAt.getDate()}-{user.createdAt.getMonth()}-{user.createdAt.getFullYear()}</td
								>
								{#if user.username !== $page.data.user?.name}
									<td class="md:py-3 md:px-6">
										{#if deleteUserConfirm != user.id}
											<button
												class="btn bg-warning-700 btn-base"
												on:click={() => {
													deleteUserConfirm = user.id;
												}}>🗑️</button
											>
										{:else}
											<form
												action="?/deleteUser"
												method="post"
												use:enhance={() => {
													return async ({ result }) => {
														// rerun the `load` function for the page
														invalidateAll();

														// we apply the default action after re-running the load function
														await applyAction(result);
													};
												}}
											>
												<input
													class="invisible absolute max-w-0"
													type="text"
													bind:value={deleteUserConfirm}
													name="id"
												/>
												<button class="btn bg-green-500 uppercase">✅</button>
											</form>
										{/if}
									</td>
								{:else}
									<td>
										<span
											class="text-accent-500 text-2xl border-2 font-bold rounded-2xl p-1 border-accent-700 bg-accent-300 uppercase"
											>Self</span
										>
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
				{#if form?.deleted === true}
					<span class="font-bold text-green-500">
						{form?.deletedUser.username} is now deleted
					</span>
				{:else if form?.deleted === false}
					<span class="font-bold text-red-500"> There was an error deleting the user </span>
				{/if}
			</div>
		{/if}
	</div>
</div>
