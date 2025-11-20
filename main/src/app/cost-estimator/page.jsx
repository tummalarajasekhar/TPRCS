// components/BudgetPlanner.jsx
'use client';
import { useState } from 'react';
// import axios from 'axios';

const BudgetPlanner = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Web',
    complexity: 'Medium',
    timeline: 12,
    teamSize: 3,
    features: [{ id: 1, name: '', complexity: 'Medium', estimatedHours: 40 }]
  });

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [
        ...prev.features,
        { id: Date.now(), name: '', complexity: 'Medium', estimatedHours: 40 }
      ]
    }));
  };

  const removeFeature = (id) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter(feature => feature.id !== id)
      }));
    }
  };

  const updateFeature = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map(feature =>
        feature.id === id ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Project Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter project title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Web">Web Application</option>
              <option value="Mobile">Mobile App</option>
              <option value="SaaS">SaaS Platform</option>
              <option value="Desktop">Desktop Software</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Describe your project requirements..."
          />
        </div>

        {/* Project Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Complexity *
            </label>
            <select
              value={formData.complexity}
              onChange={(e) => handleChange('complexity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="Simple">Simple</option>
              <option value="Medium">Medium</option>
              <option value="Complex">Complex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timeline (weeks) *
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Size *
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.teamSize}
              onChange={(e) => handleChange('teamSize', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Features List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Features *
            </label>
            <button
              type="button"
              onClick={addFeature}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Feature
            </button>
          </div>

          <div className="space-y-4">
            {formData.features.map((feature, index) => (
              <div key={feature.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    value={feature.name}
                    onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Feature name"
                  />
                </div>
                
                <div className="w-full md:w-32">
                  <select
                    value={feature.complexity}
                    onChange={(e) => updateFeature(feature.id, 'complexity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Simple">Simple</option>
                    <option value="Medium">Medium</option>
                    <option value="Complex">Complex</option>
                  </select>
                </div>
                
                <div className="w-full md:w-32">
                  <input
                    type="number"
                    min="1"
                    required
                    value={feature.estimatedHours}
                    onChange={(e) => updateFeature(feature.id, 'estimatedHours', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Hours"
                  />
                </div>
                
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(feature.id)}
                    className="w-full md:w-auto px-4 py-2 text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
        >
          {loading ? 'Generating Estimate...' : 'Calculate Budget'}
        </button>
      </form>
    </div>
  );
};

export default BudgetPlanner;