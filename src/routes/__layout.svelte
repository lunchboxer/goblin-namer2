<script>
  import Footer from '$lib/Footer.svelte'
</script>

<h1>Goblin Namer</h1>
<main>
  <slot />
</main>

<Footer />

<style>
  main {
    margin: 0;
  }
  h1 {
    margin: 0;
    font-weight: bold;
    padding: 0;
    font-size: 10rem;
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
