<script lang="ts">
	interface Props {
		color: string;
		size: string;
	}

	let { color, size }: Props = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M19 5L5 19M5.00001 5L19 19"
		stroke={color}
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
