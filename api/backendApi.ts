import axios, { AxiosResponse } from 'axios';
import getEnvVars from '../environment';
import { ImageWithData, toFile } from '../helpers/fileHelper';

enum UploadOperation {
  Unknown,
  Upscale,
  FtpUpload,
}

interface Caption {
  caption: string;
  similarity: number;
}

interface CaptionResponse {
  results: Caption[];
}

// TODO: handle errors in this file and show them in popup
const stringToUploadOperation = (str: string): UploadOperation => {
  switch (str) {
    case 'upscale':
      return UploadOperation.Upscale;
    case 'ftp_upload':
      return UploadOperation.FtpUpload;
    default:
      return UploadOperation.Unknown;
  }
};

const getCaptionsFromBackend = async (
  imageData: ImageWithData[]
): Promise<Caption[]> => {
  const { backendHost, backendPort } = getEnvVars();
  const url = `${backendHost}:${backendPort}/images/caption`;

  try {
    const response = await post<CaptionResponse>(url, imageData);

    // handle successful response
    if (isSuccessResponse(response)) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const upscaleAndUploadToStock = async (
  imageData: ImageWithData[],
  onProgress: (
    fileName: string,
    progress: number,
    operation: UploadOperation
  ) => void
): Promise<boolean> => {
  const { backendHost, backendPort } = getEnvVars();
  const url = `${backendHost}:${backendPort}/images/upload`;

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
    const response = await post(url, imageData);

    // handle successful response
    if (isSuccessResponse(response)) {
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
};

const post = async <TData>(
  url: string,
  imageData: ImageWithData[]
): Promise<AxiosResponse<TData, unknown>> => {
  const formData = new FormData();
  imageData.forEach((image) => {
    formData.append('images', toFile(image), image.name);
  });
  return await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const isSuccessResponse = (response: AxiosResponse<unknown, unknown>) =>
  response.status >= 200 && response.status < 300;

export {
  Caption,
  UploadOperation,
  upscaleAndUploadToStock,
  getCaptionsFromBackend,
};
