import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Upload, Download, ArrowLeft, FileAudio, Gauge } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AudioCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [quality, setQuality] = useState('medium');
  const [targetSize, setTargetSize] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressed, setCompressed] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const qualityPresets = {
    high: { label: 'High Quality', bitrate: '256', description: 'Minimal compression, best quality' },
    medium: { label: 'Medium Quality', bitrate: '128', description: 'Balanced size and quality' },
    low: { label: 'Low Quality', bitrate: '64', description: 'Maximum compression, smaller size' },
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        setOriginalSize(file.size);
        setCompressed(false);
        toast({
          title: 'File uploaded',
          description: `${file.name} ready for compression`,
        });
      } else {
        toast({
          title: 'Invalid file',
          description: 'Please select an audio file',
          variant: 'destructive',
        });
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressed(false);
    }
  };

  const handleCompress = () => {
    if (!selectedFile) return;

    setCompressing(true);
    setProgress(0);

    // Simulate compression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompressing(false);
          setCompressed(true);
          
          // Calculate compressed size based on quality
          const compressionRatio = quality === 'high' ? 0.7 : quality === 'medium' ? 0.5 : 0.3;
          setCompressedSize(Math.floor(originalSize * compressionRatio));
          
          toast({
            title: 'Compression complete!',
            description: `File size reduced by ${Math.floor((1 - compressionRatio) * 100)}%`,
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownload = () => {
    toast({
      title: 'Download started',
      description: 'Your compressed file is downloading...',
    });
  };

  const formatSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3c72] via-[#2a5298] to-[#1e3c72]">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">FreeConvert Audio</h1>
            </Link>
            <Link to="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Audio Compressor</h2>
          <p className="text-white/80">Reduce audio file size while maintaining quality</p>
        </div>

        {/* Upload Area */}
        <div
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border-2 border-dashed border-white/30 hover:border-white/50 transition-all duration-300 mb-8 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            {selectedFile ? (
              <div className="space-y-4">
                <FileAudio className="w-16 h-16 mx-auto text-white" />
                <p className="text-white font-semibold text-lg">{selectedFile.name}</p>
                <p className="text-white/60">{formatSize(originalSize)} MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-white/60" />
                <p className="text-white text-lg">Drop your audio file here or click to browse</p>
                <p className="text-white/60">Reduce file size up to 70% without quality loss</p>
              </div>
            )}
          </div>
        </div>

        {/* Quality Settings */}
        {selectedFile && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Gauge className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold text-white">Compression Settings</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white mb-4 font-medium">Quality Preset</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(qualityPresets).map(([key, preset]) => (
                    <button
                      key={key}
                      onClick={() => setQuality(key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        quality === key
                          ? 'bg-white/30 border-white/60'
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <p className="text-white font-semibold mb-1">{preset.label}</p>
                      <p className="text-white/60 text-sm">{preset.description}</p>
                      <p className="text-white/80 text-sm mt-2">{preset.bitrate} kbps</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Target Size (MB) - Optional</label>
                <input
                  type="number"
                  value={targetSize}
                  onChange={(e) => setTargetSize(e.target.value)}
                  placeholder="Leave empty for automatic"
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* Compress Button */}
        {selectedFile && !compressed && (
          <button
            onClick={handleCompress}
            disabled={compressing}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {compressing ? 'Compressing...' : 'Compress Audio'}
          </button>
        )}

        {/* Progress Bar */}
        {compressing && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mt-8">
            <div className="flex justify-between text-white mb-2">
              <span>Compressing...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {compressed && (
          <div className="space-y-6 mt-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-4">Compression Results</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Original Size</p>
                  <p className="text-white font-semibold text-lg">{formatSize(originalSize)} MB</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Compressed Size</p>
                  <p className="text-white font-semibold text-lg">{formatSize(compressedSize)} MB</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-white/60 text-sm">Space Saved</p>
                <p className="text-white font-semibold text-lg">
                  {formatSize(originalSize - compressedSize)} MB ({Math.floor(((originalSize - compressedSize) / originalSize) * 100)}%)
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Compressed File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioCompressor;


