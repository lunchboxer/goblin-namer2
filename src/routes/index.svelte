<script>
  import { onMount } from 'svelte'
  import rwc from 'random-weighted-choice'

  onMount(async () => {
    boyNames = await getNamesList(year, 'M')
    girlNames = await getNamesList(year, 'F')
  })

  // default settings
  const minYear = 1880
  const maxYear = 2020
  let year = maxYear
  let weighting = 3
  let percentage = 3

  let name = ''
  let boyNames = []
  let girlNames = []
  let gender = 'F'

  // year : four digit year from 1880-2016
  const getNamesList = async (year, gender) => {
    const FILENAME = 'names/yob' + year + '-' + gender + '.json'
    const request = new Request(FILENAME, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const result = response && (await response.json())
    return result
  }
  const fetchNewNames = async () => {
    boyNames = await getNamesList(year, 'M')
    girlNames = await getNamesList(year, 'F')
  }

  const cropList = (namesList, percentage) => {
    const newLength = Math.ceil(namesList.length * (percentage / 100))
    return namesList.slice(0, newLength)
  }

  const getSingleName = (namesList, percentage, weighting) => {
    if (!Array.isArray(namesList)) return
    const someNames = cropList(namesList, percentage)
    return rwc(someNames, weighting)
  }

  const reload = () => {
    name = getSingleName(namesList, percentage, weighting)
  }

  $: namesList = gender === 'F' ? girlNames : boyNames
  $: name = getSingleName(namesList, percentage, weighting)
</script>

<div class="name">
  {#if name}
    {name}
  {:else}
    [Loading]
  {/if}
</div>

<button on:click={reload}>Reload</button>

<label>
  <input type="radio" bind:group={gender} name="genderField" value="M" />
  Male
</label>

<label>
  <input type="radio" bind:group={gender} name="genderField" value="F" />
  Female
</label>

<label for="yearField">Year</label>
<input
  class="slim"
  type="number"
  on:change={fetchNewNames}
  bind:value={year}
  id="yearField"
  max={maxYear}
  min={minYear}
/>

<label for="percentField">Only top __ percent</label>
<input
  class="slim"
  type="number"
  bind:value={percentage}
  id="percentField"
  max="100"
  min="1"
/>

<label for="weightField">Weighting</label>
<input
  type="number"
  class="slim"
  bind:value={weighting}
  id="weightField"
  max="100"
  min="0"
/>

<style>
  input.slim {
    width: 15rem;
  }
  .name {
    margin-bottom: 2rem;
    font-size: 4rem;
  }
</style>
