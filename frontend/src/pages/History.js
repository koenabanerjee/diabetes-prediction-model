import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Trash2, 
  Download, 
  AlertCircle,
  CheckCircle2,
  Filter,
  Search,
  Calendar
} from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // all, high-risk, low-risk
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [history, filter, searchTerm, sortBy]);

  const loadHistory = () => {
    const stored = localStorage.getItem('predictionHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };

  const applyFilters = () => {
    let filtered = [...history];

    // Apply risk filter
    if (filter === 'high-risk') {
      filtered = filtered.filter(item => item.prediction === 1);
    } else if (filter === 'low-risk') {
      filtered = filtered.filter(item => item.prediction === 0);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.risk_level.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(item.timestamp).toLocaleDateString().includes(searchTerm)
      );
    }

    // Apply sorting
    if (sortBy === 'date-desc') {
      filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortBy === 'date-asc') {
      filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else if (sortBy === 'risk-high') {
      filtered.sort((a, b) => b.probability.high_risk - a.probability.high_risk);
    } else if (sortBy === 'risk-low') {
      filtered.sort((a, b) => a.probability.high_risk - b.probability.high_risk);
    }

    setFilteredHistory(filtered);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      localStorage.removeItem('predictionHistory');
      setHistory([]);
      setFilteredHistory([]);
    }
  };

  const deleteItem = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const exportToCSV = () => {
    if (filteredHistory.length === 0) return;

    const headers = ['Date', 'Time', 'Risk Level', 'Confidence', 'Glucose', 'BMI', 'Age', 'Blood Pressure'];
    const rows = filteredHistory.map(item => [
      new Date(item.timestamp).toLocaleDateString(),
      new Date(item.timestamp).toLocaleTimeString(),
      item.risk_level,
      item.confidence.toFixed(2) + '%',
      item.input_data.Glucose,
      item.input_data.BMI,
      item.input_data.Age,
      item.input_data.BloodPressure
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diabetes-prediction-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStats = () => {
    const total = history.length;
    const highRisk = history.filter(item => item.prediction === 1).length;
    const lowRisk = history.filter(item => item.prediction === 0).length;
    const avgConfidence = history.length > 0 
      ? history.reduce((acc, item) => acc + item.confidence, 0) / total 
      : 0;

    return { total, highRisk, lowRisk, avgConfidence };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Prediction <span className="gradient-text">History</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your diabetes risk assessments over time
          </p>
        </motion.div>

        {/* Statistics Cards */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Predictions</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                {stats.highRisk}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">High Risk</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                {stats.lowRisk}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Low Risk</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {stats.avgConfidence.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</div>
            </div>
          </motion.div>
        )}

        {/* Filters and Controls */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 w-full"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="input-field py-2"
                >
                  <option value="all">All Results</option>
                  <option value="high-risk">High Risk Only</option>
                  <option value="low-risk">Low Risk Only</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field py-2"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="risk-high">Highest Risk</option>
                  <option value="risk-low">Lowest Risk</option>
                </select>
              </div>

              {/* Export and Clear */}
              <div className="flex space-x-2">
                <button
                  onClick={exportToCSV}
                  className="btn-secondary py-2 px-4 text-sm flex items-center space-x-1"
                  title="Export to CSV"
                >
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={clearHistory}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center space-x-1"
                  title="Clear all history"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Clear</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card card-hover"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      item.prediction === 1 
                        ? 'bg-red-100 dark:bg-red-900/30' 
                        : 'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      {item.prediction === 1 ? (
                        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      ) : (
                        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`badge ${
                          item.prediction === 1 ? 'badge-high-risk' : 'badge-low-risk'
                        }`}>
                          {item.risk_level}
                        </span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {item.confidence.toFixed(1)}% Confidence
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                          <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Glucose</span>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.input_data.Glucose} mg/dL
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">BMI</span>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.input_data.BMI}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Age</span>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.input_data.Age} years
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">BP</span>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.input_data.BloodPressure} mm Hg
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Delete Button */}
                  <button
                    onClick={() => deleteItem(index)}
                    className="self-end md:self-center p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete this record"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Risk Distribution</span>
                    <span>{item.probability.high_risk.toFixed(1)}% High Risk</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        item.prediction === 1 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${item.probability.high_risk}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : history.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters or search term
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No prediction history yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start by making your first diabetes risk assessment
            </p>
            <button
              onClick={() => window.location.href = '/predict'}
              className="btn-primary"
            >
              Make First Prediction
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;
