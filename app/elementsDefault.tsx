import React from 'react';

// 파일 리스트 컴포넌트: 파일들을 표시하고 체크박스로 선택할 수 있습니다.
export const FileList = ({ files, onSelect }: { files?: Array<{ name: string }>; onSelect: (file: any) => void }) => {
  return (
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
};

// 파일 업로드 버튼: 파일 업로드 동작을 트리거합니다.
export const FileUploadButton = ({ onUpload }: { onUpload: () => void }) => {
  return <button onClick={onUpload}>Upload File</button>;
};

// 파일 삭제 버튼: 선택된 파일들을 삭제합니다.
export const FileDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return <button onClick={onDelete}>Delete Selected</button>;
};

// 폴더 생성 버튼: 새로운 폴더를 생성하는 동작을 처리합니다.
export const FolderCreateButton = ({ onCreateFolder }: { onCreateFolder: () => void }) => {
  return <button onClick={onCreateFolder}>Create Folder</button>;
};

// 모든 컴포넌트를 묶어 기본 UI 요소로 내보냅니다.
export const elementsDefault = {
  FileList,
  FileUploadButton,
  FileDeleteButton,
  FolderCreateButton,
};
