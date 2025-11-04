from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Global variable to store the model
model = None
feature_importance = None
feature_names = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
                 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age']

def train_model():
    """Train the diabetes prediction model"""
    global model, feature_importance
    
    # Load the dataset
    df = pd.read_csv('diabetes.csv')
    
    # Separate features and target
    X = df.drop('Outcome', axis=1)
    y = df['Outcome']
    
    # Train the best performing model (GradientBoostingClassifier based on notebook)
    model = GradientBoostingClassifier(
        random_state=12345,
        learning_rate=0.1,
        max_depth=5,
        min_samples_split=0.1,
        n_estimators=100,
        subsample=1.0
    )
    
    model.fit(X, y)
    
    # Store feature importance
    feature_importance = dict(zip(feature_names, model.feature_importances_))
    
    # Save the model
    joblib.dump(model, 'diabetes_model.pkl')
    print("Model trained and saved successfully!")
    
    return model

def load_model():
    """Load the trained model"""
    global model, feature_importance
    
    if os.path.exists('diabetes_model.pkl'):
        model = joblib.load('diabetes_model.pkl')
        
        # Recalculate feature importance if needed
        if model is not None:
            feature_importance = dict(zip(feature_names, model.feature_importances_))
        
        print("Model loaded successfully!")
    else:
        print("Model not found. Training new model...")
        model = train_model()
    
    return model

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict diabetes risk"""
    try:
        data = request.get_json()
        
        # Validate input data
        required_fields = feature_names
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Extract features in correct order
        features = [float(data[field]) for field in feature_names]
        features_array = np.array([features])
        
        # Make prediction
        prediction = model.predict(features_array)[0]
        probability = model.predict_proba(features_array)[0]
        
        # Prepare response
        result = {
            'prediction': int(prediction),
            'risk_level': 'High Risk' if prediction == 1 else 'Low Risk',
            'probability': {
                'low_risk': float(probability[0] * 100),
                'high_risk': float(probability[1] * 100)
            },
            'confidence': float(max(probability) * 100),
            'recommendation': get_recommendation(prediction, data),
            'input_data': data,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/api/feature-importance', methods=['GET'])
def get_feature_importance():
    """Get feature importance from the model"""
    try:
        if feature_importance is None:
            return jsonify({
                'error': 'Feature importance not available'
            }), 500
        
        # Sort by importance
        sorted_features = sorted(
            feature_importance.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return jsonify({
            'features': [
                {
                    'name': name,
                    'importance': float(importance),
                    'percentage': float(importance * 100)
                }
                for name, importance in sorted_features
            ]
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/api/normal-ranges', methods=['GET'])
def get_normal_ranges():
    """Get normal ranges for health parameters"""
    ranges = {
        'Pregnancies': {
            'min': 0,
            'max': 17,
            'normal': '0-10',
            'unit': 'times'
        },
        'Glucose': {
            'min': 0,
            'max': 200,
            'normal': '70-140',
            'unit': 'mg/dL',
            'description': 'Fasting blood glucose level'
        },
        'BloodPressure': {
            'min': 0,
            'max': 122,
            'normal': '80-120',
            'unit': 'mm Hg',
            'description': 'Diastolic blood pressure'
        },
        'SkinThickness': {
            'min': 0,
            'max': 99,
            'normal': '10-50',
            'unit': 'mm',
            'description': 'Triceps skin fold thickness'
        },
        'Insulin': {
            'min': 0,
            'max': 846,
            'normal': '16-166',
            'unit': 'μU/mL',
            'description': '2-Hour serum insulin'
        },
        'BMI': {
            'min': 0,
            'max': 67.1,
            'normal': '18.5-24.9',
            'unit': 'kg/m²',
            'description': 'Body Mass Index'
        },
        'DiabetesPedigreeFunction': {
            'min': 0.078,
            'max': 2.42,
            'normal': '0.08-0.5',
            'unit': 'score',
            'description': 'Diabetes heredity score'
        },
        'Age': {
            'min': 21,
            'max': 81,
            'normal': '21-60',
            'unit': 'years'
        }
    }
    
    return jsonify(ranges)

def get_recommendation(prediction, data):
    """Generate personalized health recommendation"""
    if prediction == 1:
        recommendations = [
            "⚠️ Your results indicate a high risk of diabetes.",
            "📋 Please consult with a healthcare professional for proper diagnosis and treatment.",
            "🏃 Consider regular exercise (at least 30 minutes daily).",
            "🥗 Adopt a balanced diet low in sugar and refined carbohydrates.",
            "⚖️ Maintain a healthy weight through diet and exercise."
        ]
        
        # Add specific recommendations based on values
        if float(data.get('BMI', 0)) > 30:
            recommendations.append("⚖️ Your BMI is elevated. Weight management could significantly reduce your risk.")
        
        if float(data.get('Glucose', 0)) > 140:
            recommendations.append("📊 Your glucose level is high. Regular monitoring is essential.")
        
        return recommendations
    else:
        recommendations = [
            "✅ Your results indicate a low risk of diabetes.",
            "🎯 Continue maintaining a healthy lifestyle to keep your risk low.",
            "🥗 Eat a balanced diet rich in vegetables, fruits, and whole grains.",
            "🏃 Stay physically active with regular exercise.",
            "📅 Schedule regular health check-ups to monitor your health.",
            "💤 Ensure adequate sleep (7-9 hours per night)."
        ]
        
        return recommendations

if __name__ == '__main__':
    # Load or train the model on startup
    load_model()
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)
