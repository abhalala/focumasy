<script lang="ts">
	// REQUIRED
	import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import Fa from 'svelte-fa';
	import { AppBar, AppRail, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { type Writable, writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { faBars } from '@fortawesome/free-solid-svg-icons';

	const storeValue: Writable<number> = writable(0);
	const sideBarLeft: Writable<boolean> = writable(true);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button
					class="px-2 btn"
					on:click={() => {
						sideBarLeft.set(!$sideBarLeft);
					}}
				>
					<Fa icon={faBars} size="1.5x" />
				</button>
			</svelte:fragment>
			<!-- {$page.data.title} -->
			<svelte:fragment slot="trail">
				{#if $page.data.user}
					<form
						action="/logout"
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
						<button class="btn bg-surface-500/30 md:btn-lg font-bold uppercase">Logout</button>
					</form>
				{:else if $page.url.pathname !== '/login'}
					<a href="/login" class="btn bg-surface-500/30 btn-lg font-bold uppercase">Login</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $page.data.tiles && $sideBarLeft}
			<AppRail selected={storeValue}>
				{#each $page.data.tiles as tile}
					<AppRailTile
						label={tile.title}
						value={0}
						tag="a"
						href={tile.url}
						class={tile.url === $page.url.pathname ? 'bg-primary-500' : ''}
					>
						{tile.icon}
					</AppRailTile>
				{/each}
			</AppRail>
		{/if}
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<slot />
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
