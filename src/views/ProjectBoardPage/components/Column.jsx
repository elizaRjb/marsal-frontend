/* eslint-disable no-console */
import React, { Component } from 'react';

import { Droppable } from 'react-beautiful-dnd';

import Task from './Task';

class Column extends Component {
  render() {
    const { column, tasks } = this.props;

    return (
      <div className="project-board__column">
        <div className="project-board__column-container">
          <div className="project-board__column-title">{column.title}</div>
          <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
              <ul
                className={`project-board__task-list ${snapshot.isDraggingOver ? 'draggedOver' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => {
                  return <Task key={task._id} task={task} index={index} />;
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
}

export default Column;
