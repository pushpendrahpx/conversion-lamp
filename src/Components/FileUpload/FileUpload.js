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
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const FileUploadComponent = (props)=>{
    
    return (<Dragger {...props} style={{border:"1.5px dashed black"}}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag your file to this area to upload</p>
        <p className="ant-upload-hint">
          You can safely trust us, we never upload your data to anywhere, we convert all of the files right inside of your browser.
        </p>
      </Dragger>);
}
export default FileUploadComponent