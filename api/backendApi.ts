import axios from 'axios';
import getEnvVars from '../environment';
import { ImageWithData } from '../helpers/fileHelper';

enum UploadOperation {
  Unknown,
  Upscale,
  FtpUpload,
}

function stringToUploadOperation(str: string): UploadOperation {
  switch (str) {
    case 'upscale':
      return UploadOperation.Upscale;
    case 'ftp_upload':
      return UploadOperation.FtpUpload;
    default:
      return UploadOperation.Unknown;
  }
}
async function uploadImagesToBackend(
  imageData: ImageWithData[],
  onProgress: (
    fileName: string,
    progress: number,
    operation: UploadOperation
  ) => void
): Promise<boolean> {
  const { backendHost, backendPort } = getEnvVars();
  const url = `${backendHost}:${backendPort}/images/upload`;
  const formData = new FormData();
  imageData.forEach((image) => {
    formData.append('images', image.file, image.name);
  });

  // Create a new EventSource to listen for SSE from the /events route
  const eventSource = new EventSource(
    `${backendHost}:${backendPort}/images/events`
  );

  // Set up an event listener for the progress event
  eventSource.addEventListener('progress', (event) => {
    const data = JSON.parse(event.data);
    // console.log(event.data);
    onProgress(
      data.fileName,
      data.progress,
      stringToUploadOperation(data.operation)
    );
  });

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // handle successful response
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // handle error
    console.error(error);
    return false;
  } finally {
    // Close the EventSource when the request is complete or if an error occurs
    eventSource.close();
  }
}

export { UploadOperation, uploadImagesToBackend };
