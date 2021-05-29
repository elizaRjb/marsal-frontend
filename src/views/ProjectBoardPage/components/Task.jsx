/* eslint-disable no-console */
import PriorityIcon from 'components/PriorityIcon/PriorityIcon';
import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { CHECKBOX_ICON_BLUE } from 'utils/images';
class Task extends Component {
  render() {
    const { task, index } = this.props;

    return (
      <Draggable draggableId={task._id} index={index}>
        {(provided, snapshot) => (
          <li
            className={snapshot.isDragging ? 'dragging' : ''}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            key={task.id}
          >
            <div className="project-board__task">
              <div className="project-board__task-top-section">
                <div className="project-board__task-tag">
                  <img src={CHECKBOX_ICON_BLUE} alt="Task" aria-hidden={true} />
                  <span>{task.taskTag}</span>
                </div>
                <PriorityIcon className="project-board__task-icon" type={task.priority.toLowerCase()} />
              </div>
              <div className="project-board__task-name">{task.name}</div>
            </div>
          </li>
        )}
      </Draggable>
    );
  }
}

export default Task;
