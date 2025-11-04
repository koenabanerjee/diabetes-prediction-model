import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Droplet, 
  Heart, 
  User, 
  TrendingUp,
  Info,
  Loader,
  Download,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Predict = () => {
  const [formData, setFormData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [featureImportance, setFeatureImportance] = useState([]);
  const [normalRanges, setNormalRanges] = useState({});
  const [showTooltip, setShowTooltip] = useState({});

  const fieldInfo = {
    Pregnancies: {
      label: 'Number of Pregnancies',
      icon: User,
      placeholder: 'e.g., 2',
      tooltip: 'Number of times pregnant',
      min: 0,
      max: 17
    },
    Glucose: {
      label: 'Glucose Level',
      icon: Droplet,
      placeholder: 'e.g., 120 mg/dL',
      tooltip: 'Plasma glucose concentration (2 hours in oral glucose tolerance test)',
      min: 0,
      max: 200,
      unit: 'mg/dL'
    },
    BloodPressure: {
      label: 'Blood Pressure',
      icon: Heart,
      placeholder: 'e.g., 80 mm Hg',
      tooltip: 'Diastolic blood pressure',
      min: 0,
      max: 122,
      unit: 'mm Hg'
    },
    SkinThickness: {
      label: 'Skin Thickness',
      icon: Activity,
      placeholder: 'e.g., 20 mm',
      tooltip: 'Triceps skin fold thickness',
      min: 0,
      max: 99,
      unit: 'mm'
    },
    Insulin: {
      label: 'Insulin Level',
      icon: TrendingUp,
      placeholder: 'e.g., 80 μU/mL',
      tooltip: '2-Hour serum insulin',
      min: 0,
      max: 846,
      unit: 'μU/mL'
    },
    BMI: {
      label: 'Body Mass Index (BMI)',
      icon: User,
      placeholder: 'e.g., 25.5',
      tooltip: 'Body mass index (weight in kg/(height in m)²)',
      min: 0,
      max: 67.1,
      unit: 'kg/m²'
    },
    DiabetesPedigreeFunction: {
      label: 'Diabetes Pedigree Function',
      icon: Activity,
      placeholder: 'e.g., 0.5',
      tooltip: 'Diabetes pedigree function (genetic influence)',
      min: 0.078,
      max: 2.42,
      step: 0.001
    },
    Age: {
      label: 'Age',
      icon: User,
      placeholder: 'e.g., 30',
      tooltip: 'Age in years',
      min: 21,
      max: 81,
      unit: 'years'
    }
  };

  useEffect(() => {
    // Fetch normal ranges and feature importance on component mount
    fetchNormalRanges();
    fetchFeatureImportance();
  }, []);

  const fetchNormalRanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/normal-ranges');
      const data = await response.json();
      setNormalRanges(data);
    } catch (error) {
      console.error('Error fetching normal ranges:', error);
    }
  };

  const fetchFeatureImportance = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feature-importance');
      const data = await response.json();
      if (data.features) {
        setFeatureImportance(data.features);
      }
    } catch (error) {
      console.error('Error fetching feature importance:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(fieldInfo).forEach(field => {
      const value = parseFloat(formData[field]);
      const info = fieldInfo[field];
      
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      } else if (isNaN(value)) {
        newErrors[field] = 'Please enter a valid number';
      } else if (value < info.min || value > info.max) {
        newErrors[field] = `Value must be between ${info.min} and ${info.max}`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
        
        // Save to history
        const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
        history.unshift(data);
        localStorage.setItem('predictionHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        alert('Error: ' + (data.error || 'Failed to get prediction'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text('Diabetes Risk Assessment Report', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date(result.timestamp).toLocaleString()}`, 20, 30);
    
    // Result
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('Assessment Result', 20, 45);
    
    doc.setFontSize(12);
    const riskColor = result.prediction === 1 ? [239, 68, 68] : [16, 185, 129];
    doc.setTextColor(...riskColor);
    doc.text(`Risk Level: ${result.risk_level}`, 20, 55);
    doc.setTextColor(0);
    doc.text(`Confidence: ${result.confidence.toFixed(2)}%`, 20, 65);
    
    // Input Data Table
    doc.text('Your Health Parameters', 20, 80);
    
    const tableData = Object.keys(result.input_data).map(key => [
      fieldInfo[key]?.label || key,
      result.input_data[key],
      fieldInfo[key]?.unit || ''
    ]);
    
    doc.autoTable({
      startY: 85,
      head: [['Parameter', 'Value', 'Unit']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }
    });
    
    // Recommendations
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text('Health Recommendations', 20, finalY);
    
    let yPos = finalY + 7;
    result.recommendation.forEach((rec, index) => {
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(rec, 170);
      doc.text(lines, 25, yPos);
      yPos += lines.length * 5 + 3;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('This is an AI-generated assessment. Please consult healthcare professionals for medical advice.', 20, 280);
    
    doc.save('diabetes-risk-assessment.pdf');
  };

  const prepareComparisonData = () => {
    if (!result || !normalRanges) return [];
    
    return Object.keys(result.input_data).map(key => {
      const value = parseFloat(result.input_data[key]);
      const range = normalRanges[key];
      
      if (!range) return null;
      
      const normalMid = range.normal ? 
        (parseFloat(range.normal.split('-')[0]) + parseFloat(range.normal.split('-')[1])) / 2 : 
        value;
      
      return {
        name: fieldInfo[key]?.label || key,
        'Your Value': value,
        'Normal Range': normalMid,
      };
    }).filter(Boolean);
  };

  const prepareRadarData = () => {
    if (!result || !normalRanges) return [];
    
    return Object.keys(result.input_data).slice(0, 6).map(key => {
      const value = parseFloat(result.input_data[key]);
      const range = normalRanges[key];
      const max = range?.max || 100;
      
      return {
        metric: fieldInfo[key]?.label.split(' ')[0] || key,
        value: (value / max) * 100,
        fullMark: 100
      };
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Diabetes Risk <span className="gradient-text">Assessment</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Enter your health parameters to get an AI-powered risk assessment
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.keys(fieldInfo).map((field, index) => {
                const info = fieldInfo[field];
                const Icon = info.icon;
                
                return (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span>{info.label}</span>
                        <div
                          className="relative"
                          onMouseEnter={() => setShowTooltip({ ...showTooltip, [field]: true })}
                          onMouseLeave={() => setShowTooltip({ ...showTooltip, [field]: false })}
                        >
                          <Info className="h-4 w-4 text-gray-400 cursor-help" />
                          {showTooltip[field] && (
                            <div className="absolute z-10 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg -top-2 left-6">
                              {info.tooltip}
                            </div>
                          )}
                        </div>
                      </div>
                    </label>
                    <input
                      type="number"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={info.placeholder}
                      step={info.step || '0.1'}
                      className={`input-field ${errors[field] ? 'input-error' : ''}`}
                    />
                    {errors[field] && (
                      <p className="error-message flex items-center space-x-1 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors[field]}</span>
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center mt-8"
            >
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-lg px-12 py-4 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Activity className="h-5 w-5" />
                    <span>Predict Risk</span>
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Results Section */}
        {result && (
          <motion.div
            id="results-section"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Risk Assessment Card */}
            <div className={`result-card ${result.prediction === 1 ? 'high-risk' : 'low-risk'}`}>
              <div className="text-center">
                <div className="inline-block mb-4">
                  {result.prediction === 1 ? (
                    <AlertCircle className="h-20 w-20" />
                  ) : (
                    <CheckCircle2 className="h-20 w-20" />
                  )}
                </div>
                <h2 className="text-3xl font-bold mb-2">{result.risk_level}</h2>
                <p className="text-xl opacity-90 mb-4">
                  Confidence: {result.confidence.toFixed(2)}%
                </p>
                <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                  <div className="progress-bar bg-white/30">
                    <div 
                      className="progress-fill bg-white"
                      style={{ width: `${result.probability.high_risk}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>{result.probability.low_risk.toFixed(1)}%</span>
                    <span>{result.probability.high_risk.toFixed(1)}%</span>
                  </div>
                </div>
                
                <button
                  onClick={downloadPDF}
                  className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto hover:bg-blue-50 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Report</span>
                </button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Health Recommendations
              </h3>
              <div className="space-y-3">
                {result.recommendation.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visualizations */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature Importance */}
              {featureImportance.length > 0 && (
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Feature Importance
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={featureImportance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={12}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="percentage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Radar Chart */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Health Metrics Profile
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={prepareRadarData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Radar name="Your Values" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Your Values vs Normal Range
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={prepareComparisonData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={120}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Your Value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Normal Range" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="loading-overlay">
            <div className="text-center">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-white text-lg font-semibold">Analyzing your data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
