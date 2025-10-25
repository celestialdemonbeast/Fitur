import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music, Upload, Download, ArrowLeft, FileAudio, Play, Pause, Scissors } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const AudioCutter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [cutting, setCutting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cut, setCut] = useState(false);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setCut(false);
        toast({
          title: 'File uploaded',
          description: `${file.name} ready for cutting`,
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        const dur = audioRef.current.duration;
        setDuration(dur);
        setEndTime(dur);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCut = () => {
    if (!selectedFile || startTime >= endTime) return;

    setCutting(true);
    setProgress(0);

    // Simulate cutting
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCutting(false);
          setCut(true);
          toast({
            title: 'Cutting complete!',
            description: `Audio trimmed from ${formatTime(startTime)} to ${formatTime(endTime)}`,
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
      description: 'Your cut audio file is downloading...',
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setCut(false);
    }
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
          <h2 className="text-4xl font-bold text-white mb-4">Audio Cutter</h2>
          <p className="text-white/80">Trim and cut your audio files with precision</p>
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
                <p className="text-white/60">{duration > 0 && `Duration: ${formatTime(duration)}`}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-white/60" />
                <p className="text-white text-lg">Drop your audio file here or click to browse</p>
                <p className="text-white/60">Cut audio with precision waveform editor</p>
              </div>
            )}
          </div>
        </div>

        {/* Audio Player & Editor */}
        {selectedFile && audioUrl && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Scissors className="w-6 h-6 text-white" />
              <h3 className="text-2xl font-semibold text-white">Edit Audio</h3>
            </div>

            <audio ref={audioRef} src={audioUrl} />

            {/* Waveform Visual (Simulated) */}
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="h-32 flex items-center justify-center relative">
                {/* Simulated waveform bars */}
                <div className="flex items-center justify-center space-x-1 h-full w-full">
                  {Array.from({ length: 50 }).map((_, i) => {
                    const height = Math.random() * 80 + 20;
                    const isInRange = (i / 50) * duration >= startTime && (i / 50) * duration <= endTime;
                    return (
                      <div
                        key={i}
                        className={`w-full rounded-full transition-all duration-300 ${
                          isInRange ? 'bg-gradient-to-t from-pink-500 to-rose-600' : 'bg-white/30'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300"
                >
                  {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0.8) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>
                <span className="text-white font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>

              {/* Trim Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 font-medium">Start Time</label>
                  <input
                    type="number"
                    min="0"
                    max={endTime}
                    step="0.1"
                    value={startTime.toFixed(1)}
                    onChange={(e) => setStartTime(Math.max(0, Math.min(parseFloat(e.target.value), endTime)))}
                    className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2 font-medium">End Time</label>
                  <input
                    type="number"
                    min={startTime}
                    max={duration}
                    step="0.1"
                    value={endTime.toFixed(1)}
                    onChange={(e) => setEndTime(Math.max(startTime, Math.min(parseFloat(e.target.value), duration)))}
                    className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-white/80">Selected duration: <span className="font-semibold text-white">{formatTime(endTime - startTime)}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Cut Button */}
        {selectedFile && !cut && (
          <button
            onClick={handleCut}
            disabled={cutting || startTime >= endTime}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cutting ? 'Cutting...' : 'Cut Audio'}
          </button>
        )}

        {/* Progress Bar */}
        {cutting && (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mt-8">
            <div className="flex justify-between text-white mb-2">
              <span>Cutting...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-500 to-rose-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Button */}
        {cut && (
          <button
            onClick={handleDownload}
            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2 mt-8"
          >
            <Download className="w-5 h-5" />
            <span>Download Cut Audio</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioCutter;


