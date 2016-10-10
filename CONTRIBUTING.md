# Contributing

Thanks for taking the time to contribute.  Here are a few guideline:

## Pull Requests & Commits
* Please stick to our codestyle guidelines as long as we don't have linters setup.
  * Use 2 Spaces as Indentation
  * Parentheses should always have one space in front. Example: `function Demo () { }`
  * No more then 1 blank line
  * No semicolons
  * Use ES2015
    * Use `const` if value is not going to change
    * Use `let` if value is going to change in this block
  * use promises instead of callbacks where possible
* Pullrequests should always include this
  * Title: `[PROPOSAL] Lorem Ipsum Dolor`
    * `[TAG]` - Use from following tags
      * `PROPOSAL` - Code proposals
      * `FEATURE` - New code feature
      * `FIX` - Fix for a broken feature
      * `COMM` - Comment Commit
    * Description of what you did

## Issues
* Issues should always include this
  * Title: `[BUG] Lorem Ipsum Dolor`
    * `[TAG]` - Use from following tags
      * `BUG` - Report of broken feature
      * `IDEA` - New idea for the bot
      * `FEAT` - New feature for the bot
      * `DISS` - Discussion of already discussed features
      * `SUPP` - Support Issues
      * `ETC` - Other issues
      * `TASK` - Some task which still needs to be done
  * Content:
    * What didn't worked? Describe what you did and what happened?
    * What command lead to the issue?
    * If possible, add the console log
