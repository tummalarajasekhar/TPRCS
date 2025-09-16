
import React from 'react';
import { Award, Users, Clock, CheckCircle } from 'lucide-react';

export default function About() {
  const achievements = [
    { icon: Award, label: 'Years of Experience', value: '8+' },
    { icon: Users, label: 'Happy Clients', value: '150+' },
    { icon: Clock, label: 'Projects Completed', value: '200+' },
    { icon: CheckCircle, label: 'Success Rate', value: '99%' }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 rounded-full text-green-800 dark:text-green-200 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4 mr-2" />
              Trusted by Industry Leaders
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Building Digital Excellence
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
               TPRCS is a premier software development company specializing in creating 
              innovative web applications and providing comprehensive digital solutions. Our team of 
              expert developers combines cutting-edge technology with creative problem-solving to 
              deliver exceptional results.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Agile development methodology</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">24/7 support and maintenance</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Scalable and secure solutions</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="inline-flex p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl mb-4">
                  <achievement.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}