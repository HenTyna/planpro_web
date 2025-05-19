import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface AddTodosProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: any) => void;
    initialStatus?: string;
}

interface FormData {
    title: string;
    content: string;
    property: string;
    imageUrl: string;
    status: string;
    color: string;
}

interface FormErrors {
    title?: string;
    content?: string;
}

const AddTodos: React.FC<AddTodosProps> = ({ isOpen, onClose, onSubmit, initialStatus = 'Todo' }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        property: 'Design',
        imageUrl: '',
        status: initialStatus,
        color: 'bg-blue-400'
    });

    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});

    const properties = [
        'Design',
        'Frontend',
        'Backend',
        'QA',
        'DevOps',
        'Marketing',
        'Product',
        'Research',
        'Infrastructure',
        'Legal',
        'Content',
        'Engineering',
        'UX'
    ];

    const colors = [
        { label: 'Blue', value: 'bg-blue-400' },
        { label: 'Green', value: 'bg-green-400' },
        { label: 'Yellow', value: 'bg-yellow-400' },
        { label: 'Red', value: 'bg-red-400' },
        { label: 'Purple', value: 'bg-purple-400' },
        { label: 'Indigo', value: 'bg-indigo-400' },
        { label: 'Pink', value: 'bg-pink-400' },
        { label: 'Orange', value: 'bg-orange-400' },
        { label: 'Teal', value: 'bg-teal-400' },
        { label: 'Cyan', value: 'bg-cyan-400' }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData(prev => ({
            ...prev,
            imageUrl: url
        }));
        setImagePreview(url);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            const newTask = {
                id: Date.now(),
                title: formData.title.trim(),
                content: formData.content.trim(),
                property: formData.property,
                color: formData.color,
                status: formData.status,
                image: formData.imageUrl || null,
                createdAt: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14),
                updatedAt: new Date().toISOString().replace(/[-:.]/g, '').slice(0, 14)
            };

            onSubmit(newTask);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({
            title: '',
            content: '',
            property: 'Design',
            imageUrl: '',
            status: initialStatus,
            color: 'bg-blue-400'
        });
        setImagePreview('');
        setErrors({});
        onClose();
    };

    const handleImageError = () => {
        setImagePreview('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-[600px] max-h-screen overflow-auto">
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Add Task</h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter task title"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                placeholder="Enter task description"
                                rows={3}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none ${errors.content ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                            )}
                        </div>

                        {/* Property */}
                        <div>
                            <label htmlFor="property" className="block text-sm font-medium text-gray-700 mb-2">
                                Property
                            </label>
                            <select
                                id="property"
                                name="property"
                                value={formData.property}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                            >
                                {properties.map((property) => (
                                    <option key={property} value={property}>
                                        {property}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Color
                            </label>
                            <div className="grid grid-cols-17 gap-2">
                                {colors.map((color, idx) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                                        className={`relative h-6 w-6 rounded-full flex items-center justify-center cursor-pointer ${color.value} ${formData.color === color.value ? 'ring-2 ring-gray-400' : ''}`}
                                        title={color.label}
                                        aria-label={`Select ${color.label} color`}
                                    >
                                        {formData.color === color.value && (
                                            <svg
                                                className="absolute text-white w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors bg-white"
                            >
                                <option value="Todo">Todo</option>
                                <option value="InProgress">In Progress</option>
                                <option value="OnHold">On Hold</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL
                            </label>
                            <div className="space-y-3">
                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleImageUrlChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                                />

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                            onError={handleImageError}
                                        />
                                    </div>
                                )}

                                {/* Upload hint */}
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <ImageIcon size={16} />
                                    <span>Optional: Add an image to make your task more visual</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AddTodos;