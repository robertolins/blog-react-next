export async function simulateWait(timer: number) {
  if (timer <= 0) return;

  await new Promise(resolve => setTimeout(resolve, timer));
}
