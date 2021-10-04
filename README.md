# Goblin Namer

Using read data from the US Social Security databases of names registered in each of the years from 1880-2020, randomly select a boy or girls name. Selections are weighted by popularity. The weighting, the year, the gender and the limit of popularity (by percentile) are all configurable.

## Updating names

The data in CSV can be downloaded from [data.gov](https://www.ssa.gov/oact/babynames/names.zip). After expanding the archive run `npm run convert-names` to produce the json files used by this website.
