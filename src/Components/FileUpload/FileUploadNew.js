import React from "react"
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status === 'done') {
        message.success(`${info.file.name} file upload success!`);
    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failure.`);
    }
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
  },
  onDrop(e) {
    console.log('Uploaded files', e.dataTransfer.files);
  },
};
const FileUploadComponent = (props)=>{
    
    return (<Dragger {...props} style={{border:"1.5px dashed black"}}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Drag files here or click to upload</p>
        <p className="ant-upload-hint">
          Privacy is our top priority.
        </p>
      </Dragger>);
}
export default FileUploadComponent