// extract youtube video id from link
export function extractYouTubeVideoId(url: string) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// check file type
type MediaTypeResult = {
  type: 'image' | 'video' | 'unknown';
  mimeType: string;
  data: string | null;
};

// Function takes single uploaded img file, and returns width, height, fileSize and fileExtension
export const getMediaMeta = async (
  file: File
): Promise<{
  type: 'image' | 'video';
  width: number;
  height: number;
  duration?: number;
  fileSize: number;
  fileExtension: string;
  localUrl: string;
}> => {
  const { name, type, size } = file;
  const fileExtension = name.split('.').pop() || '';
  const localUrl = URL.createObjectURL(file);

  // Helper function to get image dimensions
  async function getImageParams(
    file: File
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const image = new Image();
        image.src = e.target?.result as string;

        image.onload = () =>
          resolve({ width: image.width, height: image.height });
        image.onerror = () => reject(new Error('Failed to load image.'));
      };

      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    });
  }

  // Helper function to get video dimensions and duration
  async function getVideoParams(
    file: File
  ): Promise<{ width: number; height: number; duration: number }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
        });
      };

      video.onerror = () => reject(new Error('Failed to load video.'));
    });
  }

  // Determine if the file is an image or a video and get metadata accordingly
  if (type.startsWith('image/')) {
    const { width, height } = await getImageParams(file);
    return {
      type: 'image',
      width,
      height,
      fileSize: size,
      fileExtension,
      localUrl,
    };
  } else if (type.startsWith('video/')) {
    const { width, height, duration } = await getVideoParams(file);
    return {
      type: 'video',
      width,
      height,
      duration,
      fileSize: size,
      fileExtension,
      localUrl,
    };
  } else {
    throw new Error('Unsupported file type');
  }
};

export async function getMediaType(file: File): Promise<MediaTypeResult> {
  const fileHeaderMap: { [key: string]: string[] } = {
    // Image formats
    'image/png': ['89504E47'],
    'image/gif': ['47494638'],
    'image/jpeg': ['FFD8FFDB', 'FFD8FFE0', 'FFD8FFE1'],
    'image/webp': ['52494646'],
    'image/tiff': ['49492A00', '4D4D002A'],
    'image/bmp': ['424D'],

    // Video formats
    'video/mp4': ['00000018', '00000020', '66747970'],
    'video/webm': ['1A45DFA3'],
    'video/mpeg': ['000001BA', '000001B3'],
    'video/avi': ['52494646'],
  };

  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);

  // Read the first 4 bytes to identify the file header
  let hex = '';
  for (let i = 0; i < 4; i++) {
    hex += dataView.getUint8(i).toString(16).padStart(2, '0').toUpperCase();
  }

  // Check for a match in the fileHeaderMap
  let mediaType: string | null = null;
  for (const [mimeType, signatures] of Object.entries(fileHeaderMap)) {
    if (signatures.some(signature => hex.startsWith(signature))) {
      mediaType = mimeType;
      break;
    }
  }

  // Send back the relevant data
  if (mediaType?.startsWith('image')) {
    return {
      type: 'image',
      mimeType: mediaType,
      data: URL.createObjectURL(file), // Create a URL for the image file
    };
  } else if (mediaType?.startsWith('video')) {
    return {
      type: 'video',
      mimeType: mediaType,
      data: URL.createObjectURL(file), // Create a URL for the video file
    };
  }

  return {
    type: 'unknown',
    mimeType: mediaType || 'Unknown format',
    data: null,
  };
}

export function formatFileSizeIntoMB(size: number): number {
  const sizeInMB = size / (1024 * 1024);
  return parseFloat(sizeInMB.toFixed(2));
}
