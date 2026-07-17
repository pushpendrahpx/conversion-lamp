import React, { useState } from "react";
import {
  Upload,
  message,
  Select,
  Button,
  List,
  Space,
  Typography,
  Radio,
  InputNumber,
  Checkbox,
} from "antd";
import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import "./FileUpload.css";

const { Dragger } = Upload;
const { Text } = Typography;

const FORMAT_OPTIONS = [
  { label: "PNG", value: "image/png", ext: "png" },
  { label: "JPEG", value: "image/jpeg", ext: "jpg" },
];

const readImageMeta = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read image"));
    };
    img.src = objectUrl;
  });

const convertImage = (file, targetType, width, height) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (targetType === "image/jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (blob) resolve(blob);
          else reject(new Error("Conversion failed"));
        },
        targetType,
        0.92
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not read image"));
    };
    img.src = objectUrl;
  });

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const stripExtension = (name) => name.replace(/\.[^/.]+$/, "");

const resolveTargetSize = (entry) => {
  if (entry.mode === "percent") {
    const scale = (entry.percent || 100) / 100;
    return {
      width: Math.max(1, Math.round(entry.naturalWidth * scale)),
      height: Math.max(1, Math.round(entry.naturalHeight * scale)),
    };
  }
  return {
    width: Math.max(1, Math.round(entry.width || entry.naturalWidth)),
    height: Math.max(1, Math.round(entry.height || entry.naturalHeight)),
  };
};

const FileUploadComponent = () => {
  const [files, setFiles] = useState([]);

  const updateFile = (uid, patch) => {
    setFiles((prev) =>
      prev.map((f) => (f.uid === uid ? { ...f, ...patch } : f))
    );
  };

  const removeFile = (uid) => {
    setFiles((prev) => prev.filter((f) => f.uid !== uid));
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    accept: "image/*",
    showUploadList: false,
    beforeUpload: (file) => {
      if (!file.type.startsWith("image/")) {
        message.error(`${file.name} is not an image file.`);
        return Upload.LIST_IGNORE;
      }
      setFiles((prev) => [
        ...prev,
        {
          uid: file.uid,
          file,
          target: "image/png",
          mode: "dimensions",
          naturalWidth: null,
          naturalHeight: null,
          width: null,
          height: null,
          percent: 100,
          lockAspect: true,
          converting: false,
        },
      ]);
      readImageMeta(file)
        .then(({ width, height }) => {
          updateFile(file.uid, {
            naturalWidth: width,
            naturalHeight: height,
            width,
            height,
          });
        })
        .catch(() => {
          message.error(`Could not read dimensions for ${file.name}.`);
        });
      return false;
    },
  };

  const handleWidthChange = (entry, value) => {
    if (entry.lockAspect && entry.naturalWidth && entry.naturalHeight) {
      const ratio = entry.naturalHeight / entry.naturalWidth;
      updateFile(entry.uid, {
        width: value,
        height: Math.max(1, Math.round(value * ratio)),
      });
    } else {
      updateFile(entry.uid, { width: value });
    }
  };

  const handleHeightChange = (entry, value) => {
    if (entry.lockAspect && entry.naturalWidth && entry.naturalHeight) {
      const ratio = entry.naturalWidth / entry.naturalHeight;
      updateFile(entry.uid, {
        height: value,
        width: Math.max(1, Math.round(value * ratio)),
      });
    } else {
      updateFile(entry.uid, { height: value });
    }
  };

  const handleConvert = async (entry) => {
    const { width, height } = resolveTargetSize(entry);
    updateFile(entry.uid, { converting: true });
    try {
      const blob = await convertImage(entry.file, entry.target, width, height);
      const targetMeta = FORMAT_OPTIONS.find((f) => f.value === entry.target);
      downloadBlob(
        blob,
        `${stripExtension(entry.file.name)}.${targetMeta.ext}`
      );
      message.success(
        `${entry.file.name} converted to ${targetMeta.label} (${width}x${height}).`
      );
    } catch (err) {
      message.error(`Failed to convert ${entry.file.name}.`);
    } finally {
      updateFile(entry.uid, { converting: false });
    }
  };

  return (
    <div>
      <Dragger {...uploadProps} style={{ border: "1.5px dashed black" }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag your image to this area to upload
        </p>
        <p className="ant-upload-hint">
          You can safely trust us, we never upload your data anywhere, we
          resize and convert all of the files right inside of your browser.
        </p>
      </Dragger>

      {files.length > 0 && (
        <List
          className="file-convert-list"
          itemLayout="horizontal"
          dataSource={files}
          renderItem={(entry) => {
            const previewSize = entry.naturalWidth ? resolveTargetSize(entry) : null;
            return (
              <List.Item
                actions={[
                  <Button
                    key="convert"
                    type="primary"
                    icon={<DownloadOutlined />}
                    loading={entry.converting}
                    disabled={!entry.naturalWidth}
                    onClick={() => handleConvert(entry)}
                  >
                    Convert
                  </Button>,
                  <Button
                    key="remove"
                    danger
                    onClick={() => removeFile(entry.uid)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={entry.file.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Text type="secondary">
                        {(entry.file.size / 1024).toFixed(1)} KB
                        {entry.naturalWidth
                          ? ` • original ${entry.naturalWidth}x${entry.naturalHeight}`
                          : " • reading dimensions..."}
                      </Text>

                      <Space wrap>
                        <Radio.Group
                          size="small"
                          value={entry.mode}
                          onChange={(e) =>
                            updateFile(entry.uid, { mode: e.target.value })
                          }
                        >
                          <Radio.Button value="dimensions">
                            Width / Height
                          </Radio.Button>
                          <Radio.Button value="percent">% Size</Radio.Button>
                        </Radio.Group>

                        {entry.mode === "dimensions" ? (
                          <Space size="small">
                            <Text type="secondary">W</Text>
                            <InputNumber
                              size="small"
                              min={1}
                              style={{ width: 72 }}
                              value={entry.width}
                              onChange={(value) =>
                                handleWidthChange(entry, value)
                              }
                            />
                            <Text type="secondary">H</Text>
                            <InputNumber
                              size="small"
                              min={1}
                              style={{ width: 72 }}
                              value={entry.height}
                              onChange={(value) =>
                                handleHeightChange(entry, value)
                              }
                            />
                            <Checkbox
                              checked={entry.lockAspect}
                              onChange={(e) =>
                                updateFile(entry.uid, {
                                  lockAspect: e.target.checked,
                                })
                              }
                            >
                              Lock ratio
                            </Checkbox>
                          </Space>
                        ) : (
                          <Space size="small">
                            <InputNumber
                              size="small"
                              min={1}
                              max={500}
                              style={{ width: 72 }}
                              value={entry.percent}
                              formatter={(value) => `${value}%`}
                              parser={(value) => value.replace("%", "")}
                              onChange={(value) =>
                                updateFile(entry.uid, { percent: value })
                              }
                            />
                            {previewSize && (
                              <Text type="secondary">
                                &rarr; {previewSize.width}x{previewSize.height}
                              </Text>
                            )}
                          </Space>
                        )}

                        <Select
                          size="small"
                          value={entry.target}
                          style={{ width: 100 }}
                          options={FORMAT_OPTIONS.map(({ label, value }) => ({
                            label,
                            value,
                          }))}
                          onChange={(value) =>
                            updateFile(entry.uid, { target: value })
                          }
                        />
                      </Space>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default FileUploadComponent;
