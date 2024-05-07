import { useRef, useState } from "react";
import { Button, Input, Popover, message, ColorPicker } from "antd";
import "./App.css";

const App = () => {
  const [textSize, setTextSize] = useState();
  const [text, setText] = useState("");
  const [color, setColor] = useState();

  const findRef = useRef();
  const replaceRef = useRef();

  const handleChangeSize = (size) => {
    setTextSize(size);
  };

  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <Popover
          title="修改字体大小"
          content={() => {
            return [
              <Button
                className="color-btn"
                key={"1"}
                onClick={() => handleChangeSize(12)}
              >
                12
              </Button>,
              <Button
                className="color-btn"
                key={"2"}
                onClick={() => handleChangeSize(14)}
              >
                14
              </Button>,
              <Button
                className="color-btn"
                key={"3"}
                onClick={() => handleChangeSize(16)}
              >
                16
              </Button>,
              <Button
                className="color-btn"
                key={"4"}
                onClick={() => handleChangeSize(18)}
              >
                18
              </Button>,
              <Button
                className="color-btn"
                key={"5"}
                onClick={() => handleChangeSize(20)}
              >
                20
              </Button>,
            ];
          }}
        >
          <Button type="default" className="btn">
            变更大小
          </Button>
        </Popover>
        <ColorPicker
        defaultValue={'black'}
          className="btn"
          value={color}
          onChange={(value) => {
            setColor(value.toHexString());
          }}
          format="hex"
        ></ColorPicker>
      </div>
      <div className="btn">
        <Input
          placeholder="请输入查找内容"
          allowClear
          ref={findRef}
          style={{ width: "200px" }}
        ></Input>
        <Button
          type="default"
          className="btn"
          onClick={() => {
            const value = findRef.current.input.value;
            if(text === ''){
              message.error('暂未输入内容，请先输入文本内容！')
            }
            if (text.includes(value)) {
              message.success("查找到文本！");
            } else {
              message.error("未找到指定文本");
            }
          }}
        >
          查找
        </Button>
      </div>
      <div className="btn">
        <Input
          allowClear
          placeholder="请输入替换文本"
          ref={replaceRef}
          style={{ width: "200px" }}
        ></Input>
        <Button
          type="default"
          className="btn"
          onClick={() => {
            const replace = findRef.current.input.value;
            if (replace === "") {
              message.error("请输入要查找的文本");
              return;
            }

            const target = replaceRef.current.input.value;
            const newText = text.replaceAll(replace, target);
            setText(newText);
            message.success("已全部完成替换");
          }}
        >
          替换
        </Button>
      </div>
      <Input.TextArea
        size="large"
        className="text-input"
        placeholder="请输入内容"
        value={text}
        style={{
          fontSize: `${textSize}px`,
          color: `${color}`,
          height: "400px",
          width: "1000px",
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></Input.TextArea>
    </div>
  );
};

export default App;
