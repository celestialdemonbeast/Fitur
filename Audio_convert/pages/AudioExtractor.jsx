import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Upload, Download, ArrowLeft, FileVideo, Settings } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AudioExtractor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('192');
  const [extracting, setExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extracted, setExtracted] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const formats = ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg'];
  const bitrates = ['96', '128', '192', '256', '320'];
  const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv', 'wmv'];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setExtracted(false);
        toast({
          title: 'Video uploaded',
          description: `${file.name} ready for audio extraction`,
        });
      } else {
        toast({
          title: 'Invalid file',
          description: 'Please select a video file',
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
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setExtracted(false);
    }
  };

  const handleExtract = () => {
    if (!selectedFile) return;

    setExtracting(true);
    setProgress(0);

    // Simulate extraction
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setExtracting(false);
          setExtracted(true);
          toast({
            title: 'Extraction complete!',
            description: `Audio extracted as ${outputFormat.toUpperCase()}`,
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
      description: 'Your extracted audio is downloading...',
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
          <h2 className="text-4xl font-bold text-white mb-4">Audio Extractor</h2>
          <p className="text-white/80">Extract audio from video files in any format</p>
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
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            {selectedFile ? (
              <div className="space-y-4">
                <FileVideo className="w-16 h-16 mx-auto text-white" />
                <p className="text-white font-semibold text-lg">{selectedFile.name}</p>
                <p className="text-white/60">{formatSize(selectedFile.size)} MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-white/60" />
                <p className="text-white text-lg">Drop your video file here or click to browse</p>
                <p className="text-white/60">Supports MP4, AVI, MOV, MKV, and 1000+ formats</p>
              </div>
            )}
          </div>
        </div>

        {/* Supported Formats Info */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-white font-semibold mb-3">Supported Video Formats</h3>
          <div className="flex flex-wrap gap-2">
            {videoFormats.map((format) => (
              <span
                key={format}
                className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-sm"
              >
                {format.toUpperCase()}
              </span>
            ))}
            <span className="text-white/60 text-sm py-1">+ 1000 more formats</span>
          </div>
        </div>

        {/* Settings */}
        {selectedFile && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold text-white">Extraction Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Output Audio Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                >
                  {formats.map((format) => (
                    <option key={format} value={format} className="bg-[#2a5298] text-white">
                      {format.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Audio Bitrate (kbps)</label>
                <select
                  value={bitrate}
                  onChange={(e) => setBitrate(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                >
                  {bitrates.map((rate) => (
                    <option key={rate} value={rate} className="bg-[#2a5298] text-white">
                      {rate} kbps
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 bg-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-2">What will be extracted?</h4>
              <ul className="text-white/80 space-y-1 text-sm">
                <li>• Complete audio track from video</li>
                <li>• Original audio quality preserved</li>
                <li>• Metadata and tags included</li>
                <li>• No video content, audio only</li>
              </ul>
            </div>
          </div>
        )}

        {/* Extract Button */}
        {selectedFile && !extracted && (
          <button
            onClick={handleExtract}
            disabled={extracting}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {extracting ? 'Extracting...' : 'Extract Audio'}
          </button>
        )}

        {/* Progress Bar */}
        {extracting && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mt-8">
            <div className="flex justify-between text-white mb-2">
              <span>Extracting audio...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-yellow-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        {extracted && (
          <div className="space-y-6 mt-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h4 className="text-white font-semibold mb-4">Extraction Complete!</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/60">Format:</span>
                  <span className="text-white font-semibold">{outputFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Bitrate:</span>
                  <span className="text-white font-semibold">{bitrate} kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status:</span>
                  <span className="text-green-400 font-semibold">Ready to download</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Extracted Audio</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioExtractor;


