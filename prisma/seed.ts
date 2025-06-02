import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const problems = [
  // --- NeetCode 75 ---
  { title: "Two Sum", difficulty: "Easy", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/two-sum/" },
  { title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
  { title: "Contains Duplicate", difficulty: "Easy", category: "Hash Table", description: "", solution: null, link: "https://leetcode.com/problems/contains-duplicate/" },
  { title: "Product of Array Except Self", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/product-of-array-except-self/" },
  { title: "Maximum Subarray", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/maximum-subarray/" },
  { title: "Maximum Product Subarray", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/maximum-product-subarray/" },
  { title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", description: "", solution: null, link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
  { title: "Search in Rotated Sorted Array", difficulty: "Medium", category: "Binary Search", description: "", solution: null, link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
  { title: "3Sum", difficulty: "Medium", category: "Two Pointers", description: "", solution: null, link: "https://leetcode.com/problems/3sum/" },
  { title: "Container With Most Water", difficulty: "Medium", category: "Two Pointers", description: "", solution: null, link: "https://leetcode.com/problems/container-with-most-water/" },
  { title: "Sum of Two Integers", difficulty: "Medium", category: "Bit Manipulation", description: "", solution: null, link: "https://leetcode.com/problems/sum-of-two-integers/" },
  { title: "Subsets", difficulty: "Medium", category: "Backtracking", description: "", solution: null, link: "https://leetcode.com/problems/subsets/" },
  { title: "Course Schedule", difficulty: "Medium", category: "Graph", description: "", solution: null, link: "https://leetcode.com/problems/course-schedule/" },
  { title: "Clone Graph", difficulty: "Medium", category: "Graph", description: "", solution: null, link: "https://leetcode.com/problems/clone-graph/" },
  { title: "Number of Connected Components in an Undirected Graph", difficulty: "Medium", category: "Graph", description: "", solution: null, link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
  { title: "Graph Valid Tree", difficulty: "Medium", category: "Graph", description: "", solution: null, link: "https://leetcode.com/problems/graph-valid-tree/" },
  { title: "Word Search", difficulty: "Medium", category: "Backtracking", description: "", solution: null, link: "https://leetcode.com/problems/word-search/" },
  { title: "Longest Consecutive Sequence", difficulty: "Medium", category: "Hash Table", description: "", solution: null, link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { title: "Alien Dictionary", difficulty: "Hard", category: "Graph", description: "", solution: null, link: "https://leetcode.com/problems/alien-dictionary/" },
  { title: "Valid Parentheses", difficulty: "Easy", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/valid-parentheses/" },
  { title: "Generate Parentheses", difficulty: "Medium", category: "Backtracking", description: "", solution: null, link: "https://leetcode.com/problems/generate-parentheses/" },
  { title: "Daily Temperatures", difficulty: "Medium", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/daily-temperatures/" },
  { title: "Car Fleet", difficulty: "Medium", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/car-fleet/" },
  { title: "Largest Rectangle in Histogram", difficulty: "Hard", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
  { title: "Binary Search", difficulty: "Easy", category: "Binary Search", description: "", solution: null, link: "https://leetcode.com/problems/binary-search/" },
  { title: "Search a 2D Matrix", difficulty: "Medium", category: "Binary Search", description: "", solution: null, link: "https://leetcode.com/problems/search-a-2d-matrix/" },
  { title: "Koko Eating Bananas", difficulty: "Medium", category: "Binary Search", description: "", solution: null, link: "https://leetcode.com/problems/koko-eating-bananas/" },
  { title: "Minimum Window Substring", difficulty: "Hard", category: "Sliding Window", description: "", solution: null, link: "https://leetcode.com/problems/minimum-window-substring/" },
  { title: "Sliding Window Maximum", difficulty: "Hard", category: "Sliding Window", description: "", solution: null, link: "https://leetcode.com/problems/sliding-window-maximum/" },
  { title: "Longest Repeating Character Replacement", difficulty: "Medium", category: "Sliding Window", description: "", solution: null, link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
  { title: "Permutation in String", difficulty: "Medium", category: "Sliding Window", description: "", solution: null, link: "https://leetcode.com/problems/permutation-in-string/" },
  { title: "Minimum Size Subarray Sum", difficulty: "Medium", category: "Sliding Window", description: "", solution: null, link: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
  { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Hash Table", description: "", solution: null, link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
  { title: "Longest Palindromic Substring", difficulty: "Medium", category: "String", description: "", solution: null, link: "https://leetcode.com/problems/longest-palindromic-substring/" },
  { title: "Palindromic Substrings", difficulty: "Medium", category: "String", description: "", solution: null, link: "https://leetcode.com/problems/palindromic-substrings/" },
  { title: "Encode and Decode Strings", difficulty: "Medium", category: "String", description: "", solution: null, link: "https://leetcode.com/problems/encode-and-decode-strings/" },
  { title: "Basic Calculator", difficulty: "Hard", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/basic-calculator/" },
  { title: "Evaluate Reverse Polish Notation", difficulty: "Medium", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  { title: "Implement Trie (Prefix Tree)", difficulty: "Medium", category: "Trie", description: "", solution: null, link: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
  { title: "Design Add and Search Words Data Structure", difficulty: "Medium", category: "Trie", description: "", solution: null, link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
  { title: "Word Search II", difficulty: "Hard", category: "Trie", description: "", solution: null, link: "https://leetcode.com/problems/word-search-ii/" },
  { title: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
  { title: "Kth Largest Element in an Array", difficulty: "Medium", category: "Heap", description: "", solution: null, link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  { title: "Top K Frequent Elements", difficulty: "Medium", category: "Heap", description: "", solution: null, link: "https://leetcode.com/problems/top-k-frequent-elements/" },
  { title: "Find Median from Data Stream", difficulty: "Hard", category: "Heap", description: "", solution: null, link: "https://leetcode.com/problems/find-median-from-data-stream/" },
  { title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
  { title: "Merge Intervals", difficulty: "Medium", category: "Intervals", description: "", solution: null, link: "https://leetcode.com/problems/merge-intervals/" },
  { title: "Insert Interval", difficulty: "Hard", category: "Intervals", description: "", solution: null, link: "https://leetcode.com/problems/insert-interval/" },
  { title: "Non-overlapping Intervals", difficulty: "Medium", category: "Intervals", description: "", solution: null, link: "https://leetcode.com/problems/non-overlapping-intervals/" },
  { title: "Meeting Rooms", difficulty: "Easy", category: "Intervals", description: "", solution: null, link: "https://leetcode.com/problems/meeting-rooms/" },
  { title: "Meeting Rooms II", difficulty: "Medium", category: "Intervals", description: "", solution: null, link: "https://leetcode.com/problems/meeting-rooms-ii/" },
  { title: "Reverse Linked List", difficulty: "Easy", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/reverse-linked-list/" },
  { title: "Detect Cycle in a Linked List", difficulty: "Easy", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/linked-list-cycle/" },
  { title: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
  { title: "Add Two Numbers", difficulty: "Medium", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/add-two-numbers/" },
  { title: "Reorder List", difficulty: "Medium", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/reorder-list/" },
  { title: "Remove Nth Node From End of List", difficulty: "Medium", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
  { title: "Copy List with Random Pointer", difficulty: "Medium", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
  { title: "Linked List Cycle II", difficulty: "Medium", category: "Linked List", description: "", solution: null, link: "https://leetcode.com/problems/linked-list-cycle-ii/" },
  { title: "Binary Tree Maximum Path Sum", difficulty: "Hard", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
  { title: "Maximum Depth of Binary Tree", difficulty: "Easy", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
  { title: "Same Tree", difficulty: "Easy", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/same-tree/" },
  { title: "Invert Binary Tree", difficulty: "Easy", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/invert-binary-tree/" },
  { title: "Subtree of Another Tree", difficulty: "Easy", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/subtree-of-another-tree/" },
  { title: "Lowest Common Ancestor of a Binary Search Tree", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
  { title: "Binary Tree Level Order Traversal", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
  { title: "Validate Binary Search Tree", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/validate-binary-search-tree/" },
  { title: "Kth Smallest Element in a BST", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
  { title: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
  { title: "Binary Tree Right Side View", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/binary-tree-right-side-view/" },
  { title: "Count Good Nodes in Binary Tree", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/" },
  { title: "Balanced Binary Tree", difficulty: "Easy", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/balanced-binary-tree/" },
  { title: "Diameter of Binary Tree", difficulty: "Easy", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/diameter-of-binary-tree/" },
  { title: "Maximum Width of Binary Tree", difficulty: "Medium", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/maximum-width-of-binary-tree/" },
  { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", category: "Tree", description: "", solution: null, link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
  { title: "Implement Queue using Stacks", difficulty: "Easy", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/implement-queue-using-stacks/" },
  { title: "Min Stack", difficulty: "Medium", category: "Stack", description: "", solution: null, link: "https://leetcode.com/problems/min-stack/" },
  { title: "LRU Cache", difficulty: "Medium", category: "Design", description: "", solution: null, link: "https://leetcode.com/problems/lru-cache/" },
  { title: "Design HashMap", difficulty: "Easy", category: "Design", description: "", solution: null, link: "https://leetcode.com/problems/design-hashmap/" },
  { title: "Design Twitter", difficulty: "Medium", category: "Design", description: "", solution: null, link: "https://leetcode.com/problems/design-twitter/" },
  { title: "Find the Duplicate Number", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/find-the-duplicate-number/" },
  { title: "Missing Number", difficulty: "Easy", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/missing-number/" },
  { title: "First Missing Positive", difficulty: "Hard", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/first-missing-positive/" },
  { title: "Trapping Rain Water", difficulty: "Hard", category: "Two Pointers", description: "", solution: null, link: "https://leetcode.com/problems/trapping-rain-water/" },
  { title: "Rotate Image", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/rotate-image/" },
  { title: "Spiral Matrix", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/spiral-matrix/" },
  { title: "Set Matrix Zeroes", difficulty: "Medium", category: "Array", description: "", solution: null, link: "https://leetcode.com/problems/set-matrix-zeroes/" },
  { title: "Word Search", difficulty: "Medium", category: "Backtracking", description: "", solution: null, link: "https://leetcode.com/problems/word-search/" },
  { title: "Longest Consecutive Sequence", difficulty: "Medium", category: "Hash Table", description: "", solution: null, link: "https://leetcode.com/problems/longest-consecutive-sequence/" },
  { title: "Alien Dictionary", difficulty: "Hard", category: "Graph", description: "", solution: null, link: "https://leetcode.com/problems/alien-dictionary/" },
];

async function main() {
  for (const problem of problems) {
    await prisma.leetCodeProblem.upsert({
      where: { title: problem.title },
      update: {},
      create: problem,
    });
  }
  console.log(`Seeded ${problems.length} problems.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 