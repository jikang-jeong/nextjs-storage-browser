// app/customElements.tsx
import React from "react";

// 커스텀 파일 리스트 컴포넌트: 파일 이름 옆에 체크박스를 표시합니다.
export const CustomFileList = ({
  files,
  onSelect,
}: {
  files?: Array<{ name: string }>;
  onSelect: (file: any) => void;
}) => {
  return (
    <div className="custom-file-list">
      {files && files.length > 0 ? (
        files.map((file, idx) => (
          <div key={idx} className="custom-file-item" style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <input
              type="checkbox"
              onChange={() => onSelect(file)}
              style={{ marginRight: "10px" }}
            />
            <span>{file.name}</span>
          </div>
        ))
      ) : (
        <div>No files found.</div>
      )}
    </div>
  );
};

// 커스텀 파일 업로드 버튼
export const CustomFileUploadButton = ({ onUpload }: { onUpload: () => void }) => {
  return <button onClick={onUpload}>Upload File</button>;
};

// 커스텀 파일 삭제 버튼
export const CustomFileDeleteButton = ({ onDelete }: { onDelete: () => void }) => {
  return <button onClick={onDelete}>Delete Selected</button>;
};

// 커스텀 폴더 생성 버튼
export const CustomFolderCreateButton = ({ onCreateFolder }: { onCreateFolder: () => void }) => {
  return <button onClick={onCreateFolder}>Create Folder</button>;
};

// 커스텀 기본 UI 요소 객체
export const customElements = {
  FileList: CustomFileList,
  FileUploadButton: CustomFileUploadButton,
  FileDeleteButton: CustomFileDeleteButton,
  FolderCreateButton: CustomFolderCreateButton,
};
