// Time Complexity: O(1)
// Space Complexity: O(1)
// Efficiency: Best for large n, as it avoids loops or recursion
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

// Time Complexity: O(n)
// Space Complexity: O(1)
// Efficiency: Less efficient than the formula, especially for very large n.
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Time Complexity: O(n)
// Space Complexity: O(n)
// Efficiency: May hit a call stack limit for large values.
function sum_to_n_c(n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}
