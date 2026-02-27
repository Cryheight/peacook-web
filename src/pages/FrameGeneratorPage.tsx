import { useState, useRef, useEffect } from 'react';
import { Camera, Download, Share2, Upload, Heart, RefreshCw, Check, Facebook, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export function FrameGeneratorPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState('frame1');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const frames = [
    {
      id: 'frame1',
      name: "I'm in the Book!",
      preview: '/images/1000499005.jpg',
      color: '#C41230'
    },
    {
      id: 'frame2',
      name: 'PEI Good Eats',
      preview: '/images/1000499004.jpg',
      color: '#2E8B8B'
    },
    {
      id: 'frame3',
      name: 'Proud Home Cook',
      preview: '/images/1000499002.jpg',
      color: '#D4A03A'
    }
  ];

  useEffect(() => {
    if (selectedImage && canvasRef.current) {
      drawCanvas();
    }
  }, [selectedImage, selectedFrame]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = frames.find(f => f.id === selectedFrame);
    if (!frame) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    // Clear canvas
    ctx.fillStyle = frame.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw frame border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Load and draw user image
    const img: HTMLImageElement = document.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw circular crop of user image
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 50;
      const radius = 200;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();

      // Draw image centered and cropped to circle
      const aspectRatio = img.width / img.height;
      let drawWidth = radius * 2;
      let drawHeight = radius * 2;
      
      if (aspectRatio > 1) {
        drawWidth = drawHeight * aspectRatio;
      } else {
        drawHeight = drawWidth / aspectRatio;
      }

      ctx.drawImage(
        img,
        centerX - drawWidth / 2,
        centerY - drawHeight / 2,
        drawWidth,
        drawHeight
      );
      ctx.restore();

      // Draw white border around circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 10;
      ctx.stroke();

      // Draw text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      
      // Top text
      ctx.font = 'bold 48px "Cormorant Garamond", serif';
      ctx.fillText("I'm in the Book!", centerX, 120);

      // Bottom text
      ctx.font = 'bold 56px "Cormorant Garamond", serif';
      ctx.fillText("PEI Cooks at Home", centerX, canvas.height - 80);

      // Subtitle
      ctx.font = '24px "Inter", sans-serif';
      ctx.fillText("PEI Good Eats Home Cooks with Parry Aftab", centerX, canvas.height - 40);
    };
    img.src = selectedImage!;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large. Please choose an image under 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        toast.success('Image uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'pei-cooks-frame.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Frame downloaded!');
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'pei-cooks-frame.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: "I'm in the Book!",
              text: 'Check out my PEI Cooks at Home profile picture!',
              files: [file]
            });
            return;
          } catch {
            // Fall through to copy link
          }
        }
      }
      
      // Fallback: copy page link
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-red to-dark-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-8 border-white rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto container-padding relative z-10">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Camera className="w-4 h-4 mr-2" />
              Profile Picture Maker
            </Badge>
            <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6">
              "I'm in the Book!" Frame Generator
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Create your own "I'm in the Book!" profile picture to share on social media 
              and show your support for PEI Cooks at Home.
            </p>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section className="section-padding bg-white">
        <div className="max-w-6xl mx-auto container-padding">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div>
              <Card className="border-0 shadow-xl mb-6">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                    1. Upload Your Photo
                  </h3>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary-red hover:bg-primary-red/5 transition-colors"
                  >
                    {selectedImage ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={selectedImage} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                        <p className="text-charcoal/70">Click to change photo</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-charcoal/40 mb-4" />
                        <p className="text-charcoal/70 mb-2">Click to upload your photo</p>
                        <p className="text-sm text-charcoal/50">or drag and drop</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl mb-6">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                    2. Choose a Frame Style
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {frames.map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame.id)}
                        className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                          selectedFrame === frame.id 
                            ? 'border-primary-red ring-2 ring-primary-red/20' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img 
                          src={frame.preview} 
                          alt={frame.name}
                          className="w-full h-full object-cover"
                        />
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ backgroundColor: `${frame.color}80` }}
                        >
                          <span className="text-white text-xs font-medium text-center px-2">
                            {frame.name}
                          </span>
                        </div>
                        {selectedFrame === frame.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary-red rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                    3. Download & Share
                  </h3>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-primary-red hover:bg-dark-red text-white"
                      onClick={handleDownload}
                      disabled={!selectedImage}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={handleShare}
                      disabled={!selectedImage}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                  <a 
                    href="https://facebook.com/groups/PEIGoodEats"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block"
                  >
                    <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                      <Facebook className="w-4 h-4 mr-2" />
                      Share to PEIGoodEats
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div>
              <Card className="border-0 shadow-xl sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                    Preview
                  </h3>
                  <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                    {selectedImage ? (
                      <canvas 
                        ref={canvasRef}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <Image className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
                        <p className="text-charcoal/50">Upload a photo to see preview</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-charcoal/60 mt-4 text-center">
                    Perfect for Facebook, Instagram, and Twitter profile pictures!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="section-padding bg-cream">
        <div className="max-w-4xl mx-auto container-padding">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gold text-white border-0">
              <Heart className="w-4 h-4 mr-2" />
              Tips for Best Results
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal">
              Make Your Frame Shine
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-teal" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                  Good Lighting
                </h3>
                <p className="text-charcoal/70">
                  Use natural light or well-lit photos for the best results
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-red/10 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-primary-red" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                  Center Your Face
                </h3>
                <p className="text-charcoal/70">
                  Make sure your face is centered in the photo for the best crop
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
                  Show Your Smile
                </h3>
                <p className="text-charcoal/70">
                  A warm smile makes the perfect profile picture!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
