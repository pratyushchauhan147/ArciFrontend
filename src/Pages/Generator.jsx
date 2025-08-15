import React, { useState } from 'react';
import { generateSvg } from '../services/floorplanApi';

const FloorPlanGeneratorPage = () => {
  const [prompt, setPrompt] = useState('');
  const [svgDataUri, setSvgDataUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setSvgDataUri('');

    try {
      const svgString = await generateSvg(prompt);
      const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
      setSvgDataUri(dataUri);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 text-center font-sans">
      <h1 className="text-4xl font-bold mb-2">AI Floor Plan Generator</h1>
      <p className="text-gray-600 mb-8">
        Describe the floor plan you want to create, and the AI will design it for you.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A modern 10x12 meter apartment with 2 bedrooms and a large living room..."
          rows="4"
          disabled={isLoading}
          className="p-3 w-full text-base border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="py-3 px-5 text-base font-bold text-white bg-blue-600 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Plan'}
        </button>
      </form>

      <div className="mt-10">
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {error && (
          <p className="text-red-600 font-bold">
            ❌ Error: {error}
          </p>
        )}
        {svgDataUri && (
          <div className="w-full max-w-2xl mx-auto my-10 p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg">
            <img src={svgDataUri} alt="Generated floor plan" className="w-full h-auto block" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FloorPlanGeneratorPage;