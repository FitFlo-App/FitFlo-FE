import React from "react";
import { Upload, Button, message } from "antd";
import {
  PaperClipOutlined,
  CloseOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";

const { Dragger } = Upload;

interface FileUploaderProps {
  fileList: any[];
  setFileList: React.Dispatch<React.SetStateAction<any[]>>;
  isDragging?: boolean;
  compact?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileList,
  setFileList,
  isDragging = false,
  compact = false,
}) => {
  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const beforeUpload = (file: File) => {
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("File must be smaller than 10MB");
    }
    return false; // Prevent actual upload
  };

  const handleRemoveFile = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    fileList,
    beforeUpload,
    onChange: handleFileChange,
    onDrop: (e: any) => {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: false,
  };

  const renderUploadedFiles = () => {
    if (fileList.length === 0) return null;

    return (
      <div className={`uploaded-files ${compact ? "mt-1" : "mt-3"}`}>
        {fileList.map((file) => (
          <div
            key={file.uid}
            className={`inline-flex items-center ${compact ? "py-1 px-2" : "py-1 px-3"} mr-2 mb-2 bg-gray-100 rounded`}
            style={{ maxWidth: compact ? "120px" : "180px" }}
          >
            <span
              className="truncate"
              style={{ maxWidth: compact ? "80px" : "150px" }}
            >
              {file.name}
            </span>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => handleRemoveFile(file)}
              className="ml-1 p-0 text-gray-500 hover:text-red-500 hover:bg-transparent"
            />
          </div>
        ))}
      </div>
    );
  };

  if (isDragging) {
    return (
      <Dragger
        {...uploadProps}
        className="py-5 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl transition-all hover:border-blue-400"
      >
        <p className="mb-4">
          <InboxOutlined className="text-4xl text-blue-500" />
        </p>
        <p className="mb-2 text-base text-gray-800">
          Click or drag file to this area to upload
        </p>
        <p className="text-gray-500">
          Support for a single or bulk upload. Maximum file size: 10MB.
        </p>
      </Dragger>
    );
  }

  if (compact) {
    return (
      <>
        <Upload {...uploadProps} showUploadList={false}>
          <Button
            type="text"
            icon={<PaperClipOutlined />}
            className="transition-all hover:text-blue-500 hover:bg-blue-50"
          />
        </Upload>
        {renderUploadedFiles()}
      </>
    );
  }

  return (
    <>
      <Upload {...uploadProps} showUploadList={false}>
        <Button
          icon={<PaperClipOutlined />}
          className="h-full transition-all hover:text-blue-500 hover:bg-blue-50"
        >
          Attach
        </Button>
      </Upload>
      {renderUploadedFiles()}
    </>
  );
};

export default FileUploader;
