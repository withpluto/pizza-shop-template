<script lang="ts">
  export let text = ''
</script>

{#if text}
  <p class="text-sm text-red-500">{text}</p>
{/if}
