// Mock data untuk simulasi processing audio

export const mockAudioFormats = {
  input: ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'wma', 'aiff', 'alac', 'ape'],
  output: ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'wma', 'aiff']
};

export const mockVideoFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv', 'mpeg', '3gp', 'm4v'];

export const mockBitrates = ['32', '64', '96', '128', '192', '256', '320'];

export const mockSampleRates = ['8000', '16000', '22050', '44100', '48000', '96000', '192000'];

export const mockChannels = ['mono', 'stereo'];

// Simulasi proses konversi
export const simulateConversion = (file, outputFormat, options = {}) => {
  return new Promise((resolve) => {
    // Simulasi waktu processing
    const processingTime = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      resolve({
        success: true,
        originalFile: file.name,
        outputFormat: outputFormat,
        originalSize: file.size,
        convertedSize: Math.floor(file.size * 0.8), // Simulasi pengurangan 20%
        duration: processingTime,
        downloadUrl: `mock://converted/${file.name}.${outputFormat}`,
        ...options
      });
    }, processingTime);
  });
};

// Simulasi proses kompresi
export const simulateCompression = (file, quality = 'medium') => {
  return new Promise((resolve) => {
    const processingTime = Math.random() * 2000 + 1000;
    
    const compressionRatios = {
      high: 0.7,
      medium: 0.5,
      low: 0.3
    };
    
    const ratio = compressionRatios[quality] || 0.5;
    
    setTimeout(() => {
      resolve({
        success: true,
        originalFile: file.name,
        originalSize: file.size,
        compressedSize: Math.floor(file.size * ratio),
        quality: quality,
        savingsPercent: Math.floor((1 - ratio) * 100),
        downloadUrl: `mock://compressed/${file.name}`
      });
    }, processingTime);
  });
};

// Simulasi proses cutting
export const simulateCutting = (file, startTime, endTime) => {
  return new Promise((resolve) => {
    const processingTime = Math.random() * 1500 + 800;
    
    setTimeout(() => {
      resolve({
        success: true,
        originalFile: file.name,
        startTime: startTime,
        endTime: endTime,
        duration: endTime - startTime,
        downloadUrl: `mock://cut/${file.name}`
      });
    }, processingTime);
  });
};

// Simulasi proses joining
export const simulateJoining = (files, outputFormat) => {
  return new Promise((resolve) => {
    const processingTime = Math.random() * 2500 + 1500;
    
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    setTimeout(() => {
      resolve({
        success: true,
        filesCount: files.length,
        totalSize: totalSize,
        outputFormat: outputFormat,
        downloadUrl: `mock://joined/merged.${outputFormat}`
      });
    }, processingTime);
  });
};

// Simulasi proses ekstraksi
export const simulateExtraction = (file, outputFormat, bitrate) => {
  return new Promise((resolve) => {
    const processingTime = Math.random() * 2000 + 1200;
    
    setTimeout(() => {
      resolve({
        success: true,
        originalFile: file.name,
        videoSize: file.size,
        audioSize: Math.floor(file.size * 0.15), // Audio biasanya 15% dari video
        outputFormat: outputFormat,
        bitrate: bitrate,
        downloadUrl: `mock://extracted/${file.name}.${outputFormat}`
      });
    }, processingTime);
  });
};

// Mock metadata audio
export const getMockAudioMetadata = (file) => {
  return {
    filename: file.name,
    size: file.size,
    format: file.name.split('.').pop(),
    duration: Math.floor(Math.random() * 300) + 60, // 1-6 menit
    bitrate: '192',
    sampleRate: '44100',
    channels: 'stereo',
    codec: 'mp3'
  };
};

// Format ukuran file
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Format durasi
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default {
  mockAudioFormats,
  mockVideoFormats,
  mockBitrates,
  mockSampleRates,
  mockChannels,
  simulateConversion,
  simulateCompression,
  simulateCutting,
  simulateJoining,
  simulateExtraction,
  getMockAudioMetadata,
  formatFileSize,
  formatDuration
};

