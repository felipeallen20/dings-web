const SUBMIT_DELAY_MS = 700;

export async function submitRestaurantInterest(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS));
}