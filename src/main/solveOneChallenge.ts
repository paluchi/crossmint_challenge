import { megaverseEditor } from "./context";

const solveOneChallenge = async () => {
  try {
    await megaverseEditor.solveNextGoalMap();
    console.log("Goal Map Challenge Solved!");
  } catch (error) {
    console.error("Error solving goal map challenge", error);
  }
};

solveOneChallenge();
