import * as fs from 'fs-extra'
import * as moment from 'moment'

async function readFileAsync(newLocal: string): Promise<string> {
  return fs.readFile(newLocal, 'utf8')
}

function parseDateTime(jsonValue: object): Date | null {
  if (jsonValue instanceof Date) {
    return jsonValue
  }

  if (typeof jsonValue === 'string') {
    const momentJsonValue = moment(jsonValue, true)
    if (momentJsonValue.isValid()) return momentJsonValue.toDate()
  }

  return null
}

function convertJsonObjectToCSharpObject(json: object): string {
  const cSharpProperties = Object.entries(json)
  .map(x => {
    // const capitalizedName = x[0].charAt(0).toUpperCase() + x[0].slice(1);
    // eslint-disable-next-line no-warning-comments
    // TODO: Allow capitalization flag
    const name = x[0]
    // eslint-disable-next-line no-abusive-eslint-disable.md, @typescript-eslint/no-use-before-define
    return `${name} = ${convertJsonValueToCSharpValue(x[1])}`
  })
  .join(',\n') // remove last ',\n'

  return `
      new
      {
        ${cSharpProperties}
      }
    `.trim()
}

export function convertJsonValueToCSharpValue(jsonValue: object): string {
  const momentJsonValue = parseDateTime(jsonValue)
  if (momentJsonValue !== null) {
    return `new DateTime(${momentJsonValue.getFullYear()}, ${momentJsonValue.getMonth()}, ${momentJsonValue.getDate()})`
  }

  if (typeof jsonValue === 'string') {
    return `"${jsonValue}"`
  }

  if (Array.isArray(jsonValue)) {
    const arrayValues = (jsonValue as Array<object>)
    .map(convertJsonValueToCSharpValue)
    .join(',\n')

    return `
      new List<object> {
        ${arrayValues}
      }
    `.trim()
  }

  if (typeof jsonValue === 'object') {
    return convertJsonObjectToCSharpObject(jsonValue)
  }

  return jsonValue as unknown as string
}

export async function convertJsonFile(jsonFilePath: string) {
  const jsonFileContents = await readFileAsync(jsonFilePath)

  return convertJsonValueToCSharpValue(JSON.parse(jsonFileContents))
}
