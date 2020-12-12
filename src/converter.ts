import * as fs from "fs-extra";
import moment from 'moment';

export async function convertJsonFile(jsonFilePath:string) {
    const jsonFileContents = await readFileAsync(jsonFilePath);
  
    return convertJsonValueToCSharpValue(JSON.parse(jsonFileContents));
  }
  
  async function readFileAsync(newLocal: string): Promise<string> {
    return await fs.readFile(newLocal, 'utf8');
  }

export function convertJsonValueToCSharpValue(jsonValue: object): string {
  const momentJsonValue = parseDateTime(jsonValue);
  if (momentJsonValue != null) {
    return `new DateTime(${momentJsonValue.getFullYear()}, ${momentJsonValue.getMonth()}, ${momentJsonValue.getDate()})`;
  }
  
  if (typeof jsonValue === 'string') {
    return `"${jsonValue}"`;
  }

  if (Array.isArray(jsonValue)) {
    var arrayValues = (jsonValue as Array<object>)
      .map(convertJsonValueToCSharpValue)
      .join(',\n');

    return `
      new List<object> {
        ${arrayValues}
      }
    `.trim();
  }

  if(typeof jsonValue === 'object') 
  {
    return convertJsonObjectToCSharpObject(jsonValue);
  }

  return jsonValue as unknown as string;
}

function convertJsonObjectToCSharpObject(json: object): string {
  var cSharpProperties = Object.entries(json)
    .map(x => {
      //const capitalizedName = x[0].charAt(0).toUpperCase() + x[0].slice(1);
      //TODO: Allow capitalization flag
      const name = x[0];
      return `${name} = ${convertJsonValueToCSharpValue(x[1])}`;
    })
    .join(',\n'); //remove last ',\n'

    return `
      new
      {
        ${cSharpProperties}
      }
    `.trim();
}

function parseDateTime(jsonValue: object): Date | null {
    if (jsonValue instanceof Date) {
        return jsonValue;
    } 

  if (typeof jsonValue === 'string') {
    const momentJsonValue = moment(jsonValue, true);
    if (momentJsonValue.isValid()) return momentJsonValue.toDate();
  }
  
  return null;
}