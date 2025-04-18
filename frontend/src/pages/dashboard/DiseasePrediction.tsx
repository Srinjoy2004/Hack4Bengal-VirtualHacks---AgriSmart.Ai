import { useState } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export default function DiseasePredictionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [plantType, setPlantType] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<{ disease: string; confidence: number; treatment: string } | null>(null);

  const plantTypes = [
    "Tomato", "Potato", "Corn", "Apple", "Grape", "Rice", 
    "Wheat", "Soybean", "Cucumber", "Strawberry", "Coffee",
    "Orange", "Pepper", "Cherry", "Peach", "Cotton"
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      fileReader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile || !plantType) return;
    
    setIsAnalyzing(true);
    
    // Mock analysis - in a real app, this would call an API
    setTimeout(() => {
      setIsAnalyzing(false);
      // Mock result
      setResult({
        disease: "Leaf Spot Disease",
        confidence: 94.7,
        treatment: "1. Apply copper-based fungicide every 7-10 days.\n2. Ensure proper spacing between plants for better air circulation.\n3. Remove and dispose of affected leaves properly.\n4. Water at the base of plants to keep foliage dry.\n5. Consider crop rotation for next season."
      });
    }, 2000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPlantType('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center mb-3">
            <Leaf className="text-green-600 mr-2" size={32} />
            <h1 className="text-5xl font-bold text-gray-800">Disease Prediction</h1>
          </div>
          <p className="mt-3 text-lg text-green-700 font-medium">
            Identify plant diseases instantly by uploading images and receive treatment recommendations
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left column - Upload section */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-green-100">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
                <div className="p-3 bg-green-100 rounded-full">
                  <Camera className="text-green-600" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">Upload Plant Image</h2>
                  <p className="text-green-600">Supported formats: JPG, PNG, WEBP</p>
                </div>
              </div>

              <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                  previewUrl 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                {previewUrl ? (
                  <div className="w-full flex flex-col items-center">
                    <div className="relative w-full max-w-md mb-4">
                      <img 
                        src={previewUrl} 
                        alt="Plant preview" 
                        className="max-h-64 w-full object-contain rounded-lg shadow-md" 
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          resetForm();
                        }}
                        className="absolute -top-3 -right-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      <span className="text-sm text-gray-600 font-medium">{selectedFile?.name}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-gray-700 font-medium mb-2">Drag and drop your plant image here</p>
                    <p className="text-gray-500 text-sm">or click to browse files</p>
                  </div>
                )}
                <input 
                  id="fileInput"
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Plant Type</label>
                <div className="relative">
                  <select
                    value={plantType}
                    onChange={(e) => setPlantType(e.target.value)}
                    className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white appearance-none"
                  >
                    <option value="">Select plant type</option>
                    {plantTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || !plantType || isAnalyzing}
                className={`w-full mt-6 p-4 rounded-lg text-white font-medium flex items-center justify-center transition-all ${
                  !selectedFile || !plantType || isAnalyzing
                    ? 'bg-green-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin mr-2" size={20} />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2" size={20} />
                    Analyze Image
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right column - Results */}
          <div className="md:col-span-2">
            {result ? (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-100">
                <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gray-100">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Analysis Result</h2>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Selected Plant:</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{plantType}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Detected Issue:</h3>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{result.disease}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-700">Confidence:</h3>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${result.confidence}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">{result.confidence}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h3 className="font-medium text-gray-800 mb-2">Recommended Treatment:</h3>
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {result.treatment}
                  </div>
                </div>
                <button 
                  onClick={resetForm}
                  className="w-full mt-6 p-3 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 font-medium flex items-center justify-center"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Analyze Another Plant
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-green-100">
                <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
                  <div className="p-2 bg-green-100 rounded-full">
                    <AlertCircle className="text-green-600" size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">How It Works</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                      <span className="text-green-600 font-medium text-sm">1</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Upload a clear image of the affected plant part</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                      <span className="text-green-600 font-medium text-sm">2</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Select the plant type for more accurate results</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full h-6 w-6 flex items-center justify-center mt-0.5">
                      <span className="text-green-600 font-medium text-sm">3</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">Get instant disease detection and treatment advice</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
                <div className="p-2 bg-green-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Recent Detections</h2>
              </div>
              <div className="space-y-3">
                {[
                  { plantType: "Tomato", disease: "Early Blight", date: "April 15, 2025", status: "treated" },
                  { plantType: "Potato", disease: "Late Blight", date: "April 12, 2025", status: "monitoring" },
                  { plantType: "Apple", disease: "Cedar Apple Rust", date: "April 10, 2025", status: "treated" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                    <div className={`w-2 h-10 mr-3 rounded-full ${item.status === 'treated' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800">{item.plantType}</p>
                      <p className="text-sm text-gray-500">{item.disease}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{item.date}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === 'treated' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status === 'treated' ? 'Treated' : 'Monitoring'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}