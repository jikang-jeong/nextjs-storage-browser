import React from 'react';

// 파일 리스트 컴포넌트 (삭제용 체크박스 포함)
export const FileList = ({ files, onSelect }: { files?: Array<{ name: string }>; onSelect: (file: any) => void }) => (
  <div className="file-list">
    {files && files.length > 0 ? (
      files.map((file, idx) => (
        <div key={idx} className="file-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <input type="checkbox" onChange={() => onSelect(file)} style={{ marginRight: '10px' }} />
          <span>{file.name}</span>
        </div>
      ))
    ) : (
      <div>No files found.</div>
    )}
  </div>
);

// 파일 업로드 버튼
export const FileUploadButton = ({ onUpload }: { onUpload: () => void }) => (
  <button onClick={onUpload}>Upload File</button>
);

// 파일 삭제 버튼
export const FileDeleteButton = ({ onDelete }: { onDelete: () => void }) => (
  <button onClick={onDelete}>Delete Selected</button>
);

// 폴더 생성 버튼
export const FolderCreateButton = ({ onCreateFolder }: { onCreateFolder: () => void }) => (
  <button onClick={onCreateFolder}>Create Folder</button>
);

// 모든 UI 요소들을 묶어 export
export const customElements = {
  FileList,
  FileUploadButton,
  FileDeleteButton,
  FolderCreateButton,
};
