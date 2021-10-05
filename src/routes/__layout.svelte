<script>
  import Footer from '$lib/Footer.svelte'
</script>

<h1>Goblin Namer</h1>
<main>
  <slot />
</main>

<Footer />

<style>
  h1 {
    font-weight: bold;
    font-size: 4rem;
    margin: 1rem;
    padding: 0;
    border-bottom: 1px solid var(--primary-color);
  }
</style>
