import React from "react";
import PropTypes from "prop-types";
import ReusableInput from "./common/ReusableInput";
import ReusableButton from "./common/ReusableButton";

const TodoItem = React.memo(
  ({
    todo,
    isEditing,
    editingText,
    onEdit,
    onChangeEditingText,
    onSave,
    onDelete,
    getTimeDisplay,
  }) => {
    return (
      <li
        style={{
          marginBottom: "0.5rem",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {isEditing ? (
          <>
            <ReusableInput
              value={editingText}
              onChange={(e) => onChangeEditingText(e.target.value)}
            />
            <ReusableButton onClick={onSave}>Save</ReusableButton>
          </>
        ) : (
          <>
            <div>
              <strong>{todo.text}</strong>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              Added: {getTimeDisplay(todo.createdAt)}
              {todo.updatedAt !== todo.createdAt && (
                <> | Updated: {getTimeDisplay(todo.updatedAt)}</>
              )}
            </div>
            <ReusableButton onClick={onEdit} style={{ marginRight: "0.5rem" }}>
              Edit
            </ReusableButton>
            <ReusableButton onClick={onDelete}>Delete</ReusableButton>
          </>
        )}
      </li>
    );
  }
);

TodoItem.displayName = "TodoItem";
TodoItem.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  editingText: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onChangeEditingText: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  getTimeDisplay: PropTypes.func.isRequired,
};

export default TodoItem;
