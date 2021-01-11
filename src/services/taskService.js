export function getBacklogTasks(tasksList) {
  if (!tasksList.length) {
    return [];
  }

  const backlogTasks = tasksList.filter(task => {
    return task.stage === 'Backlog';
  });

  return backlogTasks;
}

export function getInProgressTasks(tasksList) {
  if (!tasksList.length) {
    return [];
  }

  const inProgressTasks = tasksList.filter(task => {
    return task.stage !== 'Backlog' && task.stage !== 'Done';
  });

  return inProgressTasks;
}
