import { megaverseEditor } from "./context";

// To solve goals iteratively, we can use a recursive function
async function solveAllGoalMaps(counter: number = 1): Promise<void> {
  try {
    console.log("Solving challenge number", counter);
    await megaverseEditor.solveNextGoalMap();
    solveAllGoalMaps(counter + 1);
    console.log("Goal Map Challenge Solved!");
  } catch (error) {
    console.error(
      "Error solving goal map challenge number:",
      counter + 1,
      error
    );
  }
}
solveAllGoalMaps();
