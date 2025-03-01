<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		className?: string;
		styleName?: string;
		element?: HTMLDivElement;
		children?: Snippet;
	}

	let {
		className = '',
		styleName = '',
		children,
		element = $bindable(),
		...rest
	}: Props = $props();

	let mouseIn = false;
	let isMidScroll = false;
	let isMobile = false;
	let prevDelta = 0;
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div
	role="presentation"
	bind:this={element}
	onmousemove={() => (mouseIn = true)}
	onmouseleave={() => (mouseIn = false)}
	ontouchmove={(e) => {
		if (isMidScroll && e.touches.length === 1) {
			e.currentTarget.dispatchEvent(new TouchEvent('touchend'));
			e.stopPropagation();
			return;
		}
	}}
	ontouchstart={(e) => {
		isMobile = true;
		if (isMidScroll && e.touches.length === 1) e.stopPropagation();
	}}
	onscroll={(e) => {
		if (isMobile) {
			const el = e.currentTarget;
			if (el.scrollTop < 1 || el.scrollTop + el.clientHeight >= el.scrollHeight - 1)
				isMidScroll = false;
			else isMidScroll = true;
		}
	}}
	onwheel={(e) => {
		isMobile = false;
		if (e.ctrlKey || !mouseIn) return;
		const el = e.currentTarget;
		const isScrollingUp = e.deltaY < 0;
		const isScrollingDown = e.deltaY > 0;

		if (
			(isScrollingUp && el.scrollTop < 1) ||
			(isScrollingDown && el.scrollTop + el.clientHeight >= el.scrollHeight - 1)
		) {
			if (Math.abs(e.deltaY) <= prevDelta) {
				e.stopPropagation();
			} else mouseIn = false;
		} else {
			e.stopPropagation();
		}
		prevDelta = Math.abs(e.deltaY);
	}}
	class="scrollbar-custom overflow-auto overscroll-none [&::-webkit-scrollbar-track]:bg-[#0000] {className}"
	style="scrollbar-color: #6e6e6e #0000; {styleName}"
	{...rest}
>
	{@render children?.()}
</div>

<style>
	:global(.scrollbar-custom::-webkit-scrollbar) {
		-webkit-appearance: none;
		width: 8px;
	}

	:global(.scrollbar-custom::-webkit-scrollbar-track) {
		background-color: transparent;
		background: none;
	}

	:global(.scrollbar-custom::-webkit-scrollbar-thumb) {
		background-color: #6e6e6e;
		border-radius: 4px;
	}
</style>
