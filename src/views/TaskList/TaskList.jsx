/* eslint-disable no-console */
import React, { Component } from 'react';

import { CHECKBOX_ICON_BLUE, CALENDAR_ICON_EMPTY } from 'utils/images';
import { getInitialsFromName } from 'utils/utils';

import NameTag from 'components/NameTag/NameTag';
import PriorityIcon from 'components/PriorityIcon/PriorityIcon';

class TaskList extends Component {
  handleTaskClick = task => {
    const { handleClick } = this.props;

    handleClick(task);
  };

  getDueDate = dueDate => {
    if (!dueDate) {
      return <img className="task-list__date-icon" src={CALENDAR_ICON_EMPTY} alt="No date" title="No due date" />;
    }

    return <span>{dueDate}</span>;
  };

  getAssignedUser = assignedTo => {
    if (!assignedTo || !Object.keys(assignedTo).length || !assignedTo.name) {
      return <NameTag title="Unassigned" className="task-list__nametag" empty={true} size="sm" />;
    }

    const nameInitials = getInitialsFromName(assignedTo.name);

    return <NameTag title={assignedTo.name} className="task-list__nametag" size="sm" initials={nameInitials} />;
  };

  getTasksList = () => {
    const { tasks } = this.props;

    const taskList = tasks.map(task => {
      return (
        <li key={task._id} onClick={() => this.handleTaskClick(task)}>
          <div className="task-list__details">
            <img className="task-list__task-icon" src={CHECKBOX_ICON_BLUE} alt="Task" aria-hidden={true} />
            <div className="task-list__name">{task.name ? task.name : <span>&nbsp;</span>}</div>
            <div className="task-list__tag">{task.taskTag}</div>
            <div className="task-list__date">{this.getDueDate(task.dueDate)}</div>
            <div className="task-list__user">{this.getAssignedUser(task.assignedTo)}</div>
            <div title={`${task.priority} priority`}>
              <PriorityIcon type={task.priority.toLowerCase()} className="task-list__priority" />
            </div>
          </div>
        </li>
      );
    });

    return taskList;
  };

  render() {
    return <ul className="task-list">{this.getTasksList()}</ul>;
  }
}

export default TaskList;
