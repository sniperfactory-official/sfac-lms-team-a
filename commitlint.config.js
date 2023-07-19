module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [2, "always", "pascal-case"],
    "type-enum": [
      2,
      "always",
      [
        "Feat",
        "Update",
        "FIX",
        "!BREAKING CHANGE",
        "!HOTFIX",
        "Style",
        "Refactor",
        "Comment",
        "Chore",
        "Docs",
        "Test",
        "Rename",
        "Remove",
      ],
    ],
  },
};
