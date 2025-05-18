// components/PopUpConfirmation.tsx

import { ConfirmationTemplates } from '@/types/PopUpConfirmTemplate';
import { ConfirmationType } from '@/utils/enum';
import React from 'react';

interface PopUpConfirmationProps {
    show: boolean;
    type: ConfirmationType;
    onConfirm: () => void;
    onClose: () => void;
}

const PopUpConfirmation: React.FC<PopUpConfirmationProps> = ({
    show,
    type,
    onConfirm,
    onClose,
}) => {
    if (!show) return null;

    const template = ConfirmationTemplates[type];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-slideIn transition-transform duration-300">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{template.title}</h2>
                <p className="text-gray-700 mb-6">{template.message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition duration-200"
                    >
                        {template.onClose}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition duration-200"
                    >
                        {template.onConfirm}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopUpConfirmation;
