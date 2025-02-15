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
    searchQuery,
  }) => {
    const highlightText = (text, query) => {
      if (!query) return text;
      const parts = text.split(new RegExp(`(${query})`, "gi"));
      return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        )
      );
    };

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
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M2 8l4 4 8-8"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </ReusableButton>
          </Fragment>
        ) : (
          <Fragment>
            <div className="todo__list__items__item__todo">
              <strong>{highlightText(todo.text, searchQuery)}</strong>
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
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M2 12l10-10 2 2-10 10H2v-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </ReusableButton>
            <ReusableButton
              className="todo__list__items__item__delete-button"
              onClick={onDelete}
            >
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
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
  searchQuery: PropTypes.string,
};

export default TodoItem;
