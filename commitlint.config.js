module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "Feat:: ",
        "Update:: ",
        "FIX:: ",
        "!BREAKING CHANGE:: ",
        "!HOTFIX:: ",
        "Style:: ",
        "Refactor:: ",
        "Comment:: ",
        "Chore:: ",
        "Docs:: ",
        "Test:: ",
        "Rename:: ",
        "Remove:: ",
      ],
    ],
  },
};
