import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Upload, Download, Settings, ArrowLeft, FileAudio } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AudioConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('192');
  const [sampleRate, setSampleRate] = useState('44100');
  const [channels, setChannels] = useState('stereo');
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [converted, setConverted] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const formats = ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg', 'wma', 'aiff'];
  const bitrates = ['32', '64', '96', '128', '192', '256', '320'];
  const sampleRates = ['8000', '16000', '22050', '44100', '48000', '96000', '192000'];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        setConverted(false);
        toast({
          title: 'File uploaded',
          description: `${file.name} ready for conversion`,
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
      setConverted(false);
    }
  };

  const handleConvert = () => {
    if (!selectedFile) return;

    setConverting(true);
    setProgress(0);

    // Simulate conversion process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setConverting(false);
          setConverted(true);
          toast({
            title: 'Conversion complete!',
            description: `Your file has been converted to ${outputFormat.toUpperCase()}`,
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
      description: 'Your converted file is downloading...',
    });
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
          <h2 className="text-4xl font-bold text-white mb-4">Audio Converter</h2>
          <p className="text-white/80">Convert your audio files to any format with high quality</p>
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
                <p className="text-white/60">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-white/60" />
                <p className="text-white text-lg">Drop your audio file here or click to browse</p>
                <p className="text-white/60">Supports MP3, WAV, M4A, FLAC, and more</p>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        {selectedFile && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold text-white">Conversion Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Output Format</label>
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
                <label className="block text-white mb-2 font-medium">Bitrate (kbps)</label>
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

              <div>
                <label className="block text-white mb-2 font-medium">Sample Rate (Hz)</label>
                <select
                  value={sampleRate}
                  onChange={(e) => setSampleRate(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                >
                  {sampleRates.map((rate) => (
                    <option key={rate} value={rate} className="bg-[#2a5298] text-white">
                      {parseInt(rate).toLocaleString()} Hz
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Channels</label>
                <select
                  value={channels}
                  onChange={(e) => setChannels(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                >
                  <option value="mono" className="bg-[#2a5298] text-white">Mono</option>
                  <option value="stereo" className="bg-[#2a5298] text-white">Stereo</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Convert Button */}
        {selectedFile && !converted && (
          <button
            onClick={handleConvert}
            disabled={converting}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {converting ? 'Converting...' : 'Convert Audio'}
          </button>
        )}

        {/* Progress Bar */}
        {converting && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mt-8">
            <div className="flex justify-between text-white mb-2">
              <span>Converting...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        {converted && (
          <button
            onClick={handleDownload}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2 mt-8"
          >
            <Download className="w-5 h-5" />
            <span>Download Converted File</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioConverter;

