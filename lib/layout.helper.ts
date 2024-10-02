export const keys = [
    "kfc",
    "mcdonald",
    "pizzahut",
    "dominos",
    "tacobell",
    "kyochon",
    "mixue",
    "lfc",
    "burgerking",
    "marrybrown",
  ];
  
  //x = column, y = row
  export const AllLayouts = {
    lg: [ // Large screens
      { i: "kfc", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "mcdonald", x: 2, y: 0, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "tacobell", x: 3, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "music", x: 0, y: 1, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "pizzahut", x: 1, y: 1, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "kyochon", x: 2, y: 1, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "mixue", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "marrybrown", x: 3, y: 2, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "dominos", x: 0, y: 3, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "lfc", x: 2, y: 3, w: 2, h: 1, isResizable: false, isFocused: true }
    ],
    md: [ // Medium screens
      { i: "kfc", x: 0, y: 0, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "mcdonald", x: 2, y: 0, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "tacobell", x: 3, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "music", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "pizzahut", x: 1, y: 5, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "kyochon", x: 2, y: 1, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "mixue", x: 0, y: 3, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "marrybrown", x: 3, y: 2, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "dominos", x: 2, y: 3, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "lfc", x: 2, y: 4, w: 2, h: 2, isResizable: false, isFocused: true }
    ],
    sm: [ // Small screens
      { i: "kfc", x: 0, y: 0, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "mcdonald", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: true }, // Spans 2 rows
      { i: "tacobell", x: 1, y: 3, w: 1, h: 2, isResizable: false, isFocused: true }, // Spans 2 rows
      { i: "music", x: 0, y: 6, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "pizzahut", x: 0, y: 3, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "kyochon", x: 0, y: 4, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "mixue", x: 0, y: 8, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "marrybrown", x: 1, y: 5, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "dominos", x: 0, y: 10, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "lfc", x: 0, y: 11, w: 2, h: 2, isResizable: false, isFocused: true }
    ]
  };
  
  export const AboutLayouts = {
    lg: [ // Large screens
      { i: "kfc", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "mcdonald", x: 2, y: 0, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "tacobell", x: 3, y: 1, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "music", x: 0, y: 1, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "pizzahut", x: 3, y: 0, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "kyochon", x: 2, y: 1, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "mixue", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "marrybrown", x: 1, y: 1, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 3, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "lfc", x: 2, y: 3, w: 2, h: 1, isResizable: false, isFocused: false }
    ],
    md: [ // Medium screens
      { i: "kfc", x: 0, y: 0, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "mcdonald", x: 2, y: 0, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "tacobell", x: 3, y: 1, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "music", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "pizzahut", x: 3, y: 0, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "kyochon", x: 2, y: 1, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "mixue", x: 0, y: 3, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "marrybrown", x: 1, y: 5, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 2, y: 3, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "lfc", x: 2, y: 4, w: 2, h: 2, isResizable: false, isFocused: false }
    ],
    sm: [ // Small screens
      { i: "kfc", x: 0, y: 1, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "mcdonald", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true }, // Spans 2 rows
      { i: "tacobell", x: 1, y: 3, w: 1, h: 2, isResizable: false, isFocused: false }, // Spans 2 rows
      { i: "music", x: 0, y: 6, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "pizzahut", x: 0, y: 3, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "kyochon", x: 0, y: 4, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "mixue", x: 0, y: 8, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "marrybrown", x: 1, y: 5, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 10, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "lfc", x: 0, y: 11, w: 2, h: 2, isResizable: false, isFocused: false }
    ]
  };
  
  export const ProjectsLayouts = {
    lg: [ // Large screens
      { i: "kfc", x: 0, y: 1, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "mcdonald", x: 2, y: 2, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "tacobell", x: 3, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "music", x: 0, y: 2, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "pizzahut", x: 1, y: 2, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "kyochon", x: 2, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "mixue", x: 0, y: 3, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "marrybrown", x: 3, y: 1, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "lfc", x: 2, y: 3, w: 2, h: 1, isResizable: false, isFocused: false }
    ],
    md: [ // Medium screens
      { i: "kfc", x: 0, y: 1, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "mcdonald", x: 2, y: 2, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "tacobell", x: 3, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "music", x: 0, y: 3, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "pizzahut", x: 3, y: 2, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "kyochon", x: 2, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "mixue", x: 0, y: 4, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "marrybrown", x: 2, y: 5, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "lfc", x: 2, y: 3, w: 2, h: 2, isResizable: false, isFocused: false }
    ],
    sm: [ // Small screens
      { i: "kfc", x: 0, y: 4, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "mcdonald", x: 0, y: 3, w: 2, h: 1, isResizable: false, isFocused: false }, // Spans 2 rows
      { i: "tacobell", x: 1, y: 0, w: 1, h: 2, isResizable: false, isFocused: true }, // Spans 2 rows
      { i: "music", x: 0, y: 7, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "pizzahut", x: 0, y: 6, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "kyochon", x: 0, y: 0, w: 1, h: 2, isResizable: false, isFocused: true },
      { i: "mixue", x: 0, y: 9, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "marrybrown", x: 1, y: 6, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "lfc", x: 0, y: 11, w: 2, h: 2, isResizable: false, isFocused: false }
    ]
  };
  
  export const MediaLayouts = {
    lg: [ // Large screens
      { i: "kfc", x: 0, y: 3, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "mcdonald", x: 1, y: 1, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "tacobell", x: 3, y: 1, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "music", x: 0, y: 1, w: 1, h: 1, isResizable: false, isFocused: true },
      { i: "pizzahut", x: 3, y: 3, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "kyochon", x: 2, y: 1, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "mixue", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "marrybrown", x: 2, y: 3, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 2, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "lfc", x: 2, y: 0, w: 2, h: 1, isResizable: false, isFocused: true }
    ],
    md: [ // Medium screens
      { i: "kfc", x: 0, y: 3, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "mcdonald", x: 2, y: 2, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "tacobell", x: 3, y: 2, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "music", x: 0, y: 0, w: 2, h: 1, isResizable: false, isFocused: true },
      { i: "pizzahut", x: 3, y: 4, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "kyochon", x: 2, y: 3, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "mixue", x: 0, y: 1, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "marrybrown", x: 2, y: 5, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 5, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "lfc", x: 2, y: 0, w: 2, h: 2, isResizable: false, isFocused: true }
    ],
    sm: [ // Small screens
      { i: "kfc", x: 0, y: 10, w: 2, h: 2, isResizable: false, isFocused: false },
      { i: "mcdonald", x: 0, y: 9, w: 2, h: 1, isResizable: false, isFocused: false }, // Spans 2 rows
      { i: "tacobell", x: 1, y: 6, w: 1, h: 2, isResizable: false, isFocused: false }, // Spans 2 rows
      { i: "music", x: 0, y: 0, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "pizzahut", x: 0, y: 12, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "kyochon", x: 0, y: 6, w: 1, h: 2, isResizable: false, isFocused: false },
      { i: "mixue", x: 0, y: 2, w: 2, h: 2, isResizable: false, isFocused: true },
      { i: "marrybrown", x: 1, y: 12, w: 1, h: 1, isResizable: false, isFocused: false },
      { i: "dominos", x: 0, y: 8, w: 2, h: 1, isResizable: false, isFocused: false },
      { i: "lfc", x: 0, y: 4, w: 2, h: 2, isResizable: false, isFocused: true }
    ]
  };