import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Apple, 
  Dumbbell,
  Brain,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Users,
  Clock
} from 'lucide-react';

const LearnMore = () => {
  const diabetesInfo = [
    {
      icon: Heart,
      title: 'What is Diabetes?',
      content: 'Diabetes is a chronic disease that occurs when the pancreas does not produce enough insulin, or when the body cannot effectively use the insulin it produces. Insulin is a hormone that regulates blood sugar levels.'
    },
    {
      icon: AlertTriangle,
      title: 'Types of Diabetes',
      content: 'Type 1 diabetes is an autoimmune condition where the body attacks insulin-producing cells. Type 2 diabetes occurs when the body becomes resistant to insulin or doesn\'t produce enough. Gestational diabetes occurs during pregnancy.'
    },
    {
      icon: Activity,
      title: 'Risk Factors',
      content: 'Key risk factors include family history, obesity, physical inactivity, age (over 45), high blood pressure, and abnormal cholesterol levels. Certain ethnicities are also at higher risk.'
    },
    {
      icon: Brain,
      title: 'Early Detection',
      content: 'Early detection through regular screening can prevent or delay complications. Common symptoms include increased thirst, frequent urination, unexplained weight loss, fatigue, and blurred vision.'
    }
  ];

  const preventionTips = [
    {
      icon: Apple,
      title: 'Healthy Diet',
      tips: [
        'Choose whole grains over refined carbohydrates',
        'Eat plenty of fruits and vegetables',
        'Limit sugary drinks and processed foods',
        'Control portion sizes',
        'Include lean proteins and healthy fats'
      ]
    },
    {
      icon: Dumbbell,
      title: 'Regular Exercise',
      tips: [
        'Aim for 150 minutes of moderate activity per week',
        'Include both aerobic and strength training',
        'Break up long periods of sitting',
        'Find activities you enjoy',
        'Start slowly and gradually increase intensity'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Weight Management',
      tips: [
        'Maintain a healthy BMI (18.5-24.9)',
        'Lose 5-10% of body weight if overweight',
        'Monitor your progress regularly',
        'Set realistic, achievable goals',
        'Combine diet and exercise for best results'
      ]
    },
    {
      icon: Shield,
      title: 'Lifestyle Changes',
      tips: [
        'Get 7-9 hours of quality sleep',
        'Manage stress through meditation or yoga',
        'Quit smoking and limit alcohol',
        'Stay hydrated throughout the day',
        'Regular health check-ups and screenings'
      ]
    }
  ];

  const complications = [
    {
      name: 'Cardiovascular Disease',
      description: 'Diabetes increases risk of heart disease, stroke, and other cardiovascular conditions.',
      icon: Heart
    },
    {
      name: 'Nerve Damage',
      description: 'High blood sugar can damage nerves, especially in legs and feet (neuropathy).',
      icon: Activity
    },
    {
      name: 'Kidney Disease',
      description: 'Diabetes can damage the kidney\'s filtering system, potentially leading to kidney failure.',
      icon: AlertTriangle
    },
    {
      name: 'Eye Damage',
      description: 'Can damage blood vessels in the retina, potentially leading to blindness.',
      icon: Brain
    }
  ];

  const statistics = [
    { value: '537M', label: 'Adults with diabetes worldwide' },
    { value: '90%', label: 'Have Type 2 diabetes' },
    { value: '50%', label: 'Are undiagnosed' },
    { value: '1.5M', label: 'Deaths attributed to diabetes annually' }
  ];

  const faqs = [
    {
      question: 'Can diabetes be prevented?',
      answer: 'Type 2 diabetes can often be prevented or delayed through lifestyle changes including healthy diet, regular exercise, and weight management. Type 1 diabetes cannot be prevented as it is an autoimmune condition.'
    },
    {
      question: 'How accurate is AI prediction?',
      answer: 'Our machine learning model achieves approximately 95% accuracy based on the Pima Indians Diabetes Dataset. However, this is a screening tool and should not replace professional medical diagnosis.'
    },
    {
      question: 'What should I do if I\'m at high risk?',
      answer: 'If the assessment shows high risk, consult a healthcare professional for proper diagnosis and treatment. Start making lifestyle changes, get regular check-ups, and monitor your blood sugar levels as advised by your doctor.'
    },
    {
      question: 'How often should I check my risk?',
      answer: 'For general screening, annual assessments are recommended. If you have risk factors or are making lifestyle changes, you may want to check more frequently, such as every 3-6 months.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, all predictions are processed locally in your browser. We do not store your health data on our servers. History is saved only in your browser\'s local storage.'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding <span className="gradient-text">Diabetes</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Empower yourself with knowledge about diabetes prevention, management, and the importance of early detection
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {statistics.map((stat, index) => (
            <div key={index} className="card text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Diabetes Information */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
          >
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            About Diabetes
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {diabetesInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                    <info.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {info.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
          >
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            Prevention & Management
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preventionTips.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 inline-block mb-4">
                  <category.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Complications */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
          >
            <AlertTriangle className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            Potential Complications
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {complications.map((complication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3">
                    <complication.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {complication.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {complication.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 mt-6"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Prevention is Key
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Many of these complications can be prevented or delayed through proper blood sugar management, 
                  regular monitoring, and maintaining a healthy lifestyle. Early detection and treatment are crucial.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center"
          >
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card group"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </div>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card bg-gradient-to-br from-blue-600 to-blue-700 text-white text-center p-12"
        >
          <Clock className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Take Action Today
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Early detection can make all the difference. Check your risk now and take control of your health.
          </p>
          <button
            onClick={() => window.location.href = '/predict'}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Get Your Risk Assessment
          </button>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          <p className="mb-2">
            <strong>Disclaimer:</strong> This tool is for educational and screening purposes only. 
            It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always consult with qualified healthcare professionals regarding any health concerns or before making 
            any decisions related to your health or treatment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnMore;
