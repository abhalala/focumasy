<script lang="ts">
	import { TabGroup, Tab, Stepper, Step } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	const storeTab: Writable<string> = writable('a');
	const active: Writable<number> = writable(0);

	const onNewComplete = async () => {
		// todo
		// consola.info('Stepper Completed');
	};
</script>

<div class="md:m-3 place-items-center">
	<div class="w-auto m-2 p-2 md:m-8 md:p-8 space-y-5 border-surface-500 border-2 rounded-lg">
		<h1 class="md:text-3xl sm:text-md font-extrabold">📦 Orders</h1>

		<TabGroup
			selected={storeTab}
			class="border-2 bg-surface-700 border-surface-400 rounded-lg space-x-2 px-1 md:space-x-5 md:px-2 mb-5"
		>
			<Tab value="a">New ✨</Tab>
			<Tab value="b">Active ⏳</Tab>
			<Tab value="c">History ⌛</Tab>
			<Tab value="d">New Client 👤</Tab>
		</TabGroup>

		<div class="border-2 border-surface-400 rounded-lg h-auto w-auto p-2 md:p-3">
			{#if $storeTab === 'a'}
				<div>
					<Stepper {active} length={5} on:complete={onNewComplete}>
						<form action="">
							<Step index={0}>
								<svelte:fragment slot="header" />
								<input type="text" />
							</Step>
							<Step index={1}>
								<svelte:fragment slot="header">Hi</svelte:fragment>
							</Step>
							<Step index={2}>Step 3</Step>
							<Step index={3}>Step 4</Step>
							<Step index={4}>Step 5</Step>
						</form>
					</Stepper>
				</div>
			{/if}

			{#if $storeTab === 'b'}<div>Active</div>{/if}

			{#if $storeTab === 'c'}<div>History</div>{/if}

			{#if $storeTab === 'd'}
				<div>
					<form action="" class="space-y-2">
						<input type="text" name="name" id="name" />
						<button type="submit" class="btn bg-surface-500/30 btn-lg font-bold uppercase"
							>Submit</button
						>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>
