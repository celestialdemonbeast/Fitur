import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Upload, Download, ArrowLeft, FileAudio, Trash2, MoveUp, MoveDown, Merge } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AudioJoiner = () => {
  const [files, setFiles] = useState([]);
  const [joining, setJoining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [joined, setJoined] = useState(false);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const formats = ['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg'];

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const audioFiles = selectedFiles.filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length > 0) {
      setFiles(prev => [...prev, ...audioFiles.map((file, idx) => ({
        id: Date.now() + idx,
        file,
        name: file.name,
        size: file.size
      }))]);
      setJoined(false);
      toast({
        title: 'Files added',
        description: `${audioFiles.length} audio file(s) added to queue`,
      });
    } else {
      toast({
        title: 'Invalid files',
        description: 'Please select audio files only',
        variant: 'destructive',
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const audioFiles = droppedFiles.filter(file => file.type.startsWith('audio/'));
    
    if (audioFiles.length > 0) {
      setFiles(prev => [...prev, ...audioFiles.map((file, idx) => ({
        id: Date.now() + idx,
        file,
        name: file.name,
        size: file.size
      }))]);
      setJoined(false);
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
    toast({
      title: 'File removed',
      description: 'File removed from queue',
    });
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
  };

  const moveDown = (index) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setFiles(newFiles);
  };

  const handleJoin = () => {
    if (files.length < 2) {
      toast({
        title: 'Need more files',
        description: 'Please add at least 2 audio files to join',
        variant: 'destructive',
      });
      return;
    }

    setJoining(true);
    setProgress(0);

    // Simulate joining
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setJoining(false);
          setJoined(true);
          toast({
            title: 'Joining complete!',
            description: `${files.length} files merged successfully`,
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
      description: 'Your joined audio file is downloading...',
    });
  };

  const formatSize = (bytes) => {
    return (bytes / 1024 / 1024).toFixed(2);
  };

  const getTotalSize = () => {
    return files.reduce((total, file) => total + file.size, 0);
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
          <h2 className="text-4xl font-bold text-white mb-4">Audio Joiner</h2>
          <p className="text-white/80">Merge multiple audio files into one seamlessly</p>
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
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <Upload className="w-16 h-16 mx-auto text-white/60 mb-4" />
            <p className="text-white text-lg mb-2">Drop audio files here or click to browse</p>
            <p className="text-white/60">Add multiple files to join them together</p>
            {files.length > 0 && (
              <p className="text-white/80 mt-4 font-semibold">{files.length} file(s) in queue</p>
            )}
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Merge className="w-6 h-6 text-white" />
                <h3 className="text-2xl font-semibold text-white">Files to Join</h3>
              </div>
              <div className="text-white/80">
                Total: {formatSize(getTotalSize())} MB
              </div>
            </div>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <FileAudio className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{index + 1}. {file.name}</p>
                        <p className="text-white/60 text-sm">{formatSize(file.size)} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MoveUp className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => moveDown(index)}
                        disabled={index === files.length - 1}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MoveDown className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="bg-white/20 hover:bg-red-500/50 p-2 rounded-lg transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
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
          </div>
        )}

        {/* Join Button */}
        {files.length > 0 && !joined && (
          <button
            onClick={handleJoin}
            disabled={joining || files.length < 2}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {joining ? 'Joining...' : `Join ${files.length} Audio Files`}
          </button>
        )}

        {/* Progress Bar */}
        {joining && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mt-8">
            <div className="flex justify-between text-white mb-2">
              <span>Joining files...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-orange-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        {joined && (
          <button
            onClick={handleDownload}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2 mt-8"
          >
            <Download className="w-5 h-5" />
            <span>Download Joined Audio</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioJoiner;

