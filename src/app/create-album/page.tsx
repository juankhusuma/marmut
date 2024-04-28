import React from 'react';

export default function CreateAlbum() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-900 max-w-md w-full">
                <h3 className="text-lg font-semibold text-center mb-4">CREATE ALBUM</h3>
                <form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your album title here"
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label:</label>
                        <select
                            id="label"
                            name="label"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Choose a label</option>
                            <option value="label1">Label 1</option>
                            <option value="label2">Label 2</option>
                            <option value="label3">Label 3</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}
