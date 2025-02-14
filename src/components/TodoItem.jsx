import React, { Fragment } from "react";
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
      <li className="todo__list__items__item">
        {isEditing ? (
          <Fragment>
            <ReusableInput
              className="todo__list__items__item__input"
              value={editingText}
              onChange={(e) => onChangeEditingText(e.target.value)}
            />
            <ReusableButton
              className="todo__list__items__item__save-button"
              onClick={onSave}
            >
              Save
            </ReusableButton>
          </Fragment>
        ) : (
          <Fragment>
            <div className="todo__list__items__item__todo">
              <strong>{todo.text}</strong>
            </div>
            <div className="todo__list__items__item__time">
              Added: {getTimeDisplay(todo.createdAt)}
              {todo.updatedAt !== todo.createdAt && (
                <> | Updated: {getTimeDisplay(todo.updatedAt)}</>
              )}
            </div>
            <ReusableButton
              onClick={onEdit}
              className="todo__list__items__item__edit-button"
            >
              Edit
            </ReusableButton>
            <ReusableButton
              className="todo__list__items__item__delete-button"
              onClick={onDelete}
            >
              Delete
            </ReusableButton>
          </Fragment>
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
