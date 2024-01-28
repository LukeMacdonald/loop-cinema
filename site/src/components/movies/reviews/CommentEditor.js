import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CommentEditor(props) {
  const toolbarOptions = [
    [{ size: ["small", false, "large"] }],
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
  ];

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "color",
    "background",
  ];

  return (
    <div className="text-white">
      <ReactQuill
        className="react-quill"
        value={props.comment}
        onChange={props.handleCommentChange}
        formats={formats}
        modules={{
          toolbar: toolbarOptions,
        }}
        style={{
          padding: "1rem",
          borderRadius: "10px",
          marginTop: "1rem",
          color: "black",
          textDecoration: "none",
        }}
      />
    </div>
  );
}
export default CommentEditor;

