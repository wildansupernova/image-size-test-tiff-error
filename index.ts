import * as fs from 'fs';
import { imageSize } from "image-size";
function streamToBuffer(stream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const bufferArray: Uint8Array[] = [];
      stream
        .on("data", (chunk) => {
          bufferArray.push(chunk);
        })
        .on("error", (error) => {
          reject(error);
        })
        .on("end", () => {
          const content = Buffer.concat(bufferArray);
          resolve(content);
        });
    });
  }

const runExample = async () => {
    const result = fs.createReadStream("0d63278b-ec67-41d9-b156-88e65d4edacb.tiff");
    const buffer = await streamToBuffer(result)
    const dimensions = imageSize(buffer)
    console.log(dimensions);
}

runExample()



