import './index.sass'

import React from 'react'

export default class TasksModal extends React.Component {

  _selectTask(task) {
    this.props.onTaskSelect(task)
  }

  _renderTasks() {
    return this.props.tasks.map((task) => {
      return (
        <div className='tasks_modal-task' key={task.id} onClick={this._selectTask.bind(this, task)}>
          <div className='tasks_modal-task_name'>
            {task.name}
          </div>
          <div className='tasks_modal-task_description' dangerouslySetInnerHTML={{__html: task.description}}></div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='tasks_modal'>
        <div className='tasks_modal-inner'>
          {this._renderTasks()}
        </div>
        <a className='tasks_modal-close_link' onClick={this._selectTask.bind(this, undefined)} href='#'>
          <i className='fa fa-times'></i>
        </a>
      </div>
    )
  }
}

TasksModal.propTypes = {
  tasks: React.PropTypes.array.isRequired,
  onTaskSelect: React.PropTypes.func.isRequired
}
