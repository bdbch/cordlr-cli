module.exports = class Scheduler {
  constructor (config) {
    this.scheduledCommands = []
    this.scheduleTimer = false
  }

  addScheduledCommand (command) {
    this.scheduledCommands.push(command)
  }

  getTimer () {
    return this.scheduleTimer
  }

  runScheduledCommand () {
    if (this.scheduledCommands.length >= 1) {
      const nextCommand = this.scheduledCommands[0]
      nextCommand.object[nextCommand.command](
        nextCommand.args.message,
        nextCommand.args.args,
        nextCommand.args.flags
      )
      this.scheduledCommands.splice(0, 1)
    } else {
      clearInterval(this.scheduleTimer)
      this.scheduleTimer = false
    }
  }

  createTimer () {
    this.scheduleTimer = setInterval(() => {
      this.runScheduledCommand()
    }, 150)
  }
}
