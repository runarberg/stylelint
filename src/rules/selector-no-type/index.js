import selectorParser from "postcss-selector-parser"
import {
  report,
  ruleMessages,
  validateOptions
} from "../../utils"

export const ruleName = "selector-no-type"

export const messages = ruleMessages(ruleName, {
  rejected: "Unexpected type selector",
})

export default function (actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual })
    if (!validOptions) { return }

    root.eachRule(rule => {
      selectorParser(selectorAST => {
        selectorAST.eachTag(() => {
          report({
            message: messages.rejected,
            node: rule,
            ruleName,
            result,
          })
        })
      })
        .process(rule.selector)
    })
  }
}
