import React from 'react';

interface MediaUploadProps {
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ onFileUpload }) => {
    return (
        <div className="upload-area">
            <input
                type="file"
                accept="image/*,video/*"
                onChange={onFileUpload}
                className="file-input"
                id="file-input"
            />
            <label htmlFor="file-input" className="upload-label">
                Upload Image or Video
            </label>
        </div>
    );
};