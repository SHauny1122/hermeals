import React from 'react';
import FitnessCalendar from '../features/fitness/components/FitnessCalendar';

const Fitness = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              30-Day Fitness Journey
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A simple, equipment-free workout plan designed for women to stay active and healthy at home
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Workout Days</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Rest Days</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <FitnessCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
