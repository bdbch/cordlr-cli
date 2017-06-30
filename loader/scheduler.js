module.exports = class Scheduler {
  constructor (config) {
    this.scheduledCommands = []
    this.scheduleTimer = false
  }

  addScheduledCommand (command) {
    if (!this.scheduleTimer) {
      this.scheduledCommands.push(command)
      this.runScheduledCommand()
    }
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

      this.createTimer()
    }
  }

  resetTimer () {
    clearInterval(this.scheduleTimer)
    this.scheduleTimer = false
  }

  createTimer () {
    this.scheduleTimer = setInterval(() => {
      this.resetTimer()
    }, 1500)
  }
}
