<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type {} from '@prisma/client';
	import { TabGroup, Tab, Stepper, Step } from '@skeletonlabs/skeleton';

	import { writable, type Writable } from 'svelte/store';
	const storeTab: Writable<number> = writable(0);
</script>

<div class="border-2 p-2 m-2 md:p-5 md:m-5 rounded-lg border-surface-500">
	<TabGroup
		selected={storeTab}
		class="border-2 bg-surface-700 flex justify-center border-surface-400 rounded-lg space-x-2 px-1 md:space-x-5 md:px-2 mb-5"
	>
		<Tab value={0}>New Bundle</Tab>

		<Tab value={1}>History</Tab>
	</TabGroup>
	<div class="border-2 p-2 md:p-5 rounded-lg border-surface-500">
		{#if $storeTab === 0}
			<form
				action="?/createBundle"
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
				<div class="space-y-2">
					<div>
						<label for="len"> Cut Length </label>
						<input type="number" name="len" id="len" />
					</div>
					<div>
						<label for="quantity"> Quantity </label>
						<input type="number" name="quantity" id="quantity" />
					</div>
					<div>
						<label for="weight"> Weight </label>
						<input type="number" name="weight" id="weight" />
					</div>
					<div>
						<label for="cast"> Cast </label>
						<input type="number" name="cast" id="cast" />
					</div>
					<div>
						<label for="orderId"> Order ID </label>
						<input type="number" name="orderId" id="orderId" />
					</div>
					<button class="btn bg-surface-500/30 md:btn-lg font-bold uppercase"> Submit </button>
				</div>
			</form>
		{:else if $storeTab === 1}
			<!-- History of Bundles -->
			A history list of all the previous bundles by bundle no
		{/if}
	</div>
</div>
