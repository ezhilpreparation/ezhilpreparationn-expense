import { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { FREQUENCY_OPTIONS, FrequencyType, END_TYPE_OPTIONS, EndType } from '../types/scheduledTransaction';

interface FrequencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFrequency: FrequencyType;
  currentEndType: EndType;
  currentInterval: number;
  currentOccurrence: number;
  onUpdate: (frequency: FrequencyType, endType: EndType, interval: number, occurrence: number) => void;
}

export default function FrequencyModal({ 
  isOpen, 
  onClose, 
  currentFrequency,
  currentEndType,
  currentInterval,
  currentOccurrence,
  onUpdate
}: FrequencyModalProps) {
  const [selectedFrequency, setSelectedFrequency] = useState(currentFrequency);
  const [selectedEndType, setSelectedEndType] = useState(currentEndType);
  const [selectedInterval, setSelectedInterval] = useState(currentInterval);
  const [selectedOccurrence, setSelectedOccurrence] = useState(currentOccurrence);

  const handleUpdate = () => {
    onUpdate(selectedFrequency, selectedEndType, selectedInterval, selectedOccurrence);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
            <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-600" />
            Frequency
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Choose how often this transaction should repeat:</p>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Frequency Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Frequency</label>
              <div className="space-y-2">
            {Object.entries(FREQUENCY_OPTIONS).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSelectedFrequency(value as FrequencyType)}
                className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
                  selectedFrequency === value
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{label}</span>
                  {selectedFrequency === value && (
                    <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
              </div>
            </div>

            {/* Frequency Interval */}
            {selectedFrequency !== 'NONE' && (
              <div>
                <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-2">
                  Repeat every
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    id="interval"
                    min="1"
                    value={selectedInterval}
                    onChange={(e) => setSelectedInterval(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  <span className="text-sm text-gray-600">
                    {selectedFrequency === 'DAILY' ? 'day(s)' :
                     selectedFrequency === 'WEEKLY' ? 'week(s)' :
                     selectedFrequency === 'MONTHLY' ? 'month(s)' :
                     selectedFrequency === 'YEARLY' ? 'year(s)' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* End Type */}
            {selectedFrequency !== 'NONE' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Ends</label>
                <div className="space-y-2">
                  {Object.entries(END_TYPE_OPTIONS).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setSelectedEndType(value as EndType)}
                      className={`w-full p-3 text-left border-2 rounded-lg transition-all ${
                        selectedEndType === value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{label}</span>
                        {selectedEndType === value && (
                          <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Occurrence Count */}
            {selectedEndType === 'OCCURRENCE' && (
              <div>
                <label htmlFor="occurrence" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of occurrences
                </label>
                <input
                  type="number"
                  id="occurrence"
                  min="1"
                  value={selectedOccurrence}
                  onChange={(e) => setSelectedOccurrence(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter number of times to repeat"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t">
          <div className="flex space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base font-medium"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}