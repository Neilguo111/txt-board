import { useRef, useState } from 'react';
import logo from './logo.svg';
import {Button, Input, Popover, message} from 'antd'
import './App.css'


const App = () => {
  const [textSize, setTextSize] = useState();
  const [text, setText] = useState('');
  const [color, setColor] = useState();

  const findRef = useRef();
  const replaceRef = useRef();

  const handleChangeSize = (size) => {
    setTextSize(size)
  }

  const handleColorChange = (color) => {
    setColor(color)
  }

  return (
    <div className="App">
      <Input.TextArea className='text-input' placeholder='请输入内容' value={text} style={{fontSize: `${textSize}px`, color: `${color}`}} onChange={(e) => {
        setText(e.target.value)
      }}></Input.TextArea>
      <Popover title="修改字体大小" content={() => {
        return [
        <Button key={'1'} onClick={() => handleChangeSize(12)}>12</Button>,
        <Button key={'2'} onClick={() => handleChangeSize(14)}>14</Button>,
        <Button key={'3'} onClick={() => handleChangeSize(16)}>16</Button>,
        <Button key={'4'} onClick={() => handleChangeSize(18)}>18</Button>,
        <Button key={'5'} onClick={() => handleChangeSize(20)}>20</Button>,
      ]
      }}>
        <Button type='default' className='btn'>变更大小</Button>
      </Popover>
      <br></br>
      <Popover title='修改字体颜色' content={() =>{
        return [
          <Button key={'red'} onClick={() => {handleColorChange('purple')}}>紫色</Button>,
          <Button key={'blue'} onClick={() => {handleColorChange('blue')}}>蓝色</Button>,
          <Button key={'yellow'} onClick={() => {handleColorChange('yellow')}}>黄色</Button>,
          <Button key={'pink'}  onClick={() => {handleColorChange('pink')}}>粉色</Button>,
          <Button key={'white'}  onClick={() => {handleColorChange('gray')}}>灰色</Button>
        ]
      }}>
        <Button type='default' className='btn'>变更颜色</Button>
      </Popover>
      <br></br>
      <div className='btn'>
        <Input placeholder='请输入查找内容' allowClear ref={findRef} style={{width: '200px'}}></Input>
        <Button type='default' className='btn' onClick={() => {
          const value = findRef.current.input.value
          if(text.includes(value)){
            message.success('查找到文本！')
          }else{
            message.error('未找到指定文本')
          }
        }}>查找</Button>
      </div>
      <br></br>
      <div className='btn'>
        <Input allowClear placeholder='请输入替换文本' ref={replaceRef} style={{width: '200px'}}></Input>
        <Button type='default' className='btn' onClick={() => {
          const replace = findRef.current.input.value;
          if(replace === ''){
            message.error('请输入要查找的文本')
            return
          }
          
          const target = replaceRef.current.input.value;
          const newText = text.replaceAll(replace, target);
          setText(newText)
          message.success('已全部完成替换');
        }}>替换</Button>
      </div>
      
    </div>
  );
}

export default App;
