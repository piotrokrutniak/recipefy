import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const QuillEditor = ({ state, setState }: { state: string, setState: (value: string) => void }) => {
  const handleChange = (newValue: string) => {
    setState(newValue);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div>
      <div>
        {/* Bar with effects */}
        <ReactQuill value={state} onChange={handleChange} modules={modules} />
      </div>
    </div>
  );
};