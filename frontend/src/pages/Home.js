import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  Shield, 
  TrendingUp, 
  Heart, 
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your health data with high accuracy.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your health data is processed locally and never stored on our servers.'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your health journey with detailed history and trend analysis.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get your diabetes risk assessment in seconds with confidence scores.'
    }
  ];

  const stats = [
    { value: '95%', label: 'Accuracy' },
    { value: '10K+', label: 'Predictions' },
    { value: '<1s', label: 'Response Time' },
    { value: '24/7', label: 'Available' }
  ];

  const benefits = [
    'Early detection of diabetes risk',
    'Personalized health recommendations',
    'Track your health metrics over time',
    'Educational resources about diabetes',
    'Export and share your results',
    'No registration required'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-6">
                <Heart className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Predict Your Diabetes Risk with{' '}
              <span className="gradient-text">AI Precision</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Harness the power of machine learning to assess your diabetes risk in seconds. 
              Get personalized insights and take control of your health journey today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/predict')}
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/learn-more')}
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <span>Learn More</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DiabetesAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Cutting-edge technology meets healthcare excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="card card-hover text-center"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Take Control of Your Health
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Early detection is key to preventing diabetes. Our AI-powered tool helps you 
                understand your risk factors and provides actionable insights to maintain a healthy lifestyle.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card p-8">
                <Activity className="h-24 w-24 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                  Start Your Assessment
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Quick, easy, and confidential. Get your diabetes risk assessment in under 2 minutes.
                </p>
                <button
                  onClick={() => navigate('/predict')}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Begin Assessment</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card bg-gradient-to-br from-blue-600 to-blue-700 text-white p-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Check Your Risk?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who've taken the first step towards better health
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/predict')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Get Your Results Now</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
