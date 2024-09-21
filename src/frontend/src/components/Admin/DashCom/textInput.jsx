/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';



const TextInputer =({value,onChange}) => {
const  modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          ["link", "image", "video"],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean']
        ],
        
      };
      const editorStyle = {
        height: "400px"
      }
  
  return(<>
    <ReactQuill 
     modules ={modules}
     value={value}
     onChange={onChange}
     style={editorStyle}
    />
  </>
    
  )
}

export default TextInputer;