import { Link } from 'react-router-dom';
import { Music, FileAudio, Scissors, Merge, FileVideo, Zap, Shield, Cloud } from 'lucide-react';

const Home = () => {
  const tools = [
    {
      title: 'Audio Converter',
      description: 'Convert audio files to 1500+ formats',
      icon: <Music className="w-12 h-12" />,
      link: '/converter',
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Audio Compressor',
      description: 'Compress audio files to reduce size',
      icon: <FileAudio className="w-12 h-12" />,
      link: '/compressor',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Audio Cutter',
      description: 'Cut audio files with precision',
      icon: <Scissors className="w-12 h-12" />,
      link: '/cutter',
      color: 'from-pink-500 to-rose-600'
    },
    {
      title: 'Audio Joiner',
      description: 'Join multiple audio files together',
      icon: <Merge className="w-12 h-12" />,
      link: '/joiner',
      color: 'from-rose-500 to-orange-600'
    },
    {
      title: 'Audio Extractor',
      description: 'Extract audio from video files',
      icon: <FileVideo className="w-12 h-12" />,
      link: '/extractor',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Process files in seconds with our optimized engine'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: '256-bit SSL encryption, files deleted after 24 hours'
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Cloud Based',
      description: 'No software installation required, works anywhere'
    }
  ];

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
            <nav className="hidden md:flex space-x-6">
              <a href="#tools" className="text-white/80 hover:text-white transition-colors duration-300">Tools</a>
              <a href="#features" className="text-white/80 hover:text-white transition-colors duration-300">Features</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors duration-300">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            All-in-One Audio Converter
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
            Convert, compress, cut, join, and extract audio files with ease. Support for 1500+ formats with professional quality.
          </p>
          <a href="#tools" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 shadow-lg hover:shadow-2xl">
            Get Started Free
          </a>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-white text-center mb-12">Our Audio Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.link}
              className="group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-lg hover:shadow-2xl"
            >
              <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${tool.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {tool.icon}
              </div>
              <h4 className="text-2xl font-semibold text-white mb-2">{tool.title}</h4>
              <p className="text-white/70">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-white text-center mb-12">Why Choose Us</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="inline-block p-4 rounded-xl bg-white/20 mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/10 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-white/60">
            © 2025 FreeConvert Audio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;


