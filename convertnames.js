import csv from 'csvtojson'
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const csvDirectory = 'names'
const jsonDirectory = 'static/names'

const convertNames = async () => {
  try {
    const files = await readdir(csvDirectory)
    for (const file of files) {
      const fromPath = path.join(csvDirectory, file)
      const extension = path.extname(file)
      const fileName = path.basename(file, extension)
      // console.log('to', toPath)

      const boyNames = []
      const girlNames = []

      csv({
        noheader: true,
        headers: ['id', 'gender', 'weight'],
        colParser: {
          id: 'string',
          weight: 'number',
        },
      })
        .fromFile(fromPath)
        .on('data', data => {
          const jsonObject = JSON.parse(data.toString('utf8'))
          const newRow = {}
          newRow.id = jsonObject.id
          newRow.weight = jsonObject.weight
          if (jsonObject.gender === 'M') {
            boyNames.push(newRow)
          } else {
            girlNames.push(newRow)
          }
        })
        .on('done', error => {
          console.log('======== processing:', fromPath, '==========')
          console.log(boyNames.length, 'boy names')
          console.log(girlNames.length, 'girl names')

          const toPathBoys = path.join(jsonDirectory, fileName + '-M' + '.json')
          writeFile(toPathBoys, JSON.stringify(boyNames))
          const toPathGirls = path.join(
            jsonDirectory,
            fileName + '-F' + '.json',
          )
          writeFile(toPathGirls, JSON.stringify(girlNames))

          if (error) {
            console.error('converting csv to json failed', error)
          }
        })
    }
  } catch (error) {
    console.error('something went wrong', error)
  }
}

convertNames()
